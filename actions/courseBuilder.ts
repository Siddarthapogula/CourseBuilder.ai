"use server";
import { getPrompt } from "@/lib/utils/constants";
import { BuildCourseRequestType } from "@/lib/utils/types";
import { GoogleGenAI } from "@google/genai";
import { createCourse } from "./course";
import { createQuiz } from "./quiz";
import { updateModules } from "./module";
import {
  AiError,
  AppError,
  HandleApiError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import {
  stage1OutputData,
  stage2OutputData,
  stage3LLMoutput,
  stage3OutputData,
} from "@/HardCoded/genaihardcodedata";
import { GetResponseObject } from "@/lib/utils/helper";

const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function BuildCourse({
  userPrompt,
  data,
  stage,
}: BuildCourseRequestType) {
  try {
    const { generationStage, prompt } = getPrompt(userPrompt, data, stage);
    if (!prompt || !generationStage)
      throw new ValidationError("provide prompt and generationStage correctly");
    const response = await genAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt as string,
    });
    if (!response.text)
      throw new AiError("No text generated from from genai generation");
    const cleaned = response?.text.replace(
      /```(?:json)?\s*([\s\S]*?)```/g,
      "$1"
    );
    const result = JSON.parse(cleaned);
    if (stage == 1) {
      // return GetResponseObject("success", stage1OutputData);
      return await createCourse(result);
    } else if (stage == 2) {
      // return GetResponseObject("success", stage2OutputData);
      return await updateModules(result);
    } else if (stage == 3) {
      // return GetResponseObject("success", stage3OutputData.data);
      // console.log(data);
      const courseId = data?.data?.[0]?.courseId;
      if (!courseId) {
        throw new ValidationError("courseId not provided");
      }
      return await createQuiz({
        courseId: courseId,
        result: result,
      });
    } else {
      throw new ValidationError(
        "Invalid Stage! stage should only be (1, 2, 3)"
      );
    }
  } catch (e: any) {
    // some how need to fix it in more correct way 
    if (
      e.message &&
      (e.message.includes("503") ||
        e.message.includes("UNAVAILABLE") ||
        e.message.includes("overloaded"))
    ) {
      throw new AiError(
        "The AI model is currently overloaded. Please try again in a moment."
      );
    }
    throw HandleApiError(e);
  }
}

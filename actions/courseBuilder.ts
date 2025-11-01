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
    console.log("userPrompt : ", userPrompt);
    console.log("data : ", data);
    console.log("stage : ", stage);
    const { generationStage, prompt } = getPrompt(userPrompt, data, stage);
    if (!prompt || !generationStage)
      throw new ValidationError("provide prompt and generationStage correctly");
    const response = await genAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt as string,
    });
    if (!response.text)
      throw new AiError("No text found from genai generation");
    const cleaned = response?.text.replace(
      /```(?:json)?\s*([\s\S]*?)```/g,
      "$1"
    );
    const result = JSON.parse(cleaned);
    await new Promise((res, rej) => {
      setTimeout(() => {
        res("");
      }, 2000);
    });
    if (stage == 1) {
      // return GetResponseObject("success", stage1OutputData);
      return await createCourse(result);
    } else if (stage == 2) {
      // return GetResponseObject("success", stage2OutputData);
      return await updateModules(result);
    } else if (stage == 3) {
      // return GetResponseObject("success", stage3OutputData.data);
      console.log(data);
      const courseId = data?.data?.[0]?.courseId;
      if (!courseId) {
        throw new Error("courseId not provided");
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
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError("An unexpected error occurred.", 500);
  }
}

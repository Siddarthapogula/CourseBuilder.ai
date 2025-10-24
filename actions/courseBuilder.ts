"use server";
import { getPrompt } from "@/lib/utils/constants";
import { prisma } from "@/lib/utils/prisma";
import { BuildCourseRequestType } from "@/lib/utils/types";
import { GoogleGenAI } from "@google/genai";
import { createCourse } from "./course";
import { createQuiz } from "./quiz";
import { courseData, modulesData, QuizData } from "@/lib/utils/courseConstants";
import { updateModules } from "./module";

const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function BuildCourse({
  userPrompt,
  data,
  stage,
}: BuildCourseRequestType) {
  const { prompt } = getPrompt(userPrompt, data, stage);
  const response = await genAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt as string,
  });
  if (!response.text) return;
  const cleaned = response?.text.replace(/```(?:json)?\s*([\s\S]*?)```/g, "$1");
  const result = JSON.parse(cleaned);
  console.log(result);
  // const result = QuizData;
  if (stage == 1) {
    return await createCourse(result);
  } else if (stage == 2) {
    return await updateModules(result);
  } else if (stage == 3) {
    return await createQuiz({ courseId: data?.courseId, result });
  }
  return;
}

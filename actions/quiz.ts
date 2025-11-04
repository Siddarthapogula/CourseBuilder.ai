"use server";

import {
  AppError,
  HandleApiError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import { GetResponseObject } from "@/lib/utils/helper";
import { prisma } from "@/lib/prisma";

export async function createQuiz(data: any) {
  try {
    if (!data || !data?.courseId) throw new ValidationError("no modules found");
    const questions = data?.result;
    const courseId = data?.courseId;
    const [quiz] = await prisma.$transaction([
      prisma.quiz.create({
        data: {
          courseId: courseId,
          questions: {
            create: questions.map((q: any) => ({
              question: q?.question,
              options: q?.options,
              answer: q?.answer?.answer,
              correctOptionNumber: q?.answer?.correctOptionNumber,
            })),
          },
        },
        include: {
          questions: true,
        },
      }),
    ]);
    return GetResponseObject("success", { quiz });
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

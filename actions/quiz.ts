"use server";

import { AppError, ValidationError } from "@/lib/utils/error-handling-class";
import { GetResponseObject } from "@/lib/utils/helper";
import { prisma } from "@/lib/utils/prisma";

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
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Unexpected Error Occured" + error, 500);
  }
}

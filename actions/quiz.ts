"use server";

import { prisma } from "@/lib/utils/prisma";

export async function createQuiz(data: any) {
  if (!data || !data?.courseId) return;
  console.log(data);

  const questions = data.result;
  try {
    const courseId = data.courseId;
    const [newQuiz, updatedCourse] = await prisma.$transaction([
      prisma.quiz.create({
        data: {
          courseId: courseId,
          questions: {
            create: questions.map((q: any) => ({
              question: q?.question,
              options: q?.options,
              answer: q?.answer?.answer,
              optionNumber: q?.answer?.optionNumber,
            })),
          },
        },
      }),
      prisma.course.update({
        where: {
          courseId: courseId,
        },
        data: {
          status: "COMPLETED",
        },
      }),
    ]);
    console.log(newQuiz, updatedCourse);
    return { message: "success", data: { newQuiz, updatedCourse } };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

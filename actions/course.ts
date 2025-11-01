"use server";

import { AppError, ValidationError } from "@/lib/utils/error-handling-class";
import { GetResponseObject, getUserIdOrThrowError } from "@/lib/utils/helper";
import { prisma } from "@/lib/utils/prisma";

export async function createCourse(courseData: any) {
  try {
    const { courseName, modules } = courseData;
    if (!courseName || !modules)
      throw new ValidationError("provide courseName and Modules");
    const userId = await getUserIdOrThrowError();
    const newCourse = await prisma.course.create({
      data: {
        courseName: courseName,
        userId: userId,
        status: "DRAFT",
        modules: {
          create: modules.map((module: { title: string }) => ({
            title: module.title,
            description: "",
          })),
        },
      },
      include: {
        modules: true,
      },
    });
    return GetResponseObject("success", newCourse);
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("An unexpected error occurred.", 500);
  }
}

export async function completeCourse(courseId: string) {
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        courseId: courseId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    return GetResponseObject("success", updatedCourse);
  } catch (e: any) {
    if (e instanceof AppError) {
      throw e;
    }
    throw new AppError(e.message, 500);
  }
}

export async function getCourseWithId(courseId: string) {
  if (!courseId) throw new ValidationError("courseid not provided");
  try {
    const courseData = await prisma.course.findUnique({
      where: {
        courseId: courseId,
      },
      include: {
        modules: true,
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });
    return GetResponseObject("success", courseData);
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
    throw new AppError("Unexpected Error Occured" + e, 500);
  }
}

export async function getAllCourses() {
  try {
    const allCourses = await prisma.course.findMany({
      include: {
        modules: true,
        quiz: {
          include: {
            questions: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return GetResponseObject("success", allCourses);
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
    throw new AppError("unexpected error occured", 500);
  }
}

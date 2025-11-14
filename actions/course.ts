"use server";

import {
  AppError,
  HandleApiError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import { GetResponseObject, getUserIdOrThrowError } from "@/lib/utils/helper";
import { prisma } from "@/lib/prisma";

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
  } catch (e: any) {
    throw HandleApiError(e);
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
    throw HandleApiError(e);
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
        _count: {
          select: {
            forks: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });
    return GetResponseObject("success", courseData);
  } catch (e) {
    throw HandleApiError(e);
  }
}

export async function forkCourse(courseId: string) {
  try {
    if (!courseId) {
      throw new ValidationError("CourseId Not provided");
    }
    const userId = await getUserIdOrThrowError();
    const parentCourse = await prisma.course.findUnique({
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
    if (!parentCourse) {
      throw new NotFoundError("Parent Course Not Found");
    }
    if (parentCourse.userId == userId) {
      throw new ValidationError("Forking own course is not allowed");
    }
    const forkCount = await prisma.course.count({
      where: {
        userId: userId,
        forkedFromId: parentCourse.courseId,
      },
    });
    if (forkCount > 0) {
      throw new ValidationError("Forking the same course is not allowed");
    }

    const newForkedCourse = await prisma.course.create({
      data: {
        courseName: parentCourse.courseName,
        userId: userId,
        status: "DRAFT",
        forkedFromId: parentCourse.courseId,
        modules: {
          create: parentCourse.modules.map((module) => ({
            title: module.title,
            description: module.description,
            referenceSite: module.referenceSite,
            referenceVideo: module.referenceVideo,
          })),
        },
        quiz: parentCourse.quiz
          ? {
              create: {
                tags: parentCourse.quiz.tags,
                questions: {
                  create: parentCourse.quiz.questions.map((q) => ({
                    question: q.question,
                    options: q.options,
                    answer: q.answer,
                    correctOptionNumber: q.correctOptionNumber,
                  })),
                },
              },
            }
          : undefined,
      },
    });
    return GetResponseObject("success", newForkedCourse);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function getAllCourses(
  searchTerm: string = "",
  curpage: number = 0
) {
  try {
    const allCourses = await prisma.course.findMany({
      skip: 10 * curpage,
      take: 10,
      where: {
        forkedFromId: null,
        courseName: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      include: {
        modules: true,
        _count: {
          select: {
            forks: true,
          },
        },
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
    throw HandleApiError(e);
  }
}

export async function getCoursesOfUser(userIdParam?: string) {
  try {
    let userId;
    if (userIdParam) {
      userId = userIdParam;
    } else {
      userId = await getUserIdOrThrowError();
    }
    const forkedCourses = await prisma.course.findMany({
      where: {
        userId: userId,
        forkedFromId: {
          not: null,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            forks: true,
          },
        },
        modules: true,
      },
    });
    const createdCourses = await prisma.course.findMany({
      where: {
        userId: userId,
        forkedFromId: null,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            forks: true,
          },
        },
        modules: true,
      },
    });
    return GetResponseObject("success", { forkedCourses, createdCourses });
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function deleteCourseWithId(courseId: string) {
  try {
    if (!courseId) {
      throw new ValidationError("courseid Not provided");
    }
    const userId = await getUserIdOrThrowError();
    const deletedCourse = await prisma.course.delete({
      where: {
        courseId: courseId,
        userId: userId,
      },
    });
    return GetResponseObject("success", deletedCourse);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

"use server";

import { prisma } from "@/lib/utils/prisma";
import { ModuleData } from "@/lib/utils/types";
import { title } from "process";

export async function createCourse(courseData: any) {
  const { courseName, modules } = courseData;
  if (!courseName || !modules) return;
  const newCourse = await prisma.course.create({
    data: {
      courseName: courseName,
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
  console.log(newCourse);
  return { message: "success", data: newCourse };
}

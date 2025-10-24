"use server";

import { prisma } from "@/lib/utils/prisma";
import { ModuleData } from "@/lib/utils/types";

export async function createModules(data: any) {}
export async function updateModules(data: any[]) {
  if (!data.length) return;
  try {
    const updatePromises = data.map((module) =>
      prisma.module.update({
        where: {
          moduleId: module?.moduleId,
        },
        data: {
          description: module?.description,
          referenceVideo: module?.referenceVideo,
          referenceSite: module?.referenceSite,
        },
      })
    );
    const updatedModules = await prisma.$transaction(updatePromises);
    return { message: "success", data: updatedModules };
  } catch (e) {
    return { message: "error", error: e };
  }
}

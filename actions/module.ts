"use server";

import { AppError, ValidationError } from "@/lib/utils/error-handling-class";
import { GetResponseObject } from "@/lib/utils/helper";
import { prisma } from "@/lib/utils/prisma";

export async function updateModules(modules: any[]) {
  try {
    if (!modules.length) throw new ValidationError("no modules found");
    const updatePromises = modules.map((module) =>
      prisma.module.update({
        where: {
          moduleId: module?.moduleId,
        },
        data: {
          title: module.title,
          description: module?.description,
          referenceVideo: module?.referenceVideo,
          referenceSite: module?.referenceSite,
        },
      })
    );
    const updatedModules = await prisma.$transaction(updatePromises);
    return GetResponseObject("success", updatedModules);
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("An unexpected error occurred.", 500);
  }
}

export async function updateModuleById(module: any) {
  try {
    const updatedModule = await prisma.module.update({
      where: {
        moduleId: module.moduleId,
      },
      data: {
        title: module.title,
      },
    });
    return GetResponseObject("success", updateModuleById);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteModuleById(moduleId: any) {
  try {
    const deletedModule = await prisma.module.delete({
      where: {
        moduleId: moduleId,
      },
    });
    return GetResponseObject("success", deletedModule);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

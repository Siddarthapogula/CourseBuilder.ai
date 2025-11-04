"use server";

import {
  AppError,
  HandleApiError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import { GetResponseObject } from "@/lib/utils/helper";
import { prisma } from "@/lib/prisma";

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
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function updateModuleById(module: any) {
  try {
    if (!module) throw new ValidationError("Module Data Not provided");
    const updatedModule = await prisma.module.update({
      where: {
        moduleId: module.moduleId,
      },
      data: {
        title: module.title,
      },
    });
    return GetResponseObject("success", updatedModule);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function deleteModuleById(moduleId: any) {
  try {
    if (!moduleId) throw new ValidationError("ModuleId not provided");
    const deletedModule = await prisma.module.delete({
      where: {
        moduleId: moduleId,
      },
    });
    return GetResponseObject("success", deletedModule);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

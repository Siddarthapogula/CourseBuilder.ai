"use server";

import { AppError, HandleApiError } from "@/lib/utils/error-handling-class";
import {
  getHashedPassword,
  GetResponseObject,
  getUserIdOrThrowError,
} from "@/lib/utils/helper";
import { prisma } from "@/lib/prisma";

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const hashed = await getHashedPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name: email.split("@")[0],
        email: email,
        password: hashed,
      },
    });
    return GetResponseObject("success", newUser);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function getUserDetails(userIdParam?: string) {
  try {
    let userId;
    if (userIdParam) {
      userId = userIdParam;
    } else {
      userId = await getUserIdOrThrowError();
    }
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: false,
        id: true,
        name: true,
        image: true,
        email: true,
        about: true,
        organization: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return GetResponseObject("success", userDetails);
  } catch (e: any) {
    throw HandleApiError(e);
  }
}

export async function updateUser(data: any) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        image: data.image,
        about: data.about,
        organization: data.organization,
      },
    });
    return GetResponseObject("success", updatedUser);
  } catch (e: any) {
    throw HandleApiError(e)
  }
}

"use server";

import { AppError } from "@/lib/utils/error-handling-class";
import { getHashedPassword, GetResponseObject } from "@/lib/utils/helper";
import { prisma } from "@/lib/utils/prisma";
import { email, z } from "zod";

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
    if (e instanceof AppError) {
      throw e;
    }
    if (e.message?.includes("prisma") || e.message?.includes("constraint")) {
      throw new AppError("user already Exists try login", 400);
    }
    throw new AppError("Unexpected Error Occured", 500);
  }
}

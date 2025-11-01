import { getServerSession } from "next-auth";
import { ResponseObject } from "./types";
import bcrypt from "bcryptjs";
import { authOptions } from "../auth";
export function GetResponseObject(status: string, data: any): ResponseObject {
  return { status, data };
}

export async function getHashedPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswordAgainstHash(
  password: string,
  hash: string
) {
  return await bcrypt.compare(password, hash);
}

export async function getUserIdOrThrowError() {
  const session: any = await getServerSession(authOptions);
  if (session?.user) {
    return session.user.id;
  } else {
    throw new Error("user Id not found");
  }
}

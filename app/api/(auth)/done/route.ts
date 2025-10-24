import { prisma } from "@/lib/utils/prisma";

export async function GET() {
  return Response.json({ data: "hi there" });
}

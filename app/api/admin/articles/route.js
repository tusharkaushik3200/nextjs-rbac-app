export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const articles = await prisma.article.findMany({
    include: { author: true },
  });
  return Response.json(articles);
}

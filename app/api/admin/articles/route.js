import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions"; // adjust path if needed
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

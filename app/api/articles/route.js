export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  // Return Unauthorized response if no session
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Fetch articles authored by the logged-in user
    const articles = await prisma.article.findMany({
      where: { authorId: session.user.id },
    });
    // Return articles as JSON
    return new Response(JSON.stringify(articles), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response("Error fetching articles", { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  // Return Unauthorized response if no session
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Parse request body
    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response("Title and content are required", { status: 400 });
    }

    // Create new article in the database
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    // Return the created article as JSON
    return new Response(JSON.stringify(article), { 
      status: 201, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return new Response("Error creating article", { status: 500 });
  }
}

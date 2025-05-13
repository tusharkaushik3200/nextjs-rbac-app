export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return Response.json(user);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { name } = await req.json();
  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  return Response.json(updated);
}

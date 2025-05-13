export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return new Response("Forbidden", { status: 403 });

  const { role } = await req.json();
  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { role },
  });

  return Response.json(updated);
}

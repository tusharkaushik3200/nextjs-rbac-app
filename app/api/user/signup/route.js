export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, password } = await req.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new Response("User already exists", { status: 409 });

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "ADMIN" },
  });

  return Response.json({ id: user.id, email: user.email });
}

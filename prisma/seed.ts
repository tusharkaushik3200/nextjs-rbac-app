import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Admin
  const adminPassword = await bcrypt.hash('adminpass', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create User
  const userPassword = await bcrypt.hash('userpass', 10);
  const user = await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create Articles
  await prisma.article.createMany({
    data: [
      {
        title: 'Admin Article 1',
        content: 'This is the first article by Admin.',
        authorId: admin.id,
      },
      {
        title: 'Admin Article 2',
        content: 'This is the second article by Admin.',
        authorId: admin.id,
      },
      {
        title: 'User Article 1',
        content: 'This is an article by User.',
        authorId: user.id,
      },
    ],
  });

  console.log("✅ Seeded users and articles successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

# 🔐 Next.js Full Stack RBAC App

A full-stack **Role-Based Access Control (RBAC)** application built using **Next.js 14 App Router**, **NextAuth.js**, **Prisma ORM**, and **Tailwind CSS**. Includes admin/user roles, article handling, and secure credential-based authentication.

---

## 🚀 Tech Stack

- ⚛️ Next.js 14 (App Router)
- 🔐 NextAuth.js (Credentials Provider)
- 🗃️ Prisma ORM (SQLite)
- 💨 Tailwind CSS

---

## ⚙️ Setup

```bash
git clone <repo>
cd nextjs-rbac-app
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev

🧪 Seeded Users
The database is seeded with the following credentials:

👑 Admin User
Email: admin@example.com
Password: adminpass
Role: ADMIN

🙋 Regular User
Email: user@example.com
Password: userpass
Role: USER

🔐 Features
Secure login via NextAuth Credentials

Role-based access (ADMIN, USER)

Users can create & view their own articles

Admins can view all users and all articles

API route protection based on role

Clean UI with Tailwind CSS

📁 Folder Structure
/app
  ├── api
  ├── login
  ├── profile
  └── admin
      ├── articles
      └── users
/lib
  └── auth.ts
/prisma
  ├── schema.prisma
  └── seed.ts

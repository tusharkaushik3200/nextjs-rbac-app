'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div className="flex justify-center mt-20 text-xl">Loading...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">🚀 RBAC Dashboard</h1>

        {!session ? (
          <>
            <p className="text-gray-600 mb-6 text-lg">Secure access to your content and admin tools.</p>
            <button
              onClick={() => signIn()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-lg mb-4">
              Welcome, <span className="font-semibold text-gray-900">{session.user.name}</span> 👋
            </p>
            <p className="text-sm mb-6 text-gray-500">Role: <span className="uppercase font-bold text-indigo-600">{session.user.role}</span></p>

            <div className="flex flex-col gap-3 mb-6">
              <Link href="/profile" className="text-blue-600 hover:text-blue-800 font-medium transition">
                🧑‍💼 Profile Page
              </Link>
              <Link href="/articles" className="text-blue-600 hover:text-blue-800 font-medium transition">
                📝 Your Articles
              </Link>
              {session.user.role === 'ADMIN' && (
                <>
                  <Link href="/admin" className="text-red-600 hover:text-red-800 font-medium transition">
                    🛠️ Admin Dashboard
                  </Link>
                  <Link href="/admin/articles" className="text-red-600 hover:text-red-800 font-medium transition">
                    📚 All Articles
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </main>
  );
}

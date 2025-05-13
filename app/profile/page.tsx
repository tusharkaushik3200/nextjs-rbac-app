'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

const fetchArticles = async () => {
  try {
    const res = await fetch(
      session?.user.role === "ADMIN" ? "/api/admin/articles" : "/api/articles"
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`);
    }

    const data = await res.json();
    setArticles(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    setArticles([]); // or show error UI
  }
};


  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.content) {
      alert('Please fill out all fields');
      return;
    }

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });

    if (res.ok) {
      setNewArticle({ title: '', content: '' });
      fetchArticles(); // Refresh the article list
    } else {
      alert('Failed to create article');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-gray-600">🚫 You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 Profile</h1>

        <div className="space-y-4 text-gray-700 mb-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{session.user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{session.user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold uppercase text-indigo-600">{session.user?.role}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={fetchArticles}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            View Articles
          </button>

          {session.user.role === 'ADMIN' && (
            <button
              onClick={fetchUsers}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              View Users
            </button>
          )}

          <button
            onClick={() => signOut()}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Create Article Form */}
        {session.user.role !== 'ADMIN' && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Create a New Article</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500">Title</label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500">Content</label>
                <textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>

              <button
                onClick={handleCreateArticle}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Create Article
              </button>
            </div>
          </div>
        )}

        {/* Articles Section */}
        {articles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">
              {session.user.role === 'ADMIN' ? '📚 All Articles' : '📝 My Articles'}
            </h2>
            <ul className="space-y-4">
              {articles.map((article: any) => (
                <li key={article?.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {session.user.role === 'ADMIN' && `By: ${article.author?.email}`}
                  </p>
                  <p>{article.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Users Section */}
        {users.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">👥 All Users</h2>
            <ul className="space-y-4">
              {users.map((user: any) => (
                <li key={user.id} className="border p-4 rounded">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm uppercase text-indigo-500">{user.role}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

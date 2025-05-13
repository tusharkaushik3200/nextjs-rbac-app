export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminArticlesPage() {
  const user = await getCurrentUser();
  if (user?.role !== "ADMIN") return <p>Unauthorized</p>;
  const articles = await prisma.article.findMany({ include: { author: true } });

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">All Articles</h1>
      {articles.map((article: any) => (
        <div key={article.id} className="border p-4 mb-2">
          <h2 className="font-semibold">{article.title}</h2>
          <p>{article.content}</p>
          <p className="text-sm text-gray-500">by {article.author.name}</p>
        </div>
      ))}
    </div>
  );
}
import Link from 'next/link';
import { getAllPosts } from '@/app/lib/mdx';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Ed Needham's Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Create your first post in the <code className="bg-gray-100 px-2 py-1 rounded">/posts</code> directory!</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
              <Link href={`/posts/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
              </Link>
              <div className="text-gray-600 text-sm mb-3">
                <time>{post.date}</time>
                {post.author && <span> • {post.author}</span>}
              </div>
              {post.tags && (
                <div className="flex gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-700 mb-3">{post.excerpt}</p>
              <Link 
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
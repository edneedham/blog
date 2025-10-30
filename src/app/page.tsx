import Link from 'next/link';
import { getAllPosts } from '@/app/lib/mdx';
import Image from 'next/image';

export default function Home() {
  const posts = getAllPosts();
  const generalTechPosts = posts.filter(post => post.category === 'general-tech');
  const devDiaries = posts.filter(post => post.category === 'dev-diary');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Edward Needham&apos;s Blog</h1>
      
      {/* Technical Blog Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">General Tech</h2>
        {generalTechPosts.length === 0 ? (
          <p className="text-gray-600">No general tech posts yet.</p>
        ) : (
          <div className="space-y-8">
            {generalTechPosts.map(post => (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <Link href={`/posts/${post.slug}`} className="group">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
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
      </section>

      {/* Dev Stories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dev Diary</h2>
        <p className="text-gray-600 mb-4 italic">Engineering problems we&apos;ve faced while developing En Punto and how we solved them.</p>
        {devDiaries.length === 0 ? (
          <p className="text-gray-600">No dev stories yet.</p>
        ) : (
          <div className="space-y-8">
            {devDiaries.map(post => (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <Link href={`/posts/${post.slug}`} className="group">
                    <h3 className="text-2xl font-semibold group-hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                </Link>
                <div className="text-gray-600 text-sm mb-3">
                  <time>{post.date}</time>
                  {post.author && <span> • {post.author}</span>}
                </div>
                {post.tags && (
                  <div className="flex gap-2 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {tag === 'En Punto' ? (<div className="flex items-center gap-2"><span>En Punto</span><Image 
                          src="/enpunto.webp" 
                          alt="En Punto" 
                          width={20} 
                          height={20}
                          className="rounded"
                        /></div>) : tag}
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
      </section>
    </div>
  );
}
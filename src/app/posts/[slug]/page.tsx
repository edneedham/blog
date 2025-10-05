import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/app/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Callout } from '@/app/components/Callout';

// Custom components you can use in MDX
const components = {
  Callout,
  h1: (props: any) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-3 mt-8" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-600 text-sm">
          <time>{post.date}</time>
          {post.author && <span> • {post.author}</span>}
        </div>
        {post.tags && (
          <div className="flex gap-2 mt-3">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}

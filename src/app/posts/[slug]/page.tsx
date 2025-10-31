import { notFound } from 'next/navigation';
import { getPostBySlug  } from '@/app/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '../../components/Header';
import Image from 'next/image';

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-medium mb-6 mt-8 first:mt-0" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-medium mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="mb-6 leading-relaxed text-gray-700" {...props} />,
  a: (props: any) => <a className="underline hover:opacity-60 transition-opacity" {...props} />,
  code: (props: any) => <code className="bg-gray-50 px-1.5 py-0.5 rounded text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto mb-6" {...props} />,
  ul: (props: any) => <ul className="mb-6 space-y-2 list-disc list-inside" {...props} />,
  ol: (props: any) => <ol className="mb-6 space-y-2 list-decimal list-inside" {...props} />,
};

// ... keep generateStaticParams and generateMetadata the same ...

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Header />
        {post.category === 'dev-diary' && (
          <div className="flex items-center mb-2"><h3 className="text-l font-medium pr-2 text-gray-500">Dev Diary</h3><Image src="/enpunto.webp" width="16" height="16" alt="en punto logo"/></div>
        )}
        <h1 className="text-3xl font-medium mb-3">{post.title}</h1>
        <div className="text-gray-400 text-sm">
          <time>{post.date}</time>
        </div>
      <div className="prose-custom">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
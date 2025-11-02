import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/app/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '../../components/Header'
import Image from 'next/image'

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-7" {...props} />,
  a: (props: any) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
  ul: (props: any) => <ul className="mb-4 ml-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  code: (props: any) => <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />,
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Header />
      {post.category === 'dev-diary' && (
        <div className="flex items-center mb-2">
          <h3 className="text-l font-medium pr-2 text-gray-500">Dev Diary</h3>
          <Image
            src="/enpunto.webp"
            width="16"
            height="16"
            alt="en punto logo"
          />
        </div>
      )}
      <h1 className="text-3xl font-medium mb-3">{post.title}</h1>
      <div className="text-gray-400 text-sm">
        <time>{post.date}</time>
      </div>
      <div className="prose-custom">
        <MDXRemote source={post.content} components={components}/>
      </div>
    </article>
  )
}

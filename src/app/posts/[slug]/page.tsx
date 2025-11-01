import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/app/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '../../components/Header'
import Image from 'next/image'

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
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}

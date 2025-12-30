import PostPage from '@/app/components/PostPage'
import { getPostBySlug } from '@/app/lib/mdx'

export default async function EnglishPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PostPage slug={slug} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${slug}`,
      languages: {
        en: `/posts/${slug}`,
        es: `/es/posts/${slug}`,
      },
    },
  }
}

import PostPage from '@/app/components/PostPage'

export default async function SpanishPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PostPage slug={slug} locale="es" />
}

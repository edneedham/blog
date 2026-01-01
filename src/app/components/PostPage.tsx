import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/app/lib/mdx'
import CICDWorkflow, { OldCICDWorkflow } from '@/app/components/CI-CD'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from './Header'
import Image from 'next/image'

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: (props: any) => (
    <p className="mb-4 leading-7 text-foreground-muted" {...props} />
  ),
  a: (props: any) => <a className="text-blue-500 hover:underline" {...props} />,
  ul: (props: any) => (
    <ul className="mb-4 ml-6 list-disc text-foreground-muted" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 ml-6 list-decimal text-foreground-muted" {...props} />
  ),
  li: (props: any) => <li className="mb-2" {...props} />,
  code: (props: any) => (
    <code
      className="bg-foreground/10 px-1.5 py-0.5 rounded text-sm"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-foreground/10 p-4 rounded-lg overflow-x-auto mb-4"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-border pl-4 italic my-4"
      {...props}
    />
  ),
  CICDWorkflow,
  OldCICDWorkflow,
}

interface PostPageProps {
  slug: string
  locale?: string
}

export default async function PostPage({ slug, locale }: PostPageProps) {
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Header />
      {post.category === 'dev-diary' && (
        <div className="flex items-center mb-2">
          {locale === 'es' ? (
            <h3 className="text-l font-medium pr-2 text-foreground-subtle">
              Diario de Desarrollo
            </h3>
          ) : (
            <h3 className="text-l font-medium pr-2 text-foreground-subtle">
              Dev Diary
            </h3>
          )}
          <Image
            src="/enpunto.webp"
            width="16"
            height="16"
            alt="en punto logo"
          />
        </div>
      )}
      <h1 className="text-3xl font-medium mb-3">{post.title}</h1>
      <div className="text-foreground-subtle text-sm">
        <time>{post.date}</time>
      </div>
      <div className="prose-custom">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}

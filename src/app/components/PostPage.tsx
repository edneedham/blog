import { Children, isValidElement, Suspense, type ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostYear } from '@/app/lib/mdx'
import CICDWorkflow, { OldCICDWorkflow } from '@/app/components/CI-CD'
import WireGaugeCalculator from '@/app/components/WireGaugeCalculator'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

function paragraphContainsOnlyImages(children: ReactNode) {
  const nodes = Children.toArray(children).filter((child) => {
    if (typeof child === 'string') return child.trim() !== ''
    return true
  })
  return (
    nodes.length > 0 &&
    nodes.every(
      (child) => isValidElement(child) && 'src' in (child.props as object),
    )
  )
}

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: ({ children, ...props }: any) =>
    paragraphContainsOnlyImages(children) ? (
      <div className="mb-4">{children}</div>
    ) : (
      <p className="mb-4 leading-7 text-foreground-muted" {...props}>
        {children}
      </p>
    ),
  img: ({ className, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={['h-auto rounded-lg max-w-full', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
  figure: ({ className, ...props }: any) => (
    <figure
      {...props}
      className={['post-figure', className].filter(Boolean).join(' ')}
    />
  ),
  figcaption: ({ className, ...props }: any) => (
    <figcaption
      {...props}
      className={['post-figcaption', className].filter(Boolean).join(' ')}
    />
  ),
  a: (props: any) => <a className="text-blue-500 hover:underline" {...props} />,
  ul: (props: any) => (
    <ul className="mb-4 ml-6 list-disc text-foreground-muted" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 ml-6 list-decimal text-foreground-muted" {...props} />
  ),
  li: (props: any) => <li className="mb-2" {...props} />,
  code: ({ className, ...props }: any) => {
    const isBlock =
      typeof className === 'string' &&
      (className.includes('hljs') || className.includes('language-'))
    return (
      <code
        className={
          isBlock
            ? className
            : ['bg-foreground/10 px-1.5 py-0.5 rounded text-sm', className]
                .filter(Boolean)
                .join(' ')
        }
        {...props}
      />
    )
  },
  pre: ({ className, ...props }: any) => (
    <pre
      className={['overflow-x-auto mb-4 rounded-lg p-4 text-sm', className]
        .filter(Boolean)
        .join(' ')}
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
  WireGaugeCalculator,
}

interface PostPageProps {
  slug: string
}

export default async function PostPage({ slug }: PostPageProps) {
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      {post.category === 'en-punto' && (
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-medium pr-2 text-foreground-subtle">
            En Punto
          </h2>
          <Image
            src="/enpunto.webp"
            width="16"
            height="16"
            alt="En Punto logo"
          />
        </div>
      )}
      <h1 className="text-3xl font-medium mb-4">{post.title}</h1>
      <div className="text-foreground-subtle text-sm mb-10">
        <time dateTime={post.date}>{getPostYear(post.date)}</time>
      </div>
      <div className="prose-custom [&>:first-child]:mt-0">
        <Suspense>
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex, rehypeHighlight],
              },
            }}
          />
        </Suspense>
      </div>
    </article>
  )
}

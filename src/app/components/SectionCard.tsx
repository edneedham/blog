import React from 'react'
import Link from 'next/link'
import { PostMetadata } from '../lib/mdx'
import Image from 'next/image'

interface SectionCardProps {
  title?: string
  posts: PostMetadata[]
  locale: string
  logo?: string
}

export default function SectionCard({
  title,
  posts,
  locale,
  logo,
}: SectionCardProps) {
  return (
    <section>
      {title && (
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-medium pr-2 text-foreground-subtle">
            {title}
          </h2>
          {logo && (
            <Image src={logo} width="16" height="16" alt="en punto logo" />
          )}
        </div>
      )}
      {posts.length === 0 ? (
        <p className="text-foreground-subtle">
          {locale === 'es' ? 'No hay posts' : 'No posts yet'}
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={`${post.locale}-${post.slug}`}>
              <Link
                href={
                  post.locale === 'es'
                    ? `/es/posts/${post.slug}`
                    : `/posts/${post.slug}`
                }
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h3>
                  <time className="text-foreground-subtle shrink-0 text-sm">
                    {post.date}
                  </time>
                </div>
                <p className="text-foreground-muted text-sm mb-3">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

import React from 'react'
import Link from 'next/link'
import { PostMetadata, getPostYear } from '../lib/mdx'
import Image from 'next/image'

interface SectionCardProps {
  title?: string
  posts: PostMetadata[]
  logo?: string
}

export default function SectionCard({
  title,
  posts,
  logo,
}: SectionCardProps) {
  return (
    <section>
      {title && (
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
            {title}
          </h2>
          {logo && (
            <Image src={logo} width="12" height="12" alt="En Punto logo" />
          )}
        </div>
      )}
      {posts.length === 0 ? (
        <p className="text-foreground-subtle">No posts yet</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h3>
                  <time
                    dateTime={post.date}
                    className="text-foreground-subtle shrink-0 text-sm"
                  >
                    {getPostYear(post.date)}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="text-foreground-muted text-sm mb-3">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

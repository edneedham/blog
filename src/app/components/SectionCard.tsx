import React from 'react'
import Link from 'next/link'
import { PostMetadata } from '../lib/mdx'
import Image from 'next/image'

interface SectionCardProps {
  title?: string
  description?: string
  posts: PostMetadata[]
  logo?: string
}

export default function SectionCard({
  title,
  description,
  posts,
  logo,
}: SectionCardProps) {
  return (
    <section className="mb-12 pb-3 border-b border-gray-300">
      {title && (
        <div className="flex items-center mb-0.5">
          <h3 className="text-l font-medium pr-2 text-gray-500">{title}</h3>
          {logo && (
            <Image src={logo} width="16" height="16" alt="en punto logo" />
          )}
        </div>
      )}
      {description && (
        <p className="text-gray-400 mb-2 text-sm">{description}</p>
      )}
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block">
                <h3 className="text-xl font-medium group-hover:bg-gray-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                <time className="text-gray-400 text-sm">{post.date}</time>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

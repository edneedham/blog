import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  author?: string
  tags?: string[]
  category?: string
  language?: string
  slug: string
  locale?: string
}

export interface Post extends PostMetadata {
  content: string
}

export function getAllPosts(locale?: string): PostMetadata[] {
  const postsDirectory = locale
    ? path.join(process.cwd(), `/src/app/${locale}/posts`)
    : path.join(process.cwd(), '/src/app/posts')

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        ...data,
        locale: locale || 'en',
      } as PostMetadata
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(
  slug: string,
  locale?: string
): Promise<Post | null> {
  try {
    const postsDirectory = locale
      ? path.join(process.cwd(), `/src/app/${locale}/posts`)
      : path.join(process.cwd(), '/src/app/posts')
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      ...data,
      locale: locale || 'en',
      content,
    } as Post
  } catch {
    return null
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(path.join(process.cwd(), '/src/app/posts'))
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getPostsByCategory(category: string): PostMetadata[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category).filter(Boolean))
  return Array.from(categories) as string[]
}

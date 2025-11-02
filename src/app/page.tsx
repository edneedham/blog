import { getAllPosts } from '@/app/lib/mdx'
import SectionCard from './components/SectionCard'
import Header from './components/Header'

export default function Home() {
  const allPosts = getAllPosts()

  // Get the latest post (first in sorted array)
  const latestPost = allPosts[0]

  const generalPosts = allPosts.filter((post) => post.category === 'general')
  const devDiaries = allPosts.filter((post) => post.category === 'dev-diary')

  const sections = [
    {
      key: 'general',
      posts: generalPosts,
    },
    {
      key: 'dev-diary',
      title: 'Dev Diary',
      description:
        "Engineering problems we've faced while developing En Punto and how we solved them.",
      posts: devDiaries,
      logo: '/enpunto.webp',
    },
  ]

  const sortedSections =
    latestPost?.category === 'dev-diary' ? [...sections].reverse() : sections

  return (
    <div>
      <Header />
      {sortedSections.map((section) => (
        <SectionCard
          key={section.key}
          title={section.title}
          description={section.description}
          posts={section.posts}
          logo={section.logo}
        />
      ))}
    </div>
  )
}

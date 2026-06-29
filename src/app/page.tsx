import { Fragment } from 'react'
import { getAllPosts } from '@/app/lib/mdx'
import SectionCard from './components/SectionCard'
import Header from './components/Header'

export default async function Home() {
  const allPosts = getAllPosts()
  const latestPost = allPosts[0]

  const generalPosts = allPosts.filter((post) => post.category === 'general')
  const devDiaries = allPosts.filter((post) => post.category === 'en-punto')

  const sections = [
    {
      key: 'general',
      title: 'General',
      posts: generalPosts,
    },
    {
      key: 'en-punto',
      title: 'En Punto',
      posts: devDiaries,
      logo: '/enpunto.webp',
    },
  ]

  const sortedSections =
    latestPost?.category === 'en-punto' ? [...sections].reverse() : sections

  return (
    <div>
      <Header />
      {sortedSections.map((section, index) => (
        <Fragment key={section.key}>
          {index > 0 && (
            <hr className="my-12 border-0 border-t border-border" />
          )}
          <SectionCard
            title={section.title}
            posts={section.posts}
            logo={section.logo}
          />
        </Fragment>
      ))}
    </div>
  )
}

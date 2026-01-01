import { getAllPosts } from '@/app/lib/mdx'
import SectionCard from './components/SectionCard'
import Header from './components/Header'

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const selectedLanguage = (params.lang as string) || 'en'

  // Get posts from both locales
  const englishPosts = getAllPosts().map((post) => ({ ...post, locale: 'en' }))
  const spanishPosts = getAllPosts('es').map((post) => ({
    ...post,
    locale: 'es',
  }))
  const allPosts = [...englishPosts, ...spanishPosts].sort((a, b) =>
    a.date < b.date ? 1 : -1
  )

  // Get the latest post (first in sorted array)
  const latestPost = allPosts[0]

  // Filter posts by selected language only
  const generalPosts = allPosts.filter(
    (post) => post.category === 'general' && post.locale === selectedLanguage
  )
  const devDiaries = allPosts.filter(
    (post) => post.category === 'en-punto' && post.locale === selectedLanguage
  )

  const sections = [
    {
      key: 'general',
      title:
        selectedLanguage === 'es'
          ? 'General'
          : 'General',
      locale: selectedLanguage,
      posts: generalPosts,
    },
    {
      key: 'en-punto',
      title: 'En Punto',
      description:
        selectedLanguage === 'es'
          ? 'Problemas de ingeniería que hemos enfrentado al desarrollar En Punto y cómo los resolvimos.'
          : "Engineering problems we've faced while developing En Punto and how we solved them.",
      posts: devDiaries,
      locale: selectedLanguage,
      logo: '/enpunto.webp',
    },
  ]

  const sortedSections =
    latestPost?.category === 'en-punto' ? [...sections].reverse() : sections

  return (
    <div>
      <Header selectedLanguage={selectedLanguage} />
      {sortedSections.map((section) => (
        <SectionCard
          key={section.key}
          title={section.title}
          description={section.description}
          posts={section.posts}
          locale={section.locale}
          logo={section.logo}
        />
      ))}
    </div>
  )
}

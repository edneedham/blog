'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdaptiveLogo from './AdaptiveLogo'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  selectedLanguage?: string
}

export default function Header({ selectedLanguage }: HeaderProps) {
  const pathname = usePathname()

  const currentLanguage =
    selectedLanguage || (pathname.startsWith('/es') ? 'es' : 'en')

  const getLanguageLink = (lang: string) => {
    const params = new URLSearchParams()
    params.set('lang', lang)
    return `/?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <Link href="/">
          <h1 className="text-xl font-medium hover:opacity-60 transition-opacity">
            Edward Needham
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-4">
        <ThemeToggle />
        <div className="flex items-center space-x-1 p-1">
          <Link
            href={getLanguageLink('en')}
            className={`px-2 py-1 text-sm transition-colors ${
              currentLanguage === 'en'
                ? 'font-semibold underline underline-offset-4'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            EN
          </Link>
          <Link
            href={getLanguageLink('es')}
            className={`px-2 py-1 text-sm transition-colors ${
              currentLanguage === 'es'
                ? 'font-semibold underline underline-offset-4'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            ES
          </Link>
        </div>

        <Link
          href="https://x.com/needhame"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity p-1"
        >
          <AdaptiveLogo
            lightSrc="/x-logo-black.png"
            darkSrc="/x-logo-white.png"
            alt="The X logo"
            height={16}
            width={16}
          />
        </Link>
        <Link
          href="https://linkedin.com/in/edward-needham/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-60 transition-opacity p-1"
        >
          <AdaptiveLogo
            lightSrc="/InBug-Black.png"
            darkSrc="/InBug-White.png"
            alt="The X logo"
            height={19}
            width={19}
          />
        </Link>
      </div>
    </div>
  )
}

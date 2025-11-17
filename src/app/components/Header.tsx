'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdaptiveLogo from './AdaptiveLogo'

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
          <h1 className="text-xl font-medium hover:bg-gray-300 rounded-xs transition-colors">
            Edward Needham
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center space-x-1 p-1">
          <Link
            href={getLanguageLink('en')}
            className={`px-3 py-1 text-sm transition-colors ${
              currentLanguage === 'en' ? 'bg-gray-300' : 'hover:text-gray-700'
            }`}
          >
            English
          </Link>
          <Link
            href={getLanguageLink('es')}
            className={`px-3 py-1 text-sm transition-colors ${
              currentLanguage === 'es' ? 'bg-gray-300' : 'hover:text-gray-700'
            }`}
          >
            Español
          </Link>
        </div>

        <Link
          href="https://x.com/needhame"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-gray-300 transition-colors p-1"
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
          className="hover:bg-gray-300 transition-colors p-1"
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

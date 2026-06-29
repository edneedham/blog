'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdaptiveLogo from './AdaptiveLogo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isAboutPage = pathname === '/about'

  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-6">
        {isHomePage ? (
          <h1 className="text-xl font-medium" aria-current="page">
            Edward Needham
          </h1>
        ) : (
          <Link href="/">
            <h1 className="text-xl font-medium hover:opacity-60 transition-opacity">
              Edward Needham
            </h1>
          </Link>
        )}
        {isAboutPage ? (
          <span className="text-sm opacity-60" aria-current="page">
            About
          </span>
        ) : (
          <Link
            href="/about"
            className="text-sm opacity-60 transition-opacity hover:opacity-100"
          >
            About
          </Link>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <ThemeToggle />
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

import React from 'react'
import Link from 'next/link'
import AdaptiveLogo from './AdaptiveLogo'

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <Link href="/">
          <h1 className="text-xl font-medium hover:bg-gray-300 rounded-xs transition-colors">
            Edward Needham
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-end">
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

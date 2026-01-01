'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface AdaptiveLogoProps {
  lightSrc: string
  darkSrc: string
  width: number | `${number}` | undefined
  height: number | `${number}` | undefined
  alt: string
  className?: string
}

export default function AdaptiveLogo({
  lightSrc,
  darkSrc,
  width,
  height,
  alt,
  className = '',
}: AdaptiveLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mounting, show both images with CSS-based visibility
  // This prevents hydration mismatch while still showing correct image
  if (!mounted) {
    return (
      <>
        <Image
          src={lightSrc}
          width={width}
          height={height}
          alt={alt}
          className={`dark-mode-hidden ${className}`}
        />
        <Image
          src={darkSrc}
          width={width}
          height={height}
          alt={alt}
          className={`light-mode-hidden ${className}`}
        />
      </>
    )
  }

  // After mounting, use resolved theme for accurate switching
  const src = resolvedTheme === 'dark' ? darkSrc : lightSrc

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  )
}

'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <button className="p-2" aria-label="Toggle theme">
        <Sun size={18} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

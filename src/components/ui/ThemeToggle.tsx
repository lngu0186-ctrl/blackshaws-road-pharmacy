'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)]"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" style={{ color: 'var(--color-highlight)' }} />
      ) : (
        <Moon className="w-5 h-5" style={{ color: 'var(--color-muted)' }} />
      )}
    </button>
  )
}

"use client"

import { useEffect } from "react"
import { useEditorStore } from "@/lib/store"

/**
 * Syncs the Zustand theme state → document.documentElement.classList
 * Must be rendered inside the editor so the store is available.
 */
export function ThemeSync() {
  const theme = useEditorStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  return null
}

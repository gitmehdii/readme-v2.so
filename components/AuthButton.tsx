"use client"

import React, { useState, useEffect, useRef } from "react"
import { Github, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { signInWithGitHub, signOut } from "@/lib/auth"
import type { User } from "@supabase/supabase-js"

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  if (loading) {
    return <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
  }

  if (!user) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={signInWithGitHub}
        className="gap-1.5 h-8 text-xs"
      >
        <Github className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Login with GitHub</span>
        <span className="sm:hidden">Login</span>
      </Button>
    )
  }

  const username = user.user_metadata?.user_name ?? user.email ?? "User"
  const avatarUrl: string | undefined = user.user_metadata?.avatar_url

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-accent transition-colors"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={username}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            {username[0].toUpperCase()}
          </div>
        )}
        <span className="text-xs font-medium hidden sm:inline max-w-[100px] truncate">
          {username}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-md shadow-lg z-50 py-1">
          <button
            onClick={() => {
              signOut()
              setDropdownOpen(false)
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-accent transition-colors text-left"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

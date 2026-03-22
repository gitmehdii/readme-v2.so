"use client"

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, X } from "lucide-react"
import { Toolbar } from "@/components/Toolbar"
import { ThemeSync } from "@/components/ThemeSync"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"
import { SEED_COMMUNITY_BLOCKS } from "@/lib/seed-data"
import {
  CommunityBlockCard,
  type CommunityBlock,
} from "@/components/community/CommunityBlockCard"
import { ShareBlockModal } from "@/components/community/ShareBlockModal"
import { cn } from "@/lib/utils"

type SortOption = "top" | "newest" | "forks"
type CategoryFilter =
  | "all"
  | "essentials"
  | "setup"
  | "project"
  | "community"
  | "profile"
  | "other"

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "top", label: "Top voted" },
  { value: "newest", label: "Newest" },
  { value: "forks", label: "Most forked" },
]

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "essentials", label: "Essentials" },
  { value: "setup", label: "Setup" },
  { value: "project", label: "Project" },
  { value: "community", label: "Community" },
  { value: "profile", label: "Profile" },
  { value: "other", label: "Other" },
]

function BlockSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-muted" />
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-3 w-12 bg-muted rounded ml-auto" />
      </div>
      <div className="h-4 w-3/4 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-16 bg-muted rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-12 bg-muted rounded" />
        <div className="h-6 w-12 bg-muted rounded" />
        <div className="h-6 w-16 bg-muted rounded" />
      </div>
    </div>
  )
}

const VOTED_KEY = "readme_voted_blocks"

function getStoredVotes(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(VOTED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveStoredVotes(ids: Set<string>) {
  localStorage.setItem(VOTED_KEY, JSON.stringify([...ids]))
}

export default function CommunityPage() {
  const router = useRouter()
  const [blocks, setBlocks] = useState<CommunityBlock[]>([])
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortOption>("top")
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [search, setSearch] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)
  const [forkContent, setForkContent] = useState<string | undefined>()

  // Load voted IDs from localStorage
  useEffect(() => {
    setVotedIds(getStoredVotes())
  }, [])

  // Fetch blocks
  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("community_blocks")
          .select("*")
          .order(sort === "top" ? "votes" : sort === "forks" ? "forks" : "created_at", {
            ascending: false,
          })
        if (error) throw error
        if (data && data.length > 0) {
          setBlocks(data)
        } else {
          // Use seed data when table is empty
          const sorted = [...SEED_COMMUNITY_BLOCKS].sort((a, b) => {
            if (sort === "top") return b.votes - a.votes
            if (sort === "forks") return b.forks - a.forks
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          })
          setBlocks(sorted as CommunityBlock[])
        }
      } catch {
        const sorted = [...SEED_COMMUNITY_BLOCKS].sort((a, b) => {
          if (sort === "top") return b.votes - a.votes
          if (sort === "forks") return b.forks - a.forks
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
        setBlocks(sorted as CommunityBlock[])
      } finally {
        setLoading(false)
      }
    }
    fetchBlocks()
  }, [sort])

  const handleVote = useCallback(
    async (blockId: string, currentlyVoted: boolean) => {
      // Optimistic update
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === blockId
            ? { ...b, votes: b.votes + (currentlyVoted ? -1 : 1) }
            : b
        )
      )
      setVotedIds((prev) => {
        const next = new Set(prev)
        if (currentlyVoted) next.delete(blockId)
        else next.add(blockId)
        saveStoredVotes(next)
        return next
      })

      try {
        if (currentlyVoted) {
          await supabase.rpc("decrement_block_votes", { bid: blockId })
        } else {
          await supabase.rpc("increment_block_votes", { bid: blockId })
        }
      } catch {
        // Revert on error
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === blockId
              ? { ...b, votes: b.votes + (currentlyVoted ? 1 : -1) }
              : b
          )
        )
        setVotedIds((prev) => {
          const next = new Set(prev)
          if (currentlyVoted) next.add(blockId)
          else next.delete(blockId)
          saveStoredVotes(next)
          return next
        })
      }
    },
    []
  )

  const handleFork = useCallback((content: string) => {
    setForkContent(content)
    setShowShareModal(true)
  }, [])

  const handleAddToCanvas = useCallback((content: string) => {
    localStorage.setItem("pending_block", content)
    router.push("/")
  }, [router])

  const handleShareBlock = async (block: {
    title: string
    category: string
    description: string
    content: string
    authorName: string
  }) => {
    const { data, error } = await supabase
      .from("community_blocks")
      .insert({
        author_username: block.authorName,
        author_avatar: null,
        title: block.title,
        category: block.category,
        description: block.description || null,
        content: block.content,
      })
      .select()
      .single()
    if (error) throw error
    if (data) {
      setBlocks((prev) => [data, ...prev])
      toast({ title: "Block shared!", description: "Your block is now live in the community.", variant: "success" })
    }
  }

  // Filter + search
  const filtered = blocks
    .filter((b) => category === "all" || b.category === category)
    .filter(
      (b) =>
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description?.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ThemeSync />
      <Toolbar />

      {/* Page header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Community Blocks</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Browse, share, and remix markdown blocks created by the community.
              </p>
            </div>
            <Button
              onClick={() => {
                setForkContent(undefined)
                setShowShareModal(true)
              }}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Share a block
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6 w-full flex-1 flex gap-6">
        {/* Sidebar */}
        <aside className="w-[200px] shrink-0 space-y-5 hidden md:block">
          {/* Sort */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Sort by
            </p>
            <div className="space-y-0.5">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors",
                    sort === s.value
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Category
            </p>
            <div className="space-y-0.5">
              {CATEGORY_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors",
                    category === c.value
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Block grid */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search blocks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Mobile filters */}
          <div className="flex gap-2 mb-4 md:hidden overflow-x-auto pb-1">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn(
                  "shrink-0 px-2.5 py-1 rounded-full text-xs border transition-colors",
                  category === c.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <BlockSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm">No blocks found.</p>
              <p className="text-xs mt-1">Try adjusting your filters or be the first to share one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((block) => (
                <CommunityBlockCard
                  key={block.id}
                  block={block}
                  hasVoted={votedIds.has(block.id)}
                  onVote={handleVote}
                  onFork={handleFork}
                  onAddToCanvas={handleAddToCanvas}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <ShareBlockModal
          prefillContent={forkContent}
          onClose={() => {
            setShowShareModal(false)
            setForkContent(undefined)
          }}
          onSubmit={handleShareBlock}
        />
      )}

      <Toaster />
    </div>
  )
}

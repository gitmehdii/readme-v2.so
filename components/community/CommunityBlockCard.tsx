"use client"

import React, { useState } from "react"
import { ThumbsUp, MessageSquare, GitFork, Plus, Flag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export type CommunityBlock = {
  id: string
  author_id: string
  author_username: string
  author_avatar: string | null
  title: string
  category: string
  content: string
  description: string | null
  votes: number
  forks: number
  is_flagged: boolean
  created_at: string
}

export type BlockComment = {
  id: string
  author_username: string
  author_avatar: string | null
  content: string
  created_at: string
}

interface CommunityBlockCardProps {
  block: CommunityBlock
  hasVoted: boolean
  onVote: (blockId: string, currentlyVoted: boolean) => void
  onFork: (content: string) => void
  onAddToCanvas: (content: string) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  essentials: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  setup: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  project: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  community: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  profile: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  other: "bg-muted text-muted-foreground",
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function CommunityBlockCard({
  block,
  hasVoted,
  onVote,
  onFork,
  onAddToCanvas,
}: CommunityBlockCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<BlockComment[]>([])
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  const previewLines = block.content.split("\n").slice(0, 3).join("\n")

  const handleToggleComments = async () => {
    if (!showComments && !commentsLoaded) {
      try {
        const { data } = await supabase
          .from("block_comments")
          .select("id, author_username, author_avatar, content, created_at")
          .eq("block_id", block.id)
          .order("created_at", { ascending: true })
        if (data) {
          setComments(data)
          setCommentCount(data.length)
          setCommentsLoaded(true)
        }
      } catch {
        // seed data — no real DB
        setCommentsLoaded(true)
      }
    }
    setShowComments((v) => !v)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3 hover:border-border/80 transition-colors">
      {/* Author + time */}
      <div className="flex items-center gap-2">
        {block.author_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.author_avatar}
            alt={block.author_username}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
            {block.author_username[0].toUpperCase()}
          </div>
        )}
        <span className="text-xs font-medium">{block.author_username}</span>
        <span className="text-xs text-muted-foreground ml-auto">{timeAgo(block.created_at)}</span>
      </div>

      {/* Title + badge */}
      <div className="flex items-start gap-2 flex-wrap">
        <h3 className="text-sm font-semibold leading-snug flex-1">{block.title}</h3>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
            CATEGORY_COLORS[block.category] ?? CATEGORY_COLORS.other
          )}
        >
          {block.category}
        </span>
      </div>

      {/* Description */}
      {block.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{block.description}</p>
      )}

      {/* Markdown preview snippet */}
      <pre className="text-xs font-mono bg-muted/50 border border-border rounded-md px-3 py-2 overflow-hidden line-clamp-3 whitespace-pre-wrap break-all">
        {previewLines}
      </pre>

      {/* Action row */}
      <div className="flex items-center gap-1 flex-wrap">
        {/* Vote */}
        <button
          onClick={() => onVote(block.id, hasVoted)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors",
            hasVoted
              ? "text-primary bg-primary/10 hover:bg-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <ThumbsUp className={cn("h-3.5 w-3.5", hasVoted && "fill-current")} />
          {block.votes}
        </button>

        {/* Comments */}
        <button
          onClick={handleToggleComments}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {commentsLoaded ? commentCount : ""}
        </button>

        {/* Fork */}
        <button
          onClick={() => onFork(block.content)}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <GitFork className="h-3.5 w-3.5" />
          Fork
        </button>

        {/* Add to canvas */}
        <button
          onClick={() => onAddToCanvas(block.content)}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add to canvas
        </button>

        {/* Flag */}
        <button
          className="ml-auto flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground/50 hover:text-muted-foreground hover:bg-accent transition-colors"
          title="Flag as inappropriate"
        >
          <Flag className="h-3 w-3" />
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-border pt-3 space-y-3">
          {comments.length === 0 && (
            <p className="text-xs text-muted-foreground">No comments yet.</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              {c.author_avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.author_avatar}
                  alt={c.author_username}
                  className="h-5 w-5 rounded-full object-cover shrink-0 mt-0.5"
                />
              ) : (
                <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                  {c.author_username[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-medium">{c.author_username}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

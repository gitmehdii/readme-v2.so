"use client"

import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Category = "essentials" | "setup" | "project" | "community" | "profile" | "other"

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "essentials", label: "Essentials" },
  { value: "setup", label: "Setup" },
  { value: "project", label: "Project" },
  { value: "community", label: "Community" },
  { value: "profile", label: "Profile" },
  { value: "other", label: "Other" },
]

interface ShareBlockModalProps {
  prefillContent?: string
  onClose: () => void
  onSubmit: (block: {
    title: string
    category: Category
    description: string
    content: string
    authorName: string
  }) => Promise<void>
}

const AUTHOR_KEY = "readme_author_name"

export function ShareBlockModal({
  prefillContent = "",
  onClose,
  onSubmit,
}: ShareBlockModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category>("essentials")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState(prefillContent)
  const [authorName, setAuthorName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem(AUTHOR_KEY) ?? ""
    return ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<"write" | "preview">("write")

  useEffect(() => {
    setContent(prefillContent)
  }, [prefillContent])

  const canSubmit = title.trim().length > 0 && content.trim().length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)
    setError(null)
    const name = authorName.trim() || "Anonymous"
    if (authorName.trim()) localStorage.setItem(AUTHOR_KEY, authorName.trim())
    try {
      await onSubmit({ title: title.trim(), category, description: description.trim(), content: content.trim(), authorName: name })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to share block. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-semibold text-sm">Share a block</h2>
          <button
            onClick={onClose}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left: form */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 border-r border-border">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">
                Your name <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Anonymous"
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Animated GitHub Stats"
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
                      category === cat.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">
                Description{" "}
                <span className="text-muted-foreground font-normal">(optional, max 200 chars)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                placeholder="Brief description of what this block is for…"
                rows={2}
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "placeholder:text-muted-foreground resize-none",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                )}
              />
              <p className="text-xs text-muted-foreground text-right">{description.length}/200</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium">
                  Markdown content <span className="text-destructive">*</span>
                </label>
                <div className="ml-auto flex border border-border rounded overflow-hidden text-xs">
                  <button
                    onClick={() => setTab("write")}
                    className={cn(
                      "px-2.5 py-0.5 transition-colors",
                      tab === "write" ? "bg-accent" : "text-muted-foreground hover:bg-accent/50"
                    )}
                  >
                    Write
                  </button>
                  <button
                    onClick={() => setTab("preview")}
                    className={cn(
                      "px-2.5 py-0.5 transition-colors",
                      tab === "preview" ? "bg-accent" : "text-muted-foreground hover:bg-accent/50"
                    )}
                  >
                    Preview
                  </button>
                </div>
              </div>
              {tab === "write" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# My awesome block&#10;&#10;Write your markdown here…"
                  rows={10}
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono",
                    "placeholder:text-muted-foreground resize-none",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  )}
                />
              ) : (
                <div className="min-h-[200px] rounded-md border border-border bg-muted/30 p-3 overflow-y-auto prose prose-sm dark:prose-invert max-w-none text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "_Nothing to preview yet_"}</ReactMarkdown>
                </div>
              )}
            </div>

            {error && (
              <p className="text-xs text-destructive border border-destructive/50 bg-destructive/10 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border bg-muted/30 shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="h-8"
          >
            {loading ? "Sharing…" : "Share block"}
          </Button>
        </div>
      </div>
    </div>
  )
}

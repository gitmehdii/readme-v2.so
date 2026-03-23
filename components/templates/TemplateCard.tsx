"use client"

import React, { useState } from "react"
import { ThumbsUp, Eye, ArrowRight, X } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ProfileTemplate = {
  id: string
  author_username: string
  author_avatar: string | null
  title: string
  style: string
  content: string
  votes: number
  created_at: string
}

interface TemplateCardProps {
  template: ProfileTemplate
  onUse: (content: string) => void
}

const STYLE_COLORS: Record<string, string> = {
  developer: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  designer: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  student: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  minimal: "bg-muted text-muted-foreground",
  creative: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "data-scientist": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
}

function TemplatePreviewModal({
  template,
  onClose,
  onUse,
}: {
  template: ProfileTemplate
  onClose: () => void
  onUse: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-semibold text-sm">{template.title}</h2>
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              STYLE_COLORS[template.style] ?? STYLE_COLORS.minimal
            )}
          >
            {template.style}
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 border-r border-border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Preview
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{template.content}</ReactMarkdown>
            </div>
          </div>

          <div className="w-[320px] shrink-0 overflow-y-auto p-4 hidden md:block">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Raw markdown
            </div>
            <pre className="text-xs font-mono bg-muted/50 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-all">
              {template.content}
            </pre>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border bg-muted/30 shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8">
            Close
          </Button>
          <Button size="sm" onClick={onUse} className="h-8 gap-1.5">
            Use this template
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function TemplateCard({ template, onUse }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col hover:border-border/80 transition-colors">
        <div className="relative h-40 overflow-hidden bg-muted/30 border-b border-border">
          <div
            className="absolute inset-0 origin-top-left pointer-events-none"
            style={{ transform: "scale(0.45)", width: "222%", height: "222%" }}
          >
            <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{template.content}</ReactMarkdown>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/50" />
        </div>

        <div className="p-4 flex flex-col gap-3 flex-1">
          <div className="flex items-start gap-2 flex-wrap">
            <h3 className="text-sm font-semibold flex-1">{template.title}</h3>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
                STYLE_COLORS[template.style] ?? STYLE_COLORS.minimal
              )}
            >
              {template.style}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {template.author_avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={template.author_avatar}
                alt={template.author_username}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                {template.author_username[0].toUpperCase()}
              </div>
            )}
            <span className="text-xs text-muted-foreground">{template.author_username}</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <ThumbsUp className="h-3.5 w-3.5" />
              {template.votes}
            </span>
          </div>

          <div className="flex gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 gap-1.5 text-xs"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button
              size="sm"
              className="flex-1 h-8 gap-1.5 text-xs"
              onClick={() => onUse(template.content)}
            >
              Use template
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {showPreview && (
        <TemplatePreviewModal
          template={template}
          onClose={() => setShowPreview(false)}
          onUse={() => {
            setShowPreview(false)
            onUse(template.content)
          }}
        />
      )}
    </>
  )
}

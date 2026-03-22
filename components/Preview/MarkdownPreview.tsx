"use client"

import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Eye } from "lucide-react"
import { useEditorStore } from "@/lib/store"
// highlight.js styles are imported globally in globals.css via a dynamic approach
// We import both themes here; only one will apply based on the .dark class

export function MarkdownPreview() {
  const { getMarkdown, activeBlocks } = useEditorStore()
  const [markdown, setMarkdown] = useState("")

  // Debounce markdown generation to avoid hammering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setMarkdown(getMarkdown())
    }, 150)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBlocks])

  return (
    <aside className="flex flex-col h-full border-l border-border bg-background">
      {/* Panel header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0">
        <Eye className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Rendered Preview
        </span>
        <span className="ml-auto text-xs text-muted-foreground/60 tabular-nums">
          {markdown.split("\n").length} lines
        </span>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-y-auto p-6">
        {markdown.trim() ? (
          <div className="markdown-preview max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // Render task list items correctly
                li: ({ children, ...props }) => {
                  const childArray = React.Children.toArray(children)
                  const first = childArray[0]
                  if (
                    typeof first === "object" &&
                    first !== null &&
                    "props" in first &&
                    (first as React.ReactElement).type === "input"
                  ) {
                    return (
                      <li className="flex items-start gap-2 list-none -ml-4" {...props}>
                        {children}
                      </li>
                    )
                  }
                  return <li {...props}>{children}</li>
                },
                // Open links in new tab
                a: ({ href, children, ...props }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
            <Eye className="h-10 w-10 mb-3 opacity-20" />
            <p className="text-sm">Add blocks to see the preview</p>
          </div>
        )}
      </div>
    </aside>
  )
}

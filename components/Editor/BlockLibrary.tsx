"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Check, Plus, Star, Package, FolderOpen } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BLOCKS, CATEGORIES, type Category } from "@/lib/blocks"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { MyBlocks } from "./MyBlocks"

const categoryIcons: Record<Category, React.ReactNode> = {
  essentials: <Star className="h-3 w-3" />,
  setup: <Package className="h-3 w-3" />,
  project: <FolderOpen className="h-3 w-3" />,
}

function BlockIcon({ name }: { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ className?: string }> | undefined
  if (!Icon) return <LucideIcons.FileText className="h-4 w-4" />
  return <Icon className="h-4 w-4" />
}

interface BlockLibraryProps {
  searchRef?: React.RefObject<HTMLInputElement>
}

export function BlockLibrary({ searchRef }: BlockLibraryProps) {
  const [query, setQuery] = useState("")
  const { activeBlocks, addBlock } = useEditorStore()

  const activeBlockIds = new Set(activeBlocks.map((b) => b.blockId))

  const filtered = query.trim()
    ? BLOCKS.filter((b) =>
        b.label.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase())
      )
    : BLOCKS

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    blocks: filtered.filter((b) => b.category === cat.id),
  })).filter((g) => g.blocks.length > 0)

  return (
    <aside className="flex flex-col h-full w-full border-r border-border bg-background">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Block Library
        </h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchRef}
            placeholder="Search blocks… (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <LucideIcons.X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {grouped.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <LucideIcons.SearchX className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs">No blocks match "{query}"</p>
          </div>
        )}

        {grouped.map((group) => (
          <div key={group.id}>
            <div className="flex items-center gap-1.5 px-1 mb-1.5">
              <span className="text-muted-foreground">{categoryIcons[group.id]}</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </span>
            </div>

            <div className="space-y-0.5">
              {group.blocks.map((block) => {
                const isAdded = activeBlockIds.has(block.id)
                return (
                  <div
                    key={block.id}
                    className={cn(
                      "group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 transition-colors cursor-pointer hover:bg-accent",
                      isAdded && "opacity-70"
                    )}
                    onClick={() => addBlock(block.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-muted-foreground shrink-0">
                        <BlockIcon name={block.icon} />
                      </span>
                      <span className="text-xs font-medium truncate">{block.label}</span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {isAdded && (
                        <span className="text-green-500">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {BLOCKS.length} blocks · {activeBlocks.length} added
        </p>
      </div>

      {/* My Blocks */}
      <MyBlocks />
    </aside>
  )
}

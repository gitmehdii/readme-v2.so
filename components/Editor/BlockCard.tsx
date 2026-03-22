"use client"

import React, { useCallback } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEditorStore, type ActiveBlock } from "@/lib/store"
import { getBlock } from "@/lib/blocks"
import { cn } from "@/lib/utils"

function BlockIcon({ name }: { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ className?: string }> | undefined
  if (!Icon) return <FileText className="h-3.5 w-3.5" />
  return <Icon className="h-3.5 w-3.5" />
}

interface BlockCardProps {
  block: ActiveBlock
  isOverlay?: boolean
}

export function BlockCard({ block, isOverlay }: BlockCardProps) {
  const { removeBlock, updateBlockContent, toggleBlockCollapsed, selectedBlockId, setSelectedBlock } =
    useEditorStore()
  const definition = getBlock(block.blockId)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.instanceId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isSelected = selectedBlockId === block.instanceId

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateBlockContent(block.instanceId, e.target.value)
      // auto-resize
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"
    },
    [block.instanceId, updateBlockContent]
  )

  const handleTextareaRef = useCallback((el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = "auto"
      el.style.height = el.scrollHeight + "px"
    }
  }, [])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg border bg-card transition-all duration-150 animate-fade-in",
        isDragging && "opacity-30",
        isOverlay && "shadow-2xl rotate-1 opacity-95",
        isSelected ? "border-primary/50 shadow-sm shadow-primary/10" : "border-border hover:border-border/80"
      )}
      onClick={() => setSelectedBlock(block.instanceId)}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none shrink-0"
          tabIndex={-1}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Block label */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-muted-foreground">
            <BlockIcon name={definition?.icon ?? "FileText"} />
          </span>
          <span className="text-xs font-semibold truncate">
            {definition?.label ?? block.blockId}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation()
              toggleBlockCollapsed(block.instanceId)
            }}
            aria-label={block.collapsed ? "Expand" : "Collapse"}
          >
            {block.collapsed ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              removeBlock(block.instanceId)
            }}
            aria-label="Remove block"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Editable content */}
      {!block.collapsed && (
        <div className="p-2">
          <textarea
            ref={handleTextareaRef}
            value={block.content}
            onChange={handleContentChange}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "block-textarea w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
              "focus:ring-0 border-0 p-1 rounded"
            )}
            spellCheck={false}
            placeholder="Enter markdown content…"
          />
        </div>
      )}

      {block.collapsed && (
        <div
          className="px-3 py-1.5 cursor-pointer"
          onClick={() => toggleBlockCollapsed(block.instanceId)}
        >
          <p className="text-xs text-muted-foreground truncate font-mono">
            {block.content.split("\n")[0].slice(0, 60)}
            {block.content.length > 60 ? "…" : ""}
          </p>
        </div>
      )}
    </div>
  )
}

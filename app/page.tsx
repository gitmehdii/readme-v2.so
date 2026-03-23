"use client"

export const dynamic = 'force-dynamic'

import React, { useRef, useEffect, useState, useCallback } from "react"
import { useEditorStore } from "@/lib/store"
import { Toolbar } from "@/components/Toolbar"
import { BlockLibrary } from "@/components/Editor/BlockLibrary"
import { Canvas } from "@/components/Editor/Canvas"
import { MarkdownPreview } from "@/components/Preview/MarkdownPreview"
import { Toaster } from "@/components/ui/toaster"
import { ThemeSync } from "@/components/ThemeSync"
import { cn } from "@/lib/utils"
import { BookOpen, LayoutPanelLeft, Eye } from "lucide-react"

const MIN_LIBRARY = 180
const MIN_PANEL = 240

function ResizeHandle({ onDrag }: { onDrag: (dx: number) => void }) {
  const dragging = useRef(false)
  const lastX = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    lastX.current = e.clientX

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastX.current
      lastX.current = e.clientX
      onDrag(dx)
    }
    const onMouseUp = () => {
      dragging.current = false
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }, [onDrag])

  return (
    <div
      onMouseDown={onMouseDown}
      className="w-1 shrink-0 cursor-col-resize bg-border hover:bg-primary/50 transition-colors active:bg-primary select-none"
    />
  )
}

// Mobile tab options
const MOBILE_TABS = [
  { id: "library", label: "Library", icon: BookOpen },
  { id: "editor", label: "Editor", icon: LayoutPanelLeft },
  { id: "preview", label: "Preview", icon: Eye },
] as const
type MobileTab = (typeof MOBILE_TABS)[number]["id"]

export default function HomePage() {
  const { previewMode } = useEditorStore()
  const searchRef = useRef<HTMLInputElement>(null)
  const [mobileTab, setMobileTab] = useState<MobileTab>("editor")
  const [mounted, setMounted] = useState(false)
  const [libraryWidth, setLibraryWidth] = useState(280)
  const [previewWidth, setPreviewWidth] = useState(420)

  const dragLibrary = useCallback((dx: number) => {
    setLibraryWidth((w) => Math.max(MIN_LIBRARY, w + dx))
  }, [])

  const dragPreview = useCallback((dx: number) => {
    setPreviewWidth((w) => Math.max(MIN_PANEL, w - dx))
  }, [])

  // Prevent SSR hydration mismatch from localStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  // Cmd/Ctrl + K → focus block search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm">Loading editor…</p>
        </div>
      </div>
    )
  }

  const showLibrary = previewMode === "editor" || previewMode === "split"
  const showCanvas = previewMode === "editor" || previewMode === "split"
  const showPreview = previewMode === "preview" || previewMode === "split"

  return (
    <div className="flex flex-col h-screen bg-background">
      <ThemeSync />

      {/* Toolbar */}
      <Toolbar />

      {/* ── Desktop layout ─────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 min-h-0">
        {/* Block Library */}
        {showLibrary && (
          <>
            <div style={{ width: libraryWidth }} className="shrink-0 flex flex-col min-h-0">
              <BlockLibrary searchRef={searchRef as React.RefObject<HTMLInputElement>} />
            </div>
            {showCanvas && <ResizeHandle onDrag={dragLibrary} />}
          </>
        )}

        {/* Canvas — flex-1 */}
        {showCanvas && (
          <>
            <div className="flex flex-col min-h-0 flex-1">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border shrink-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Canvas
                </span>
                <span className="ml-auto text-xs text-muted-foreground/60">
                  Drag to reorder
                </span>
              </div>
              <Canvas />
            </div>
            {showPreview && <ResizeHandle onDrag={dragPreview} />}
          </>
        )}

        {/* Preview */}
        {showPreview && (
          <div
            style={showCanvas ? { width: previewWidth } : undefined}
            className={cn("flex flex-col min-h-0", !showCanvas && "flex-1")}
          >
            <MarkdownPreview />
          </div>
        )}
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-1 flex-col min-h-0">
        {/* Panel */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {mobileTab === "library" && (
            <BlockLibrary searchRef={searchRef as React.RefObject<HTMLInputElement>} />
          )}
          {mobileTab === "editor" && (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Canvas
                </span>
              </div>
              <Canvas />
            </div>
          )}
          {mobileTab === "preview" && <MarkdownPreview />}
        </div>

        {/* Mobile tab bar */}
        <div className="flex border-t border-border bg-background shrink-0">
          {MOBILE_TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                  mobileTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <Toaster />
    </div>
  )
}

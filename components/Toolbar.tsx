"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Copy,
  Download,
  Trash2,
  Sun,
  Moon,
  Github,
  Check,
  LayoutPanelLeft,
  PanelRightClose,
  SplitSquareHorizontal,
  Sparkles,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEditorStore, type PreviewMode } from "@/lib/store"
import { copyToClipboard, downloadMarkdown } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const PREVIEW_MODES: { value: PreviewMode; label: string; icon: React.ReactNode }[] = [
  { value: "editor", label: "Editor", icon: <LayoutPanelLeft className="h-3.5 w-3.5" /> },
  { value: "split", label: "Split", icon: <SplitSquareHorizontal className="h-3.5 w-3.5" /> },
  { value: "preview", label: "Preview", icon: <PanelRightClose className="h-3.5 w-3.5" /> },
]

export function Toolbar() {
  const pathname = usePathname()
  const isEditorPage = pathname === "/"
  const {
    theme,
    toggleTheme,
    getMarkdown,
    clearBlocks,
    importFromMarkdown,
    previewMode,
    setPreviewMode,
  } = useEditorStore()
  const [copied, setCopied] = useState(false)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const content = ev.target?.result as string
      importFromMarkdown(content)
      toast({ title: "Imported!", description: `${file.name} split into blocks.`, variant: "success" })
    }
    reader.readAsText(file)
    // reset so same file can be re-imported
    e.target.value = ""
  }

  const handleCopy = async () => {
    const md = getMarkdown()
    const success = await copyToClipboard(md)
    if (success) {
      setCopied(true)
      toast({ title: "Copied!", description: "Markdown copied to clipboard.", variant: "success" })
      setTimeout(() => setCopied(false), 2000)
    } else {
      toast({ title: "Failed to copy", description: "Please try again.", variant: "destructive" })
    }
  }

  const handleDownload = () => {
    const md = getMarkdown()
    downloadMarkdown(md)
    toast({ title: "Downloaded!", description: "README.md saved to your computer.", variant: "success" })
  }

  return (
    <TooltipProvider delayDuration={300}>
      <header className="flex items-center gap-3 px-4 py-2 border-b border-border bg-background shrink-0 h-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none hover:opacity-80 transition-opacity">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm tracking-tight">readme.so</span>
          <span className="text-muted-foreground text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
            v2
          </span>
        </Link>

        {/* Editor-specific: preview mode toggle */}
        {isEditorPage && (
          <>
            <div className="w-px h-5 bg-border mx-1" />
            <div className="flex items-center rounded-md border border-border p-0.5 gap-0.5">
              {PREVIEW_MODES.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setPreviewMode(mode.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors",
                    previewMode === mode.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {isEditorPage && (
            <>
              {/* Import */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 h-8" asChild>
                    <label className="cursor-pointer">
                      <Upload className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline text-xs">Import</span>
                      <input
                        type="file"
                        accept=".md,.markdown,text/markdown"
                        className="sr-only"
                        onChange={handleImport}
                      />
                    </label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Import README.md</TooltipContent>
              </Tooltip>

              {/* Copy */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 h-8">
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline text-xs">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy markdown</TooltipContent>
              </Tooltip>

              {/* Download */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5 h-8">
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline text-xs">Download</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download README.md</TooltipContent>
              </Tooltip>

              {/* Clear all */}
              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Clear all blocks</TooltipContent>
                </Tooltip>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all blocks?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all blocks from the canvas. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={clearBlocks}
                    >
                      Clear all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="w-px h-5 bg-border" />
            </>
          )}

          {/* GitHub */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a
                  href="https://github.com/YOUR_USERNAME/readme-so-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Star on GitHub</TooltipContent>
          </Tooltip>

          {/* Theme toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  )
}

"use client"

import React, { useState } from "react"
import {
  FolderPlus,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
  Pencil,
  Check,
  X,
  FolderOpen,
  Folder,
  FileText,
} from "lucide-react"
import { useCustomBlocksStore, type CustomFolder, type CustomBlock } from "@/lib/customBlocksStore"
import { useEditorStore } from "@/lib/store"
import { cn } from "@/lib/utils"

// ── Inline block editor ───────────────────────────────────────────────────────

function BlockEditor({
  initialName = "",
  initialContent = "",
  onSave,
  onCancel,
}: {
  initialName?: string
  initialContent?: string
  onSave: (name: string, content: string) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initialName)
  const [content, setContent] = useState(initialContent)

  return (
    <div className="space-y-2 p-2 rounded-md border border-border bg-muted/30">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Block name…"
        className="w-full bg-background border border-input rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-ring"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Markdown content…"
        rows={5}
        className="w-full bg-background border border-input rounded px-2 py-1 text-xs font-mono outline-none focus:ring-1 focus:ring-ring resize-none"
      />
      <div className="flex gap-1.5 justify-end">
        <button
          onClick={onCancel}
          className="px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => name.trim() && content.trim() && onSave(name.trim(), content.trim())}
          disabled={!name.trim() || !content.trim()}
          className="px-2 py-1 rounded text-xs bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

// ── Single block row ──────────────────────────────────────────────────────────

function BlockRow({ block }: { block: CustomBlock }) {
  const { updateBlock, deleteBlock } = useCustomBlocksStore()
  const { addCustomBlock } = useEditorStore()
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <BlockEditor
        initialName={block.name}
        initialContent={block.content}
        onSave={(name, content) => {
          updateBlock(block.id, name, content)
          setEditing(false)
        }}
        onCancel={() => setEditing(false)}
      />
    )
  }

  return (
    <div className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent transition-colors cursor-pointer"
      onClick={() => addCustomBlock(block.content)}
    >
      <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-xs font-medium flex-1 truncate">{block.name}</span>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setEditing(true)}
          className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          title="Edit"
        >
          <Pencil className="h-3 w-3" />
        </button>
        <button
          onClick={() => deleteBlock(block.id)}
          className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive"
          title="Delete"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

// ── Folder row ────────────────────────────────────────────────────────────────

function FolderRow({
  folder,
  blocks,
}: {
  folder: CustomFolder
  blocks: CustomBlock[]
}) {
  const { renameFolder, deleteFolder, createBlock } = useCustomBlocksStore()
  const [open, setOpen] = useState(true)
  const [renaming, setRenaming] = useState(false)
  const [nameInput, setNameInput] = useState(folder.name)
  const [addingBlock, setAddingBlock] = useState(false)

  return (
    <div>
      {/* Folder header */}
      <div className="group flex items-center gap-1.5 rounded-md px-1.5 py-1 hover:bg-accent transition-colors">
        <button
          className="flex items-center gap-1.5 flex-1 min-w-0"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
          {open ? (
            <FolderOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
          {renaming ? (
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && nameInput.trim()) {
                  renameFolder(folder.id, nameInput.trim())
                  setRenaming(false)
                }
                if (e.key === "Escape") setRenaming(false)
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-background border border-input rounded px-1.5 py-0.5 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
          ) : (
            <span className="text-xs font-semibold truncate">{folder.name}</span>
          )}
        </button>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {renaming ? (
            <>
              <button
                onClick={() => {
                  if (nameInput.trim()) renameFolder(folder.id, nameInput.trim())
                  setRenaming(false)
                }}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <Check className="h-3 w-3" />
              </button>
              <button
                onClick={() => { setNameInput(folder.name); setRenaming(false) }}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setAddingBlock(true)}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Add block to folder"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                onClick={() => setRenaming(true)}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Rename folder"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => deleteFolder(folder.id)}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive"
                title="Delete folder"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Folder content */}
      {open && (
        <div className="ml-4 mt-0.5 space-y-0.5">
          {addingBlock && (
            <BlockEditor
              onSave={(name, content) => {
                createBlock(name, content, folder.id)
                setAddingBlock(false)
              }}
              onCancel={() => setAddingBlock(false)}
            />
          )}
          {blocks.map((b) => (
            <BlockRow key={b.id} block={b} />
          ))}
          {blocks.length === 0 && !addingBlock && (
            <p className="text-xs text-muted-foreground px-2 py-1">Empty folder</p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function MyBlocks() {
  const { folders, blocks, createFolder, createBlock } = useCustomBlocksStore()
  const [creatingFolder, setCreatingFolder] = useState(false)
  const [folderNameInput, setFolderNameInput] = useState("")
  const [addingRootBlock, setAddingRootBlock] = useState(false)

  const rootBlocks = blocks.filter((b) => b.folderId === null)

  return (
    <div className="border-t border-border">
      {/* Header */}
      <div className="flex items-center gap-1 px-3 py-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex-1">
          My Blocks
        </span>
        <button
          onClick={() => setAddingRootBlock(true)}
          className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="New block"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => { setCreatingFolder(true); setFolderNameInput("") }}
          className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="New folder"
        >
          <FolderPlus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-2 pb-2 space-y-0.5">
        {/* New folder input */}
        {creatingFolder && (
          <div className="flex items-center gap-1 px-1.5 py-1">
            <Folder className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={folderNameInput}
              onChange={(e) => setFolderNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && folderNameInput.trim()) {
                  createFolder(folderNameInput.trim())
                  setCreatingFolder(false)
                }
                if (e.key === "Escape") setCreatingFolder(false)
              }}
              placeholder="Folder name…"
              className="flex-1 bg-background border border-input rounded px-1.5 py-0.5 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={() => {
                if (folderNameInput.trim()) createFolder(folderNameInput.trim())
                setCreatingFolder(false)
              }}
              className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Check className="h-3 w-3" />
            </button>
            <button
              onClick={() => setCreatingFolder(false)}
              className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* New root block form */}
        {addingRootBlock && (
          <BlockEditor
            onSave={(name, content) => {
              createBlock(name, content, null)
              setAddingRootBlock(false)
            }}
            onCancel={() => setAddingRootBlock(false)}
          />
        )}

        {/* Folders */}
        {folders.map((folder) => (
          <FolderRow
            key={folder.id}
            folder={folder}
            blocks={blocks.filter((b) => b.folderId === folder.id)}
          />
        ))}

        {/* Root blocks */}
        {rootBlocks.map((block) => (
          <BlockRow key={block.id} block={block} />
        ))}

        {/* Empty state */}
        {folders.length === 0 && rootBlocks.length === 0 && !addingRootBlock && !creatingFolder && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No custom blocks yet.<br />Create a block or a folder.
          </p>
        )}
      </div>
    </div>
  )
}

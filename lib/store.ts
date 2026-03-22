import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import { getBlock } from "./blocks"

export type ActiveBlock = {
  instanceId: string
  blockId: string
  content: string
  collapsed: boolean
}

export type PreviewMode = "split" | "preview" | "editor"

type EditorStore = {
  // Canvas
  activeBlocks: ActiveBlock[]
  addBlock: (blockId: string) => void
  addCustomBlock: (content: string) => void
  setBlocksFromTemplate: (content: string) => void
  importFromMarkdown: (markdown: string) => void
  removeBlock: (instanceId: string) => void
  reorderBlocks: (activeId: string, overId: string) => void
  updateBlockContent: (instanceId: string, content: string) => void
  toggleBlockCollapsed: (instanceId: string) => void
  clearBlocks: () => void

  // UI
  selectedBlockId: string | null
  setSelectedBlock: (id: string | null) => void
  previewMode: PreviewMode
  setPreviewMode: (mode: PreviewMode) => void
  theme: "light" | "dark"
  toggleTheme: () => void

  // Output
  getMarkdown: () => string
}

const DEFAULT_BLOCKS = [
  "title",
  "badges",
  "description",
  "installation",
  "usage",
  "contributing",
  "license",
]

function makeActiveBlock(blockId: string): ActiveBlock {
  const block = getBlock(blockId)
  return {
    instanceId: uuidv4(),
    blockId,
    content: block?.defaultContent ?? "",
    collapsed: false,
  }
}


export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      activeBlocks: DEFAULT_BLOCKS.map(makeActiveBlock),

      addBlock: (blockId) => {
        const newBlock = makeActiveBlock(blockId)
        set((state) => ({
          activeBlocks: [...state.activeBlocks, newBlock],
          selectedBlockId: newBlock.instanceId,
        }))
      },

      addCustomBlock: (content) => {
        const newBlock: ActiveBlock = {
          instanceId: uuidv4(),
          blockId: "custom",
          content,
          collapsed: false,
        }
        set((state) => ({
          activeBlocks: [...state.activeBlocks, newBlock],
          selectedBlockId: newBlock.instanceId,
        }))
      },

      setBlocksFromTemplate: (content) => {
        const newBlock: ActiveBlock = {
          instanceId: uuidv4(),
          blockId: "custom",
          content,
          collapsed: false,
        }
        set({ activeBlocks: [newBlock], selectedBlockId: newBlock.instanceId })
      },

      importFromMarkdown: (markdown) => {
        const block: ActiveBlock = {
          instanceId: uuidv4(),
          blockId: "custom",
          content: markdown.trim(),
          collapsed: false,
        }
        set({ activeBlocks: [block], selectedBlockId: block.instanceId })
      },

      removeBlock: (instanceId) => {
        set((state) => ({
          activeBlocks: state.activeBlocks.filter(
            (b) => b.instanceId !== instanceId
          ),
          selectedBlockId:
            state.selectedBlockId === instanceId
              ? null
              : state.selectedBlockId,
        }))
      },

      reorderBlocks: (activeId, overId) => {
        set((state) => {
          const blocks = [...state.activeBlocks]
          const oldIndex = blocks.findIndex((b) => b.instanceId === activeId)
          const newIndex = blocks.findIndex((b) => b.instanceId === overId)
          if (oldIndex === -1 || newIndex === -1) return state
          const [moved] = blocks.splice(oldIndex, 1)
          blocks.splice(newIndex, 0, moved)
          return { activeBlocks: blocks }
        })
      },

      updateBlockContent: (instanceId, content) => {
        set((state) => ({
          activeBlocks: state.activeBlocks.map((b) =>
            b.instanceId === instanceId ? { ...b, content } : b
          ),
        }))
      },

      toggleBlockCollapsed: (instanceId) => {
        set((state) => ({
          activeBlocks: state.activeBlocks.map((b) =>
            b.instanceId === instanceId ? { ...b, collapsed: !b.collapsed } : b
          ),
        }))
      },

      clearBlocks: () => {
        set({ activeBlocks: [], selectedBlockId: null })
      },

      selectedBlockId: null,
      setSelectedBlock: (id) => set({ selectedBlockId: id }),

      previewMode: "split",
      setPreviewMode: (mode) => set({ previewMode: mode }),

      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      getMarkdown: () => {
        const { activeBlocks } = get()
        return activeBlocks.map((b) => b.content).join("\n\n")
      },
    }),
    {
      name: "readme-editor-v2",
      partialize: (state) => ({
        activeBlocks: state.activeBlocks,
        theme: state.theme,
        previewMode: state.previewMode,
      }),
    }
  )
)

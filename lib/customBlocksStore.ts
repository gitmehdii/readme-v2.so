import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

export type CustomFolder = {
  id: string
  name: string
  createdAt: string
}

export type CustomBlock = {
  id: string
  folderId: string | null
  name: string
  content: string
  createdAt: string
}

type CustomBlocksStore = {
  folders: CustomFolder[]
  blocks: CustomBlock[]

  createFolder: (name: string) => void
  renameFolder: (id: string, name: string) => void
  deleteFolder: (id: string) => void

  createBlock: (name: string, content: string, folderId: string | null) => void
  updateBlock: (id: string, name: string, content: string) => void
  deleteBlock: (id: string) => void
  moveBlock: (blockId: string, folderId: string | null) => void
}

export const useCustomBlocksStore = create<CustomBlocksStore>()(
  persist(
    (set) => ({
      folders: [],
      blocks: [],

      createFolder: (name) =>
        set((state) => ({
          folders: [
            ...state.folders,
            { id: uuidv4(), name, createdAt: new Date().toISOString() },
          ],
        })),

      renameFolder: (id, name) =>
        set((state) => ({
          folders: state.folders.map((f) => (f.id === id ? { ...f, name } : f)),
        })),

      deleteFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== id),
          // Move blocks from deleted folder to root
          blocks: state.blocks.map((b) =>
            b.folderId === id ? { ...b, folderId: null } : b
          ),
        })),

      createBlock: (name, content, folderId) =>
        set((state) => ({
          blocks: [
            ...state.blocks,
            { id: uuidv4(), name, content, folderId, createdAt: new Date().toISOString() },
          ],
        })),

      updateBlock: (id, name, content) =>
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, name, content } : b
          ),
        })),

      deleteBlock: (id) =>
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        })),

      moveBlock: (blockId, folderId) =>
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === blockId ? { ...b, folderId } : b
          ),
        })),
    }),
    { name: "readme-custom-blocks-v2" }
  )
)

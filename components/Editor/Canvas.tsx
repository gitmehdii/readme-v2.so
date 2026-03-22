"use client"

import React, { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { LayoutList } from "lucide-react"
import { useEditorStore } from "@/lib/store"
import { BlockCard } from "./BlockCard"

export function Canvas() {
  const { activeBlocks, reorderBlocks } = useEditorStore()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)
    if (over && active.id !== over.id) {
      reorderBlocks(active.id as string, over.id as string)
    }
  }

  const activeBlock = activeBlocks.find((b) => b.instanceId === activeDragId)

  if (activeBlocks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground select-none">
        <div className="rounded-2xl border-2 border-dashed border-border p-10 max-w-sm w-full">
          <LayoutList className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <h3 className="text-base font-semibold mb-1">Canvas is empty</h3>
          <p className="text-sm">
            ← Add blocks from the sidebar to start building your README
          </p>
        </div>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={activeBlocks.map((b) => b.instanceId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeBlocks.map((block) => (
            <BlockCard key={block.instanceId} block={block} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeBlock ? (
          <BlockCard block={activeBlock} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

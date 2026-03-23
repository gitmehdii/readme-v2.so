"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Toolbar } from "@/components/Toolbar"
import { ThemeSync } from "@/components/ThemeSync"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { SEED_TEMPLATES } from "@/lib/seed-data"
import { TemplateCard, type ProfileTemplate } from "@/components/templates/TemplateCard"
import { cn } from "@/lib/utils"

type StyleFilter =
  | "all"
  | "developer"
  | "designer"
  | "student"
  | "minimal"
  | "creative"
  | "data-scientist"

const STYLE_FILTERS: { value: StyleFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "student", label: "Student" },
  { value: "minimal", label: "Minimal" },
  { value: "creative", label: "Creative" },
  { value: "data-scientist", label: "Data Scientist" },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [styleFilter, setStyleFilter] = useState<StyleFilter>("all")

  const handleUseTemplate = (content: string) => {
    localStorage.setItem("pending_template", content)
    router.push("/")
    toast({
      title: "Template loaded!",
      description: "The template has been loaded into your editor.",
      variant: "success",
    })
  }

  const filtered =
    styleFilter === "all"
      ? (SEED_TEMPLATES as ProfileTemplate[])
      : (SEED_TEMPLATES as ProfileTemplate[]).filter((t) => t.style === styleFilter)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ThemeSync />
      <Toolbar />

      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight">GitHub Profile Templates</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pick a template, customize it, and make your GitHub profile stand out.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
        <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6">
          {STYLE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStyleFilter(f.value)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                styleFilter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No templates found for this style.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
              />
            ))}
          </div>
        )}
      </div>

      <Toaster />
    </div>
  )
}

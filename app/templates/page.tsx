"use client"

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Toolbar } from "@/components/Toolbar"
import { ThemeSync } from "@/components/ThemeSync"
import { Toaster } from "@/components/ui/toaster"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"
import { SEED_TEMPLATES } from "@/lib/seed-data"
import { TemplateCard, type ProfileTemplate } from "@/components/templates/TemplateCard"
import { cn } from "@/lib/utils"
import type { User } from "@supabase/supabase-js"

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

function TemplateSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden animate-pulse">
      <div className="h-40 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-5 rounded-full bg-muted" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 flex-1 bg-muted rounded" />
          <div className="h-8 flex-1 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [templates, setTemplates] = useState<ProfileTemplate[]>([])
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [styleFilter, setStyleFilter] = useState<StyleFilter>("all")

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("profile_templates")
          .select("*")
          .order("votes", { ascending: false })
        if (error) throw error
        if (data && data.length > 0) {
          setTemplates(data)
        } else {
          setTemplates(SEED_TEMPLATES as ProfileTemplate[])
        }
      } catch {
        setTemplates(SEED_TEMPLATES as ProfileTemplate[])
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  // Fetch user votes
  useEffect(() => {
    if (!user) return
    const fetchVotes = async () => {
      try {
        const { data } = await supabase
          .from("template_votes")
          .select("template_id")
          .eq("user_id", user.id)
        if (data) setVotedIds(new Set(data.map((v) => v.template_id)))
      } catch {
        // ignore
      }
    }
    fetchVotes()
  }, [user])

  const handleVote = useCallback(
    async (templateId: string, currentlyVoted: boolean) => {
      if (!user) {
        toast({
          title: "Login required",
          description: "Please login with GitHub to vote.",
          variant: "destructive",
        })
        return
      }
      // Optimistic update
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === templateId
            ? { ...t, votes: t.votes + (currentlyVoted ? -1 : 1) }
            : t
        )
      )
      setVotedIds((prev) => {
        const next = new Set(prev)
        if (currentlyVoted) next.delete(templateId)
        else next.add(templateId)
        return next
      })

      try {
        if (currentlyVoted) {
          await supabase
            .from("template_votes")
            .delete()
            .match({ user_id: user.id, template_id: templateId })
          await supabase.rpc("decrement_template_votes", { tid: templateId })
        } else {
          await supabase
            .from("template_votes")
            .insert({ user_id: user.id, template_id: templateId })
          await supabase.rpc("increment_template_votes", { tid: templateId })
        }
      } catch {
        // Revert on error
        setTemplates((prev) =>
          prev.map((t) =>
            t.id === templateId
              ? { ...t, votes: t.votes + (currentlyVoted ? 1 : -1) }
              : t
          )
        )
        setVotedIds((prev) => {
          const next = new Set(prev)
          if (currentlyVoted) next.add(templateId)
          else next.delete(templateId)
          return next
        })
      }
    },
    [user]
  )

  const handleUseTemplate = useCallback(
    (content: string) => {
      localStorage.setItem("pending_template", content)
      router.push("/")
      toast({
        title: "Template loaded!",
        description: "The template has been loaded into your editor.",
        variant: "success",
      })
    },
    [router]
  )

  const filtered =
    styleFilter === "all"
      ? templates
      : templates.filter((t) => t.style === styleFilter)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ThemeSync />
      <Toolbar />

      {/* Page header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold tracking-tight">GitHub Profile Templates</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pick a template, customize it, and make your GitHub profile stand out.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
        {/* Style filter tabs */}
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

        {/* Template grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <TemplateSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No templates found for this style.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                user={user}
                hasVoted={votedIds.has(template.id)}
                onVote={handleVote}
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

import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "readme.so v2 — Modern README Editor",
  description:
    "Build beautiful README files with drag-and-drop blocks, live preview, and one-click export.",
  keywords: ["README", "markdown", "editor", "open source", "documentation"],
  openGraph: {
    title: "readme.so v2 — Modern README Editor",
    description:
      "Build beautiful README files with drag-and-drop blocks, live preview, and one-click export.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">{children}</body>
    </html>
  )
}

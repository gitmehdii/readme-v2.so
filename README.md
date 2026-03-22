<div align="center">
  <h1>✨ readme.so v2</h1>
  <p><strong>The modern README editor you deserved.</strong></p>
  <p>Drag-and-drop blocks · Live preview · One-click export · Dark mode · Auto-save</p>
</div>

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/readme-so-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

</div>

---

> **Live demo:** [readme-so-v2.vercel.app](https://readme-so-v2.vercel.app)

## Screenshot

![Screenshot placeholder](https://via.placeholder.com/1200x680?text=readme.so+v2+screenshot)

## Features

- 🧩 **20+ pre-made blocks** — badges, installation, features, FAQ, license, and more
- 🖱️ **Drag-and-drop reordering** — powered by dnd-kit
- 👁️ **Live preview** — GitHub-style markdown rendering in real time
- 📋 **One-click copy** — copy your full README.md to clipboard instantly
- 💾 **Download** — save `README.md` directly to your computer
- 🌗 **Dark mode** — toggle with a single click
- 💿 **Auto-save** — canvas state persists to localStorage
- ⌨️ **Keyboard shortcut** — `Cmd/Ctrl+K` to focus block search
- 📱 **Responsive** — works on mobile with a tabbed layout

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/readme-so-v2.git
cd readme-so-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Markdown | react-markdown + rehype-highlight + remark-gfm |
| State | Zustand (with localStorage persistence) |
| Icons | lucide-react |

## Deploy to Vercel

Click the button above, or:

```bash
npm i -g vercel
vercel --prod
```

## License

MIT © 2024 YOUR_NAME

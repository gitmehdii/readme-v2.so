<div align="center">
  <h1>✨ readme.so v2</h1>
  <p><strong>The modern README editor you deserved.</strong></p>
  <p>Drag-and-drop blocks · Live preview · One-click export · Dark mode · Auto-save</p>
</div>

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gitmehdii/readme-so-v2/)

</div>

---

> **Live demo:** [readme-so-v2.vercel.app](https://readme-so-v2.vercel.app)

I wanted to remake the original website [readme.so](https://readme.so) and add new features. Feel free to try it and leave your opinion and suggestions :)

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
git clone https://github.com/gitmehdii/readme-so-v2
cd readme-so-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
docker compose up --build
```

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

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a Pull Request

## License

MIT © 2026 gitmehdii

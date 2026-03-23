export type Category = "essentials" | "setup" | "project"

export type Block = {
  id: string
  label: string
  icon: string
  category: Category
  defaultContent: string
}

export const BLOCKS: Block[] = [
  // ── Essentials ──────────────────────────────────────────────────────────────
  {
    id: "title",
    label: "Title & Description",
    icon: "FileText",
    category: "essentials",
    defaultContent: `# My Awesome Project

> A blazing-fast, open-source tool that does exactly what you need — with zero config.`,
  },
  {
    id: "badges",
    label: "Badges",
    icon: "Shield",
    category: "essentials",
    defaultContent: `[![npm version](https://img.shields.io/npm/v/your-package?style=flat-square&color=blue)](https://www.npmjs.com/package/your-package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/your-username/your-repo?style=flat-square)](https://github.com/your-username/your-repo/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/your-username/your-repo/ci.yml?style=flat-square&label=CI)](https://github.com/your-username/your-repo/actions)
[![Downloads](https://img.shields.io/npm/dm/your-package?style=flat-square)](https://www.npmjs.com/package/your-package)`,
  },
  {
    id: "description",
    label: "About / Description",
    icon: "Info",
    category: "essentials",
    defaultContent: `## About

**My Awesome Project** is a developer tool designed to eliminate boilerplate and let you focus on what matters. Built with performance and simplicity in mind.

### Why this project?

- 🚀 **Fast** — Zero-overhead design, runs at native speed
- 🧩 **Modular** — Use only what you need, tree-shake the rest
- 🔒 **Type-safe** — Full TypeScript support out of the box
- 🌍 **Universal** — Works in Node.js, Deno, Bun, and the browser`,
  },
  {
    id: "demo",
    label: "Demo / Screenshot",
    icon: "Monitor",
    category: "essentials",
    defaultContent: `## Demo

![App Screenshot](https://via.placeholder.com/800x450?text=App+Screenshot)

*Caption: The main dashboard in action.*

> 🔗 **Live demo:** [your-app.vercel.app](https://your-app.vercel.app)`,
  },
  {
    id: "toc",
    label: "Table of Contents",
    icon: "List",
    category: "essentials",
    defaultContent: `## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)`,
  },

  // ── Setup ───────────────────────────────────────────────────────────────────
  {
    id: "installation",
    label: "Installation",
    icon: "Download",
    category: "setup",
    defaultContent: `## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm / yarn / pnpm

### Installation

\`\`\`bash
# npm
npm install your-package

# yarn
yarn add your-package

# pnpm
pnpm add your-package
\`\`\`

Or clone the repository:

\`\`\`bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
\`\`\``,
  },
  {
    id: "usage",
    label: "Usage",
    icon: "Play",
    category: "setup",
    defaultContent: `## Usage

### Basic Example

\`\`\`typescript
import { createClient } from 'your-package'

const client = createClient({
  apiKey: process.env.API_KEY,
  region: 'us-east-1',
})

const result = await client.doSomething({ input: 'hello' })
console.log(result)
// => { status: 'ok', data: '...' }
\`\`\`

### Advanced Configuration

\`\`\`typescript
const client = createClient({
  apiKey: process.env.API_KEY,
  timeout: 5000,
  retries: 3,
  onError: (err) => console.error(err),
})
\`\`\`

For all available options, see the [API Reference](./docs/api.md).`,
  },
  {
    id: "env-vars",
    label: "Environment Variables",
    icon: "Settings",
    category: "setup",
    defaultContent: `## Environment Variables

Copy \`.env.example\` to \`.env.local\` and fill in the values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

| Variable | Required | Description | Example |
|---|---|---|---|
| \`API_KEY\` | ✅ | Your API secret key | \`sk-...abc\` |
| \`DATABASE_URL\` | ✅ | PostgreSQL connection string | \`postgres://user:pass@host/db\` |
| \`NEXT_PUBLIC_APP_URL\` | ✅ | Public base URL of your app | \`https://app.example.com\` |
| \`REDIS_URL\` | ❌ | Redis for caching (optional) | \`redis://localhost:6379\` |
| \`LOG_LEVEL\` | ❌ | Log verbosity | \`info\` \| \`debug\` \| \`error\` |`,
  },
  {
    id: "docker",
    label: "Docker",
    icon: "Container",
    category: "setup",
    defaultContent: `## Docker

### Run with Docker

\`\`\`bash
docker pull your-username/your-repo:latest

docker run -p 3000:3000 \\
  -e API_KEY=your_key \\
  -e DATABASE_URL=your_db_url \\
  your-username/your-repo:latest
\`\`\`

### Docker Compose

\`\`\`yaml
version: '3.8'
services:
  app:
    image: your-username/your-repo:latest
    ports:
      - '3000:3000'
    environment:
      - API_KEY=\${API_KEY}
      - DATABASE_URL=postgres://postgres:postgres@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

Then run:

\`\`\`bash
docker compose up -d
\`\`\``,
  },

  // ── Project ─────────────────────────────────────────────────────────────────
  {
    id: "features",
    label: "Features",
    icon: "Sparkles",
    category: "project",
    defaultContent: `## Features

- ✅ **Drag & drop** interface — intuitive block-based editor
- ✅ **Live preview** — see your README render in real-time
- ✅ **20+ blocks** — badges, installation, usage, and more
- ✅ **Dark mode** — easy on the eyes, day or night
- ✅ **One-click export** — copy or download your \`README.md\`
- ✅ **Auto-save** — never lose your work
- ✅ **Keyboard shortcuts** — power-user friendly
- 🔜 **Custom blocks** — create and save your own templates
- 🔜 **GitHub integration** — push directly to your repo`,
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: "Map",
    category: "project",
    defaultContent: `## Roadmap

### v1.0 — MVP ✅
- [x] Core editor with drag-and-drop blocks
- [x] Live markdown preview
- [x] Copy & download output
- [x] Dark mode support
- [x] LocalStorage persistence

### v1.1 — Polish 🚧
- [ ] Custom block templates
- [ ] Import existing README.md
- [ ] Undo / redo history

### v2.0 — Power Features 🔮
- [ ] GitHub OAuth + direct push to repo
- [ ] Team collaboration (multiplayer)
- [ ] AI-assisted content generation
- [ ] Export to HTML / PDF

See the [open issues](https://github.com/your-username/your-repo/issues) for the full list.`,
  },
  {
    id: "faq",
    label: "FAQ",
    icon: "HelpCircle",
    category: "project",
    defaultContent: `## FAQ

**Q: Is this free to use?**

A: Yes, completely free and open-source under the MIT license.

---

**Q: Can I use this for commercial projects?**

A: Absolutely. The MIT license allows commercial use with no restrictions.

---

**Q: Does it work offline?**

A: Yes — once loaded, the app runs entirely in your browser. No internet connection required for editing.

---

**Q: Can I import an existing README?**

A: Not yet, but it's on the roadmap! See [#42](https://github.com/your-username/your-repo/issues/42) for updates.

---

**Q: How do I report a bug?**

A: Open an issue on [GitHub](https://github.com/your-username/your-repo/issues) with steps to reproduce.`,
  },
  {
    id: "changelog",
    label: "Changelog",
    icon: "Clock",
    category: "project",
    defaultContent: `## Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

### [1.2.0] — 2024-12-01

#### Added
- New Docker block with compose example
- Keyboard shortcut \`Cmd+K\` to focus block search

#### Changed
- Improved markdown output formatting
- Faster preview rendering

#### Fixed
- Drag-and-drop on mobile (#78)

---

### [1.1.0] — 2024-10-15

#### Added
- Dark mode toggle
- LocalStorage auto-save

#### Fixed
- Copy button fallback for HTTP contexts`,
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
    icon: "Layers",
    category: "project",
    defaultContent: `## Tech Stack

**Frontend**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)

**Backend / Infra**

[![Vercel](https://img.shields.io/badge/Vercel-deploy-black?style=flat-square&logo=vercel)](https://vercel.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)

**Key Libraries**

| Library | Purpose |
|---|---|
| \`@dnd-kit\` | Drag-and-drop |
| \`zustand\` | State management |
| \`react-markdown\` | Markdown rendering |
| \`shadcn/ui\` | UI components |`,
  },

  // ── Open Source ──────────────────────────────────────────────────────────────
  {
    id: "contributing",
    label: "Contributing",
    icon: "GitPullRequest",
    category: "project",
    defaultContent: `## Contributing

Contributions are what make the open-source community such an amazing place. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. Fork the repository
2. Create your feature branch

   \`\`\`bash
   git checkout -b feat/amazing-feature
   \`\`\`

3. Make your changes and commit

   \`\`\`bash
   git commit -m 'feat: add amazing feature'
   \`\`\`

4. Push to your branch

   \`\`\`bash
   git push origin feat/amazing-feature
   \`\`\`

5. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep PRs focused — one feature per PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.`,
  },
  {
    id: "license",
    label: "License",
    icon: "Scale",
    category: "project",
    defaultContent: `## License

Distributed under the **MIT License**.

\`\`\`
MIT License

Copyright (c) 2024 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
\`\`\`

See [LICENSE](./LICENSE) for full text.`,
  },
  {
    id: "authors",
    label: "Authors",
    icon: "Users",
    category: "project",
    defaultContent: `## Authors & Contributors

- **Your Name** — [@your-username](https://github.com/your-username) — 💻 🎨 📖

Made with ❤️ by [Your Name](https://github.com/your-username).

Want to be listed here? [Contribute!](#contributing)`,
  },
  {
    id: "acknowledgements",
    label: "Acknowledgements",
    icon: "Heart",
    category: "project",
    defaultContent: `## Acknowledgements

This project wouldn't exist without these amazing open-source projects and people:

- [Next.js](https://nextjs.org) — The React framework for the web
- [Tailwind CSS](https://tailwindcss.com) — A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) — Beautifully designed components
- [dnd kit](https://dndkit.com) — Modern drag and drop for React
- [readme.so](https://readme.so) — The original inspiration for this project
- [Shields.io](https://shields.io) — Quality metadata badges for open source

Special thanks to all [contributors](https://github.com/your-username/your-repo/graphs/contributors) who have helped shape this project.`,
  },
  {
    id: "support",
    label: "Support / Sponsor",
    icon: "Coffee",
    category: "project",
    defaultContent: `## Support

If this project saved you time or made your life easier, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/your-username)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/your-username)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/your-username)

Your support helps me dedicate more time to open-source projects. Thank you! 🙏

### Other Ways to Help

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 📣 Share with your network`,
  },
]

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "essentials", label: "Essentials", icon: "Star" },
  { id: "setup", label: "Setup", icon: "Package" },
  { id: "project", label: "Project", icon: "FolderOpen" },
]

export function getBlock(id: string): Block | undefined {
  return BLOCKS.find((b) => b.id === id)
}

export type SeedComment = {
  id: string
  author_username: string
  author_avatar: string
  content: string
  created_at: string
}

export type SeedCommunityBlock = {
  id: string
  author_id: string
  author_username: string
  author_avatar: string
  title: string
  category: "essentials" | "setup" | "project" | "community" | "profile" | "other"
  content: string
  description: string
  votes: number
  forks: number
  is_flagged: boolean
  created_at: string
  comments: SeedComment[]
}

export type SeedTemplate = {
  id: string
  author_id: string
  author_username: string
  author_avatar: string
  title: string
  style: "developer" | "designer" | "student" | "minimal" | "creative" | "data-scientist"
  content: string
  votes: number
  created_at: string
}

export const SEED_COMMUNITY_BLOCKS: SeedCommunityBlock[] = [
  {
    id: "seed-1",
    author_id: "seed-user-1",
    author_username: "cassidoo",
    author_avatar: "https://avatars.githubusercontent.com/u/1454428",
    title: "Animated Typing Header",
    category: "profile",
    description: "Eye-catching header with animated typing SVG powered by readme-typing-svg.",
    content: `<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&pause=1000&color=6366F1&center=true&vCenter=true&width=500&lines=Hey+there!+I'm+%5BYour+Name%5D;Full+Stack+Developer;Open+Source+Enthusiast;Always+learning+something+new)](https://git.io/typing-svg)

<p>
  <a href="https://twitter.com/yourhandle"><img src="https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white"/></a>
  <a href="https://linkedin.com/in/yourname"><img src="https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:you@example.com"><img src="https://img.shields.io/badge/-Email-EA4335?style=flat-square&logo=gmail&logoColor=white"/></a>
</p>

</div>`,
    votes: 142,
    forks: 38,
    is_flagged: false,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: "seed-c1",
        author_username: "sindresorhus",
        author_avatar: "https://avatars.githubusercontent.com/u/170270",
        content: "Clean and simple, really like the typing animation. Works great on dark mode too!",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "seed-2",
    author_id: "seed-user-2",
    author_username: "meiamsome",
    author_avatar: "https://avatars.githubusercontent.com/u/1174026",
    title: "GitHub Stats Dashboard",
    category: "profile",
    description: "Full stats dashboard with streak, top languages, and contribution graph in one block.",
    content: `## My GitHub Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact&langs_count=7&theme=tokyonight"/>
</div>

<div align="center">
  <img src="https://streak-stats.demolab.com?user=YOUR_USERNAME&theme=tokyonight&hide_border=true" alt="GitHub Streak"/>
</div>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=YOUR_USERNAME&theme=tokyo-night&hide_border=true" alt="Contribution Graph"/>
</div>`,
    votes: 98,
    forks: 61,
    is_flagged: false,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: "seed-c2",
        author_username: "nicolo-ribaudo",
        author_avatar: "https://avatars.githubusercontent.com/u/16488257",
        content: "The tokyonight theme is perfect. Does the streak counter work for private commits too?",
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "seed-c3",
        author_username: "ljharb",
        author_avatar: "https://avatars.githubusercontent.com/u/45469",
        content: "You need to set count_private=true and make sure your stats are public. Works for me!",
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "seed-3",
    author_id: "seed-user-3",
    author_username: "kentcdodds",
    author_avatar: "https://avatars.githubusercontent.com/u/1500684",
    title: "Skills & Tools Showcase",
    category: "essentials",
    description: "Visual grid of skills using devicons. Easy to customize — just replace icon names.",
    content: `## Skills & Tools

<div align="center">

**Languages**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)

**Frameworks**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

**Tools**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</div>`,
    votes: 76,
    forks: 44,
    is_flagged: false,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: "seed-4",
    author_id: "seed-user-4",
    author_username: "antfu",
    author_avatar: "https://avatars.githubusercontent.com/u/11247099",
    title: "Currently Working On",
    category: "other",
    description: "A clean 'Currently' section showing what you're learning, building, and listening to.",
    content: `## What I'm up to

- **Building** — [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect), a devtool for Vite
- **Learning** — WebAssembly and Rust for performance-critical modules
- **Reading** — *A Philosophy of Software Design* by John Ousterhout
- **Listening** — Lo-fi beats on [Spotify](https://open.spotify.com)

> I share my thoughts on [Twitter](https://twitter.com/antfu7) and write longer articles on my [blog](https://antfu.me).

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=antfu.antfu)`,
    votes: 54,
    forks: 22,
    is_flagged: false,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: "seed-c4",
        author_username: "patak-dev",
        author_avatar: "https://avatars.githubusercontent.com/u/1202820",
        content: "Love the visitor badge! Where do you host the lo-fi playlist?",
        created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "seed-5",
    author_id: "seed-user-5",
    author_username: "wesbos",
    author_avatar: "https://avatars.githubusercontent.com/u/176013",
    title: "Featured Project Card",
    category: "project",
    description: "Highlighted project section with screenshot, tech stack badges, and live demo link.",
    content: `## Featured Project

<div align="center">

### [Tasty Recipes](https://github.com/YOUR_USERNAME/tasty-recipes)

![Project Screenshot](https://via.placeholder.com/600x300?text=Project+Screenshot)

A full-stack recipe app with AI-powered ingredient substitution suggestions.

![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

[Live Demo](https://tasty-recipes.vercel.app) · [Source Code](https://github.com/YOUR_USERNAME/tasty-recipes) · [Report Bug](https://github.com/YOUR_USERNAME/tasty-recipes/issues)

</div>`,
    votes: 41,
    forks: 18,
    is_flagged: false,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: "seed-6",
    author_id: "seed-user-6",
    author_username: "gaearon",
    author_avatar: "https://avatars.githubusercontent.com/u/810438",
    title: "Open Source Contributions Table",
    category: "community",
    description: "Clean table listing notable open source contributions with repo, role, and impact.",
    content: `## Open Source Contributions

| Project | Role | Highlights |
|---|---|---|
| [facebook/react](https://github.com/facebook/react) | Core Maintainer | Concurrent rendering, Hooks API |
| [reduxjs/redux](https://github.com/reduxjs/redux) | Creator | 60k+ stars, industry standard |
| [facebook/create-react-app](https://github.com/facebook/create-react-app) | Co-creator | Bootstrapped millions of projects |
| [reactjs/react-devtools](https://github.com/facebook/react-devtools) | Lead | Browser extension with 3M+ users |

> Interested in contributing? Check the **good first issue** label on any of these repos.`,
    votes: 29,
    forks: 11,
    is_flagged: false,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        id: "seed-c5",
        author_username: "sophiebits",
        author_avatar: "https://avatars.githubusercontent.com/u/6820395",
        content: "A contribution table is such a great idea. Adding this to my profile right now!",
        created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
]

export const SEED_TEMPLATES: SeedTemplate[] = [
  {
    id: "tmpl-1",
    author_id: "seed-user-1",
    author_username: "cassidoo",
    author_avatar: "https://avatars.githubusercontent.com/u/1454428",
    title: "Clean Developer",
    style: "developer",
    votes: 234,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    content: `<h1 align="center">Hi, I'm [Your Name] 👋</h1>

<p align="center">
  <b>Full Stack Developer · Open Source Contributor · Coffee Addict</b><br/>
  Building things for the web, one commit at a time.
</p>

<p align="center">
  <a href="https://twitter.com/yourhandle"><img src="https://img.shields.io/badge/-Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white"/></a>
  <a href="https://linkedin.com/in/yourname"><img src="https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white"/></a>
  <a href="https://yoursite.dev"><img src="https://img.shields.io/badge/-Portfolio-FF5722?style=flat&logo=googlechrome&logoColor=white"/></a>
</p>

---

### About Me

- Working on [**your-project**](https://github.com/you/your-project) — a short description
- Learning **Rust** and **WebAssembly** in 2024
- Ask me about **React**, **Node.js**, **system design**
- Fun fact: I've written more documentation than code this week

### Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

### GitHub Stats

<div align="center">
  <img height="160em" src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=default&hide_border=true"/>
  <img height="160em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact&theme=default&hide_border=true"/>
</div>

---

<p align="center">
  <i>Let's connect and build something amazing together!</i>
</p>`,
  },
  {
    id: "tmpl-2",
    author_id: "seed-user-7",
    author_username: "femkesch",
    author_avatar: "https://avatars.githubusercontent.com/u/4419992",
    title: "Minimal",
    style: "minimal",
    votes: 187,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    content: `### [Your Name](https://yoursite.com)

Software engineer. I write about web development, system design, and the craft of building software.

Currently at [Company](https://company.com). Previously at [Previous](https://prev.com).

**Writing** — [blog.yoursite.com](https://blog.yoursite.com)
**Open source** — maintainer of [project-name](https://github.com/you/project-name)
**Contact** — [hello@yoursite.com](mailto:hello@yoursite.com)`,
  },
  {
    id: "tmpl-3",
    author_id: "seed-user-8",
    author_username: "florinpop17",
    author_avatar: "https://avatars.githubusercontent.com/u/17459316",
    title: "Student & Learner",
    style: "student",
    votes: 156,
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    content: `<div align="center">

# Hey, I'm [Your Name]! 👨‍💻

**CS Student @ [University Name] · Class of 20XX**

*Passionate about building things that matter*

</div>

---

### About Me

- 🎓 Studying **Computer Science** with a focus on software engineering
- 🌱 Currently learning **React**, **TypeScript**, and **algorithms**
- 🔭 Working on my [portfolio site](https://yoursite.dev) — still in progress!
- 💬 Ask me about **Python**, **web basics**, **getting started in tech**
- 🎯 Goal for this year: land my first **software engineering internship**
- ⚡ Fun fact: I started coding to build a game, now I build everything *except* games

### Projects I'm Proud Of

| Project | Description | Tech |
|---|---|---|
| [Study Tracker](https://github.com/you/study-tracker) | Track study sessions with Pomodoro timer | React, Firebase |
| [Weather App](https://github.com/you/weather-app) | Clean weather dashboard | JavaScript, OpenWeather API |
| [Algorithm Visualizer](https://github.com/you/algo-viz) | See sorting algorithms in action | Canvas API |

### Languages & Tools

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)

### GitHub Activity

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=default&hide_border=true&count_private=true)

---

<p align="center">
  <i>Open to internship opportunities for Summer 20XX!</i><br/>
  <a href="mailto:you@email.com">📬 Reach out</a>
</p>`,
  },
  {
    id: "tmpl-4",
    author_id: "seed-user-9",
    author_username: "tirthajyoti",
    author_avatar: "https://avatars.githubusercontent.com/u/14204261",
    title: "Data Scientist",
    style: "data-scientist",
    votes: 112,
    created_at: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    content: `<div align="center">

## [Your Name]

**Data Scientist & ML Engineer**

*Turning raw data into actionable insights*

[![Google Scholar](https://img.shields.io/badge/Google_Scholar-4285F4?style=flat-square&logo=google-scholar&logoColor=white)](https://scholar.google.com)
[![Kaggle](https://img.shields.io/badge/Kaggle-20BEFF?style=flat-square&logo=kaggle&logoColor=white)](https://kaggle.com/yourprofile)
[![Medium](https://img.shields.io/badge/Medium-000000?style=flat-square&logo=medium&logoColor=white)](https://medium.com/@yourhandle)

</div>

---

### Research Interests

- **Machine Learning** — Deep learning, reinforcement learning, model interpretability
- **NLP** — Large language models, text classification, semantic search
- **MLOps** — Model deployment, monitoring, reproducible pipelines

### Featured Projects

**[Fraud Detection System](https://github.com/you/fraud-detection)**
XGBoost + SHAP explanations · Achieved 99.2% precision on Kaggle dataset

**[Sentiment Analysis API](https://github.com/you/sentiment-api)**
Fine-tuned BERT model served via FastAPI · 50ms inference latency

**[Time Series Forecasting](https://github.com/you/ts-forecast)**
ARIMA + Prophet comparison on energy demand data

### Tools & Libraries

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white)
![MLflow](https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

### Recent Activity

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=default&hide_border=true)

---

<p align="center">
  <i>Available for consulting and research collaborations</i><br/>
  <a href="mailto:you@email.com">Contact me</a>
</p>`,
  },
]

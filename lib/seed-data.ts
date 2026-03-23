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

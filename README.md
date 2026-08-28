<div align="center">

<!-- Logo placeholder -->
<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 40 40" fill="none">
  <circle cx="20" cy="20" r="20" fill="#E8F0E9"/>
  <path d="M13 15 C13 11, 18 9, 22 12 C26 15, 26 18, 20 20 C14 22, 14 25, 18 28 C22 31, 27 29, 27 25" stroke="#6B8F71" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="27" cy="13" r="2" fill="#8B7355" opacity="0.75"/>
</svg>

# SukoonSaathi
### Student Wellness Analytics

*"Sukoon" = peace & calm · "Saathi" = companion*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**An ML-based student wellness prediction system** — learns from academic performance, digital behaviour, lifestyle habits, sleep quality, physical activity, and stress patterns to generate a personalized wellness signal.

[🌐 Live Demo](https://mansik-santulan-score-1.onrender.com) · [📊 API Docs](https://mansik-santulan-score-1.onrender.com/docs) · [🐛 Issues](https://github.com/Raj-Rathod-Ai/Sukoon-Saathi/issues)

</div>

---

> **⚠️ Important Disclaimer**  
> SukoonSaathi is an **informational ML-based tool only**. It is **not** a medical diagnosis, psychological assessment, or substitute for professional mental health care. If you are concerned about your mental health, please speak with a qualified professional.

---

## Table of Contents

- [About the Project](#about-the-project)
- [What is SukoonSaathi?](#what-is-sukoonsaathi)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [ML Model](#ml-model)
- [FastAPI Backend](#fastapi-backend)
- [React Frontend](#react-frontend)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Deployment on Render](#deployment-on-render)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

SukoonSaathi was built as a portfolio-grade ML + full-stack project demonstrating:

- **Machine Learning** — Regression model trained on student lifestyle & social media data
- **FastAPI** — Production-ready inference API with Pydantic validation
- **React + TypeScript** — Modern, accessible, responsive frontend
- **Responsible AI** — Careful, non-diagnostic, student-safe language throughout the product

The system accepts 12 lifestyle and behavioral inputs from a student and returns a **ML-generated wellness signal (score out of 10)** — not a diagnosis, not a label, just a data-driven signal.

---

## What is SukoonSaathi?

> *"Your habits tell a story. SukoonSaathi helps you understand it."*

SukoonSaathi is a calm digital companion for students. It does **not** claim to diagnose mental illness. It processes everyday patterns — sleep, study, screen time, physical activity, and stress — through a trained ML model and returns a wellness signal.

**The product communicates:**

```
Daily Habits
+
Academic Routine
+
Digital Behaviour
+
Lifestyle
+
Stress
        ↓
  Machine Learning Model
        ↓
   Wellness Signal (x / 10)
```

---

## Project Structure

```
Sukoon-Saathi/
│
├── 📓 Mental_Health.ipynb            # Jupyter notebook — data exploration & model training
├── 🤖 Mental_Health_Model.pkl        # Trained ML model (scikit-learn, pickled)
├── 📊 Student Social Media And       # Dataset (social media & mental health survey)
│      Mental Health Impact.csv
├── 🐍 main.py                        # FastAPI backend — prediction inference API
│
└── 🌐 sukoonsaathi/                  # React + Vite frontend
    ├── index.html                    # Entry HTML — custom favicon, Manrope font, SEO
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── RENDER_DEPLOY.md
    └── src/
        ├── App.tsx                   # Single-page application orchestrator
        ├── index.css                 # Design system tokens & animations
        ├── main.tsx
        ├── types/index.ts            # TypeScript interfaces
        ├── services/
        │   └── predictionApi.ts      # API service layer (isolated from UI)
        ├── utils/
        │   └── validation.ts         # Frontend validation (mirrors backend constraints)
        └── components/
            ├── Header.tsx
            ├── Hero.tsx
            ├── Logo.tsx
            ├── WellnessIntro.tsx
            ├── ProgressIndicator.tsx
            ├── LoadingState.tsx
            ├── PredictionButton.tsx
            ├── Disclaimer.tsx
            ├── Footer.tsx
            ├── DailyRhythmVisual.tsx
            ├── form/
            │   ├── ProfileSection.tsx
            │   ├── DigitalHabitsSection.tsx
            │   ├── LifestyleSection.tsx
            │   ├── FormField.tsx
            │   ├── NumberInput.tsx
            │   ├── SelectInput.tsx
            │   ├── SegmentedControl.tsx
            │   └── StressSelector.tsx
            └── result/
                ├── ResultSection.tsx
                ├── ScoreRing.tsx
                ├── DailyRhythm.tsx
                └── InputSummary.tsx
```

---

## Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Python 3.x** | Core language |
| **FastAPI** | REST API framework |
| **Pydantic v2** | Request validation |
| **scikit-learn** | ML model |
| **joblib** | Model serialization |
| **Uvicorn** | ASGI server |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **TypeScript 5.6** | Type safety |
| **Vite 6** | Build tool |
| **Tailwind CSS v4** | Utility-first styling |
| **Motion (Framer Motion)** | Animations |
| **Lucide React** | Icons |
| **Manrope** | Typography (Google Fonts) |

---

## ML Model

### Dataset
The model was trained on the **"Student Social Media And Mental Health Impact"** dataset containing survey responses from students about their social media usage, academic performance, and mental health indicators.

### Features Used
| Feature | Type | Range/Values |
|--------|------|-------------|
| `age` | Integer | 10–100 |
| `gender` | Categorical | Male, Female |
| `country` | Categorical | Text (grouped into top countries + Other) |
| `academic_level` | Categorical | High School, Undergraduate, Graduate |
| `most_used_platform` | Categorical | Instagram, YouTube, TikTok, etc. (12 platforms) |
| `purpose_of_use` | Categorical | Networking, Education, Entertainment, News |
| `avg_daily_usage_hours` | Float | 0–24 |
| `daily_unlocks` | Integer | ≥ 0 |
| `study_hours` | Float | 0–24 |
| `physical_activity_hours` | Float | 0–24 |
| `sleep_hours_per_night` | Float | 0–24 |
| `stress_level` | Categorical | Low, Medium, High, Very High |

### Target
`mental_health_score` — A continuous wellness score (regression target).

### Training
See [`Mental_Health.ipynb`](Mental_Health.ipynb) for the full data exploration, preprocessing, feature engineering, model selection, and evaluation pipeline.

---

## FastAPI Backend

### Running Locally

```bash
# Install dependencies
pip install fastapi uvicorn joblib pandas scikit-learn pydantic

# Run the server
uvicorn main:app --reload --port 8000
```

### API Documentation
Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### CORS
The backend is configured with `allow_origins=["*"]` to allow the frontend to connect from any origin during development and deployment.

---

## React Frontend

### User Flow (Single Page)

```
HEADER
  ↓
HERO — "Apni daily routine ko samjho."
  ↓
INTRODUCTION — "Bas kuch simple questions."
  ↓
01 PROFILE — Age · Gender · Country
  ↓
02 DIGITAL HABITS — Platform · Academic Level · Screen Time · Purpose · Unlocks
  ↓
03 LIFESTYLE — Study · Activity · Sleep · Stress
  ↓
[ Check My SukoonScore ]
  ↓
LOADING — "Understanding your daily pattern..."
  ↓
RESULT
  ├── Score Ring (animated SVG — 0 → actual score)
  ├── Daily Rhythm (horizontal bars — actual inputs)
  └── Input Summary (compact grid)
  ↓
DISCLAIMER
  ↓
FOOTER
```

### Design Philosophy
- **Warm ivory** background (`#FAF9F6`) — calm, not clinical
- **Muted sage green** (`#6B8F71`) — wellness, nature
- **Deep charcoal** text (`#1C1C1A`) — readable, trustworthy
- **Manrope** font — warm, modern, premium
- **No neon, no glow, no AI brain visuals** — just clean, human design
- Hinglish copy that feels natural to Indian students

---

## Getting Started

### Backend

```bash
# Clone the repository
git clone https://github.com/Raj-Rathod-Ai/Sukoon-Saathi.git
cd Sukoon-Saathi

# Install Python dependencies
pip install fastapi uvicorn joblib pandas scikit-learn pydantic

# Start the API server
uvicorn main:app --reload
```

### Frontend

```bash
# Navigate to the frontend folder
cd sukoonsaathi

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend connects to `https://mansik-santulan-score-1.onrender.com` by default.  
To point to a local backend, update `src/services/predictionApi.ts`:

```ts
const API_URL = 'http://localhost:8000';
```

---

## API Reference

### `POST /predict`

Predicts the wellness score for a student based on their lifestyle inputs.

**Request Body**

```json
{
  "age": 21,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 5.5,
  "daily_unlocks": 60,
  "study_hours": 5,
  "physical_activity_hours": 1,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}
```

**Response**

```json
{
  "predicted_mental_health_score": 6.78
}
```

**Validation Rules**

| Field | Constraint |
|-------|-----------|
| `age` | 10 ≤ age ≤ 100 |
| `gender` | `Male` \| `Female` |
| `academic_level` | `Undergraduate` \| `Graduate` \| `High School` |
| `most_used_platform` | One of 12 supported platforms |
| `purpose_of_use` | `Networking` \| `Education` \| `Entertainment` \| `News` |
| `avg_daily_usage_hours` | 0 ≤ x ≤ 24 |
| `daily_unlocks` | x ≥ 0 |
| `study_hours` | 0 ≤ x ≤ 24 |
| `physical_activity_hours` | 0 ≤ x ≤ 24 |
| `sleep_hours_per_night` | 0 ≤ x ≤ 24 |
| `stress_level` | `Low` \| `Medium` \| `High` \| `Very High` |

**Error Responses**

| Status | Meaning |
|--------|---------|
| `422` | Validation error — invalid input values |
| `500` | Internal server error |

---

## Deployment on Render

### Backend (Web Service)

| Setting | Value |
|---------|-------|
| **Runtime** | Python 3 |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free |

### Frontend (Static Site)

| Setting | Value |
|---------|-------|
| **Root Directory** | `sukoonsaathi` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

> **Note:** Render free tier services spin down after inactivity. The first API request after a sleep period may take 30–60 seconds. The frontend handles this gracefully with extended loading messages.

---

## Features

- ✅ **12-field ML inference** — exact backend schema, zero frontend guessing
- ✅ **Animated SVG score ring** — draws from 0 → actual score (ease-out cubic)
- ✅ **Score count-up animation** — tabular-numeral display
- ✅ **Daily Rhythm visualization** — horizontal bars from actual form inputs
- ✅ **Input summary grid** — all 12 inputs displayed after prediction
- ✅ **Render cold-start handling** — loading messages update after 5s, 14s, 22s
- ✅ **Full error handling** — network, 422, 500, timeout, malformed response
- ✅ **Frontend validation** — matches Pydantic constraints exactly
- ✅ **Progress indicator** — 3-step guided experience
- ✅ **Responsive design** — mobile-first, no horizontal scroll
- ✅ **Accessible** — semantic HTML, aria labels, keyboard navigation
- ✅ **`prefers-reduced-motion`** — all animations respect this
- ✅ **No fake AI** — no hallucinated scores, no hardcoded values
- ✅ **Responsible language** — no medical diagnosis claims

---

## Contributing

Contributions are welcome! Please open an issue before submitting a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Raj Rathod](https://github.com/Raj-Rathod-Ai)

*SukoonSaathi — Not a doctor. Not a therapist. Just a calm companion.*

</div>

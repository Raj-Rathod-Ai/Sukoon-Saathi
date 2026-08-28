<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 40 40" fill="none">
  <circle cx="20" cy="20" r="20" fill="#E8F0E9"/>
  <path d="M13 15 C13 11, 18 9, 22 12 C26 15, 26 18, 20 20 C14 22, 14 25, 18 28 C22 31, 27 29, 27 25" stroke="#6B8F71" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="27" cy="13" r="2" fill="#8B7355" opacity="0.75"/>
</svg>

# SukoonSaathi
### ML-Powered Student Wellness Prediction System

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![scikit-learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?style=flat-square&logo=scikit-learn)](https://scikit-learn.org/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python)](https://python.org/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render)](https://render.com/)

**An end-to-end ML system** — from raw survey data through feature engineering, model training, and production-ready FastAPI inference — that predicts a personalized student wellness signal from behavioral, academic, digital, and lifestyle features.

[🌐 Live Demo](https://mansik-santulan-score-1.onrender.com) · [📊 API Docs](https://mansik-santulan-score-1.onrender.com/docs) · [📓 Notebook](Mental_Health.ipynb)

</div>

---

> **Disclaimer:** SukoonSaathi is an **informational ML estimate only** — not a medical diagnosis, psychological assessment, or clinical tool. It does not replace professional mental health care.

---

## Table of Contents

- [ML Pipeline Overview](#ml-pipeline-overview)
- [Dataset](#dataset)
- [Feature Engineering](#feature-engineering)
- [Model Architecture & Training](#model-architecture--training)
- [Production Inference — FastAPI](#production-inference--fastapi)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Frontend — React + Vite](#frontend--react--vite)
- [Deployment on Render](#deployment-on-render)
- [Getting Started](#getting-started)

---

## ML Pipeline Overview

```
Raw Survey Data (CSV)
        ↓
Exploratory Data Analysis  (Mental_Health.ipynb)
        ↓
Preprocessing & Encoding
  ├── Categorical → Label/One-Hot Encoding
  ├── Country grouping (top countries + "Other")
  └── Numerical normalization
        ↓
Feature Selection & Engineering
        ↓
Model Training & Evaluation
  ├── Regression (continuous wellness score target)
  ├── Cross-validation
  └── Hyperparameter tuning
        ↓
Model Serialization  →  Mental_Health_Model.pkl  (joblib)
        ↓
FastAPI Inference API  →  POST /predict
        ↓
React Frontend  →  Student fills form → Score returned → Visualized
```

---

## Dataset

**File:** [`Student Social Media And Mental Health Impact.csv`](Student%20Social%20Media%20And%20Mental%20Health%20Impact.csv)

A structured survey dataset capturing student behavioral, digital, and lifestyle patterns alongside a mental health/wellness score target.

### Key Dataset Characteristics

| Property | Detail |
|---------|--------|
| **Type** | Structured / Tabular |
| **Task** | Regression (continuous score prediction) |
| **Target** | `mental_health_score` — continuous wellness score |
| **Features** | 12 input variables (mixed: numerical + categorical) |
| **Populations** | Multi-country students (undergrad, grad, high school) |

### Raw Features

| Feature | Type | Description |
|--------|------|-------------|
| `age` | Numerical (int) | Student age (10–100) |
| `gender` | Categorical | `Male` / `Female` |
| `country` | Categorical | Country of study |
| `academic_level` | Categorical | `High School` / `Undergraduate` / `Graduate` |
| `most_used_platform` | Categorical | Primary social media platform |
| `purpose_of_use` | Categorical | `Networking` / `Education` / `Entertainment` / `News` |
| `avg_daily_usage_hours` | Numerical (float) | Daily social media screen time (hrs) |
| `daily_unlocks` | Numerical (int) | Phone unlock frequency per day |
| `study_hours` | Numerical (float) | Daily academic study time (hrs) |
| `physical_activity_hours` | Numerical (float) | Daily exercise/physical activity (hrs) |
| `sleep_hours_per_night` | Numerical (float) | Average nightly sleep (hrs) |
| `stress_level` | Categorical (ordinal) | `Low` / `Medium` / `High` / `Very High` |

---

## Feature Engineering

Key preprocessing decisions made during training (see [`Mental_Health.ipynb`](Mental_Health.ipynb)):

### Country Grouping
Countries with low frequency are grouped into an `"Other"` bucket. The top countries retained as individual categories:

```
['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other']
```

> The grouping logic lives **only in the model/notebook** — the frontend sends raw country text directly to the API and the backend handles this mapping.

### Stress Level — Ordinal Encoding
`stress_level` is treated as an ordinal feature:

```
Low → 0    Medium → 1    High → 2    Very High → 3
```

### Categorical Encoding
All remaining categorical features (`gender`, `academic_level`, `most_used_platform`, `purpose_of_use`) are encoded as part of the sklearn preprocessing pipeline.

### Numerical Scaling
Continuous features (`age`, `avg_daily_usage_hours`, `daily_unlocks`, `study_hours`, `physical_activity_hours`, `sleep_hours_per_night`) are scaled within the model pipeline.

---

## Model Architecture & Training

> Full details: [`Mental_Health.ipynb`](Mental_Health.ipynb)

### Approach
- **Task:** Supervised regression
- **Target:** Continuous `mental_health_score`
- **Validation:** Cross-validation with held-out test set
- **Serialization:** `joblib.dump()` → `Mental_Health_Model.pkl` (~24.5 MB)

### Model File

```python
import joblib

# Load
model = joblib.load('Mental_Health_Model.pkl')

# Predict
prediction = model.predict(input_df)
# Returns: float — wellness score
```

The model file bundles the **complete sklearn pipeline** — preprocessing + model — so inference requires only raw feature input without manual preprocessing.

---

## Production Inference — FastAPI

**File:** [`main.py`](main.py)

### Why FastAPI?

- **Pydantic v2** validation — type-safe request schema, automatic 422 errors
- **CORS** enabled — allows browser-based frontend requests
- **Async-ready** — Uvicorn ASGI server
- **Auto-generated docs** — Swagger UI + ReDoc at `/docs` and `/redoc`

### Inference Flow

```python
# 1. Request comes in via POST /predict
# 2. Pydantic validates all 12 fields
# 3. Input dict → pandas DataFrame
# 4. model.predict(df) → float
# 5. Return {"predicted_mental_health_score": float}
```

### Pydantic Schema (Input Contract)

```python
class StudentData(BaseModel):
    age                     : int   = Field(..., ge=10, le=100)
    gender                  : Literal['Male', 'Female']
    country                 : str
    academic_level          : Literal['Undergraduate', 'Graduate', 'High School']
    most_used_platform      : Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat',
                                      'Twitter', 'YouTube', 'TikTok', 'LINE',
                                      'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat']
    purpose_of_use          : Literal['Networking', 'Education', 'Entertainment', 'News']
    avg_daily_usage_hours   : float = Field(..., ge=0, le=24)
    daily_unlocks           : int   = Field(..., ge=0)
    study_hours             : float = Field(..., ge=0, le=24)
    physical_activity_hours : float = Field(..., ge=0, le=24)
    sleep_hours_per_night   : float = Field(..., ge=0, le=24)
    stress_level            : Literal['Medium', 'Low', 'Very High', 'High']
```

---

## API Reference

### `POST /predict`

**Endpoint:** `https://mansik-santulan-score-1.onrender.com/predict`

**Request**

```bash
curl -X POST "https://mansik-santulan-score-1.onrender.com/predict" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Response**

```json
{
  "predicted_mental_health_score": 6.78
}
```

**Error Responses**

| HTTP Status | Cause |
|------------|-------|
| `422 Unprocessable Entity` | Invalid input — Pydantic validation failure |
| `500 Internal Server Error` | Model inference failure |

**Interactive Docs:**
- Swagger UI: `https://mansik-santulan-score-1.onrender.com/docs`
- ReDoc: `https://mansik-santulan-score-1.onrender.com/redoc`

---

## Project Structure

```
Sukoon-Saathi/
│
├── 📓 Mental_Health.ipynb                         # EDA, preprocessing, model training
├── 🤖 Mental_Health_Model.pkl                     # Serialized sklearn pipeline (~24.5 MB)
├── 📊 Student Social Media And                    # Raw survey dataset
│      Mental Health Impact.csv
├── 🐍 main.py                                     # FastAPI inference server
│
└── 🌐 sukoonsaathi/                               # Production frontend (React + Vite)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx                                # Single-page app orchestrator
        ├── services/predictionApi.ts              # API client layer
        ├── utils/validation.ts                    # Frontend input validation
        ├── types/index.ts                         # TypeScript interfaces
        └── components/
            ├── form/                              # 3-section form
            └── result/                            # Score ring, rhythm, summary
```

---

## Frontend — React + Vite

The frontend is a **production-quality React + TypeScript SPA** that connects to the FastAPI backend.

### Key Technical Decisions

| Decision | Rationale |
|---------|-----------|
| **API URL hardcoded** in `predictionApi.ts` | No build-time env vars needed for Render static site |
| **Services layer isolated** from UI | `predictionApi.ts` handles all fetch logic, error parsing |
| **Frontend validation mirrors Pydantic** | Catches bad input before API call (same constraints) |
| **90-second fetch timeout** | Handles Render free-tier cold start gracefully |
| **No fake predictions** | Score only shown after real API response |
| **Score ring via SVG + rAF** | Animated count-up using `requestAnimationFrame`, ease-out cubic |

### Stack

| Technology | Role |
|-----------|------|
| React 18 + TypeScript | UI framework |
| Vite 6 | Build tool + dev server |
| Tailwind CSS v4 | Styling (`@tailwindcss/vite` plugin) |
| Motion (Framer Motion v12) | Animations |
| Manrope (Google Fonts) | Typography |

---

## Deployment on Render

### Backend — Web Service

```
Runtime:       Python 3
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend — Static Site

```
Root Directory:  sukoonsaathi/
Build Command:   npm install && npm run build
Publish Dir:     dist
```

> **Cold Start Note:** Render free-tier services spin down after ~15 minutes of inactivity. The frontend handles this with rotating loading messages, extending timeout to 90 seconds before showing an error.

---

## Getting Started

### Run Backend Locally

```bash
git clone https://github.com/Raj-Rathod-Ai/Sukoon-Saathi.git
cd Sukoon-Saathi

pip install fastapi uvicorn joblib pandas scikit-learn pydantic
uvicorn main:app --reload
# → http://localhost:8000/docs
```

### Run Frontend Locally

```bash
cd sukoonsaathi
npm install
npm run dev
# → http://localhost:5173
```

To point frontend at local backend, update [`src/services/predictionApi.ts`](sukoonsaathi/src/services/predictionApi.ts):

```ts
// Change this line:
const API_URL = 'https://mansik-santulan-score-1.onrender.com';
// To:
const API_URL = 'http://localhost:8000';
```

### Re-train the Model

Open [`Mental_Health.ipynb`](Mental_Health.ipynb) in Jupyter and run all cells. The last cell serializes the trained pipeline:

```python
import joblib
joblib.dump(pipeline, 'Mental_Health_Model.pkl')
```

Replace the existing `.pkl` file and redeploy the backend on Render.

---

<div align="center">

Built by [Raj Rathod](https://github.com/Raj-Rathod-Ai) · AI/ML Developer

*"Sleep, study, screen time, physical activity and stress — everyday patterns, ML-powered insight."*

</div>

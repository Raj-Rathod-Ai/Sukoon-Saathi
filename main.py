import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# ── Load model with clear error reporting ─────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'Mental_Health_Model.pkl')

try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded successfully from: {MODEL_PATH}", flush=True)
except FileNotFoundError:
    print(f"❌ ERROR: Model file not found at: {MODEL_PATH}", flush=True)
    print(f"   Working directory: {os.getcwd()}", flush=True)
    print(f"   Files in directory: {os.listdir('.')}", flush=True)
    sys.exit(1)
except Exception as e:
    print(f"❌ ERROR loading model: {e}", flush=True)
    sys.exit(1)

top_countries = ['Other', 'India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France']

app = FastAPI(
    title="SukoonSaathi — Mental Health Score API",
    description="ML-based student wellness prediction API.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Input Schema ──────────────────────────────────────────────
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


# ── Output Schema ─────────────────────────────────────────────
class PredictionResponse(BaseModel):
    predicted_mental_health_score: float


# ── Health check ──────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "service": "SukoonSaathi Wellness Prediction API"}


# ── Prediction endpoint ───────────────────────────────────────
@app.post("/predict", response_model=PredictionResponse)
def predict(data: StudentData):
    # Map country to training bucket
    country_mapped = data.country if data.country in top_countries else 'Other'

    input_dict = {
        'age'                     : [data.age],
        'gender'                  : [data.gender],
        'country'                 : [country_mapped],
        'academic_level'          : [data.academic_level],
        'most_used_platform'      : [data.most_used_platform],
        'purpose_of_use'          : [data.purpose_of_use],
        'avg_daily_usage_hours'   : [data.avg_daily_usage_hours],
        'daily_unlocks'           : [data.daily_unlocks],
        'study_hours'             : [data.study_hours],
        'physical_activity_hours' : [data.physical_activity_hours],
        'sleep_hours_per_night'   : [data.sleep_hours_per_night],
        'stress_level'            : [data.stress_level],
    }

    df = pd.DataFrame(input_dict)
    prediction = model.predict(df)

    return {"predicted_mental_health_score": round(float(prediction[0]), 2)}

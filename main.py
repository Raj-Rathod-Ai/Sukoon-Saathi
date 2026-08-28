import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# ── Load model ────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'Mental_Health_Model.pkl')

try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded successfully from: {MODEL_PATH}", flush=True)
except FileNotFoundError:
    print(f"❌ ERROR: Model file not found at: {MODEL_PATH}", flush=True)
    print(f"   Files in directory: {os.listdir('.')}", flush=True)
    sys.exit(1)
except Exception as e:
    print(f"❌ ERROR loading model: {e}", flush=True)
    sys.exit(1)

# Countries seen during training
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

    # ⚠️ CRITICAL: Column names must match training data exactly (Title_Case)
    input_dict = {
        'Age'                     : [data.age],
        'Gender'                  : [data.gender],
        'Country'                 : [country_mapped],
        'Academic_Level'          : [data.academic_level],
        'Most_Used_Platform'      : [data.most_used_platform],
        'Purpose_Of_Use'          : [data.purpose_of_use],
        'Avg_Daily_Usage_Hours'   : [data.avg_daily_usage_hours],
        'Daily_Unlocks'           : [data.daily_unlocks],
        'Study_Hours'             : [data.study_hours],
        'Physical_Activity_Hours' : [data.physical_activity_hours],
        'Sleep_Hours_Per_Night'   : [data.sleep_hours_per_night],
        'Stress_Level'            : [data.stress_level],
    }

    df = pd.DataFrame(input_dict)
    prediction = model.predict(df)

    return {"predicted_mental_health_score": round(float(prediction[0]), 2)}

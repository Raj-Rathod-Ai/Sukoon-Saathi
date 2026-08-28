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
    # Map country → group_countries (exactly as done in notebook Cell 28)
    group_countries = data.country if data.country in top_countries else 'Other'

    # Feature columns in EXACT order from notebook Cell 30:
    # feature_col = skwewd_col + other_numeric_cols + ordinal_col + normal_col
    # skwewd_col         = ['Study_Hours']
    # other_numeric_cols = ['Age', 'Avg_Daily_Usage_Hours', 'Daily_Unlocks', 'Physical_Activity_Hours', 'Sleep_Hours_Per_Night']
    # ordinal_col        = ['Stress_Level']
    # normal_col         = ['Gender', 'Academic_Level', 'Most_Used_Platform', 'Purpose_Of_Use', 'group_countries']
    input_dict = {
        'Study_Hours'             : [data.study_hours],
        'Age'                     : [data.age],
        'Avg_Daily_Usage_Hours'   : [data.avg_daily_usage_hours],
        'Daily_Unlocks'           : [data.daily_unlocks],
        'Physical_Activity_Hours' : [data.physical_activity_hours],
        'Sleep_Hours_Per_Night'   : [data.sleep_hours_per_night],
        'Stress_Level'            : [data.stress_level],
        'Gender'                  : [data.gender],
        'Academic_Level'          : [data.academic_level],
        'Most_Used_Platform'      : [data.most_used_platform],
        'Purpose_Of_Use'          : [data.purpose_of_use],
        'group_countries'         : [group_countries],
    }

    df = pd.DataFrame(input_dict)
    prediction = model.predict(df)

    return {"predicted_mental_health_score": round(float(prediction[0]), 2)}

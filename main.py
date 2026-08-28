import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
import os, sys

# ── Load model ────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'Mental_Health_Model.pkl')
try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded: {MODEL_PATH}", flush=True)
except FileNotFoundError:
    print(f"❌ Model not found: {MODEL_PATH}", flush=True)
    sys.exit(1)
except Exception as e:
    print(f"❌ Model load error: {e}", flush=True)
    sys.exit(1)

# Countries seen during training (everything else → 'Other')
TOP_COUNTRIES = {'Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France'}

app = FastAPI(title="SukoonSaathi API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────
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
    stress_level            : Literal['Low', 'Medium', 'High', 'Very High']

class PredictionResponse(BaseModel):
    predicted_mental_health_score: float


# ── Routes ────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "service": "SukoonSaathi Wellness Prediction API"}

@app.get("/health")
def health():
    """Keep-alive endpoint — pinged every 14 min by the frontend to prevent Render sleep."""
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: StudentData):
    group_countries = data.country if data.country in TOP_COUNTRIES else 'Other'

    # Feature columns in exact order from training notebook (Cell 30)
    df = pd.DataFrame([{
        'Study_Hours'             : data.study_hours,
        'Age'                     : data.age,
        'Avg_Daily_Usage_Hours'   : data.avg_daily_usage_hours,
        'Daily_Unlocks'           : data.daily_unlocks,
        'Physical_Activity_Hours' : data.physical_activity_hours,
        'Sleep_Hours_Per_Night'   : data.sleep_hours_per_night,
        'Stress_Level'            : data.stress_level,
        'Gender'                  : data.gender,
        'Academic_Level'          : data.academic_level,
        'Most_Used_Platform'      : data.most_used_platform,
        'Purpose_Of_Use'          : data.purpose_of_use,
        'group_countries'         : group_countries,
    }])

    score = model.predict(df)
    return {"predicted_mental_health_score": round(float(score[0]), 2)}

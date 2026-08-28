// ============================================================
//  SukoonSaathi — Shared Types
// ============================================================

export interface StudentData {
  age: number;
  gender: 'Male' | 'Female';
  country: string;
  academic_level: 'Undergraduate' | 'Graduate' | 'High School';
  most_used_platform:
    | 'Facebook'
    | 'LinkedIn'
    | 'Instagram'
    | 'Snapchat'
    | 'Twitter'
    | 'YouTube'
    | 'TikTok'
    | 'LINE'
    | 'KakaoTalk'
    | 'VKontakte'
    | 'WhatsApp'
    | 'WeChat';
  purpose_of_use: 'Networking' | 'Education' | 'Entertainment' | 'News';
  avg_daily_usage_hours: number;
  daily_unlocks: number;
  study_hours: number;
  physical_activity_hours: number;
  sleep_hours_per_night: number;
  stress_level: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface PredictionResult {
  predicted_mental_health_score: number;
}

export type FormErrors = Partial<Record<keyof StudentData, string>>;

export type AppStep = 'form' | 'loading' | 'result' | 'error';

// ============================================================
//  SukoonSaathi — ScoreInsight
//  Dynamic message + tier based on predicted score
// ============================================================

export type ScoreTier = 'excellent' | 'good' | 'fair' | 'low';

export interface ScoreInsight {
  tier: ScoreTier;
  emoji: string;
  headline: string;
  message: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function getScoreInsight(score: number): ScoreInsight {
  if (score >= 9) {
    return {
      tier: 'excellent',
      emoji: '🌟',
      headline: 'Outstanding Wellness Signal',
      message:
        'Your daily routine reflects excellent balance — strong sleep, physical activity, manageable screen time, and low stress. Keep nurturing these habits; they are the foundation of long-term wellbeing.',
      color: '#2D6A4F',
      bgColor: '#D8F3DC',
      borderColor: '#74C69D',
    };
  }
  if (score >= 7) {
    return {
      tier: 'good',
      emoji: '✨',
      headline: 'Good Wellness Signal',
      message:
        'Your habits show a solid wellness pattern. There\'s a healthy rhythm in your routine — small improvements in sleep consistency or physical activity could push your signal even higher.',
      color: '#1B6CA8',
      bgColor: '#DBF0FF',
      borderColor: '#90CDF4',
    };
  }
  if (score >= 5) {
    return {
      tier: 'fair',
      emoji: '🌱',
      headline: 'Moderate Wellness Signal',
      message:
        'Your routine has a mix of supportive and challenging patterns. Consider gradually improving sleep hours or reducing late-night screen time — even small shifts in daily habits can make a meaningful difference.',
      color: '#744210',
      bgColor: '#FEFCBF',
      borderColor: '#F6E05E',
    };
  }
  return {
    tier: 'low',
    emoji: '💙',
    headline: 'Your Wellness Needs Some Attention',
    message:
        'The ML model picked up some patterns that may be impacting your wellbeing — like high stress, low sleep, or limited physical activity. Consider speaking with someone you trust, or making one small positive change today.',
      color: '#702459',
      bgColor: '#FFF0F7',
      borderColor: '#FBB6CE',
  };
}

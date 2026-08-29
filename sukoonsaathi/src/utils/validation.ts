// ============================================================
//  SukoonSaathi — Form Validation
// ============================================================

import type { StudentData, FormErrors } from '../types';
import { VALID_COUNTRY_VALUES } from '../constants/countries';

const VALID_GENDERS = new Set(['Male', 'Female']);
const VALID_ACADEMIC_LEVELS = new Set(['Undergraduate', 'Graduate', 'High School']);
const VALID_PLATFORMS = new Set([
  'Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter',
  'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat'
]);
const VALID_PURPOSES = new Set(['Networking', 'Education', 'Entertainment', 'News']);
const VALID_STRESS_LEVELS = new Set(['Low', 'Medium', 'High', 'Very High']);

export function validateForm(data: Partial<StudentData>): FormErrors {
  const errors: FormErrors = {};

  // Age
  if (data.age === undefined || data.age === null || String(data.age).trim() === '') {
    errors.age = 'Please enter your age.';
  } else {
    const ageNum = Number(data.age);
    if (isNaN(ageNum) || !Number.isInteger(ageNum)) {
      errors.age = 'Please enter a valid whole number for age.';
    } else if (ageNum < 10 || ageNum > 100) {
      errors.age = 'Age should be between 10 and 100.';
    }
  }

  // Gender
  if (!data.gender || !VALID_GENDERS.has(data.gender)) {
    errors.gender = 'Please select a valid gender option.';
  }

  // Country
  if (!data.country || data.country.trim() === '') {
    errors.country = 'Please select your country from the menu.';
  } else if (!VALID_COUNTRY_VALUES.has(data.country)) {
    errors.country = 'Please select a valid country from the list.';
  }

  // Academic level
  if (!data.academic_level || !VALID_ACADEMIC_LEVELS.has(data.academic_level)) {
    errors.academic_level = 'Please select your academic level.';
  }

  // Most used platform
  if (!data.most_used_platform || !VALID_PLATFORMS.has(data.most_used_platform)) {
    errors.most_used_platform = 'Please select your most used platform.';
  }

  // Purpose of use
  if (!data.purpose_of_use || !VALID_PURPOSES.has(data.purpose_of_use)) {
    errors.purpose_of_use = 'Please select your primary purpose.';
  }

  // Avg daily usage hours
  if (data.avg_daily_usage_hours === undefined || data.avg_daily_usage_hours === null || String(data.avg_daily_usage_hours).trim() === '') {
    errors.avg_daily_usage_hours = 'Please enter your average daily screen time.';
  } else {
    const usage = Number(data.avg_daily_usage_hours);
    if (isNaN(usage) || usage < 0 || usage > 24) {
      errors.avg_daily_usage_hours = 'Screen time must be a valid number between 0 and 24 hours.';
    }
  }

  // Daily unlocks
  if (data.daily_unlocks === undefined || data.daily_unlocks === null || String(data.daily_unlocks).trim() === '') {
    errors.daily_unlocks = 'Please enter your approximate daily phone unlocks.';
  } else {
    const unlocks = Number(data.daily_unlocks);
    if (isNaN(unlocks) || unlocks < 0 || !Number.isInteger(unlocks)) {
      errors.daily_unlocks = 'Daily unlocks must be a positive whole number.';
    } else if (unlocks > 1000) {
      errors.daily_unlocks = 'Please enter a realistic number of unlocks (under 1000).';
    }
  }

  // Study hours
  if (data.study_hours === undefined || data.study_hours === null || String(data.study_hours).trim() === '') {
    errors.study_hours = 'Please enter your daily study hours.';
  } else {
    const study = Number(data.study_hours);
    if (isNaN(study) || study < 0 || study > 24) {
      errors.study_hours = 'Study hours must be a valid number between 0 and 24 hours.';
    }
  }

  // Physical activity
  if (data.physical_activity_hours === undefined || data.physical_activity_hours === null || String(data.physical_activity_hours).trim() === '') {
    errors.physical_activity_hours = 'Please enter your daily physical activity hours.';
  } else {
    const activity = Number(data.physical_activity_hours);
    if (isNaN(activity) || activity < 0 || activity > 24) {
      errors.physical_activity_hours = 'Physical activity must be a valid number between 0 and 24 hours.';
    }
  }

  // Sleep
  if (data.sleep_hours_per_night === undefined || data.sleep_hours_per_night === null || String(data.sleep_hours_per_night).trim() === '') {
    errors.sleep_hours_per_night = 'Please enter your average sleep hours per night.';
  } else {
    const sleep = Number(data.sleep_hours_per_night);
    if (isNaN(sleep) || sleep < 0 || sleep > 24) {
      errors.sleep_hours_per_night = 'Sleep hours must be a valid number between 0 and 24 hours.';
    }
  }

  // Stress level
  if (!data.stress_level || !VALID_STRESS_LEVELS.has(data.stress_level)) {
    errors.stress_level = 'Please select your stress level.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

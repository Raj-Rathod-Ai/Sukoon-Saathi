// ============================================================
//  SukoonSaathi — Form Validation
// ============================================================

import type { StudentData, FormErrors } from '../types';

export function validateForm(data: Partial<StudentData>): FormErrors {
  const errors: FormErrors = {};

  // Age
  if (data.age === undefined || data.age === null || String(data.age) === '') {
    errors.age = 'Please enter your age.';
  } else if (data.age < 10 || data.age > 100) {
    errors.age = 'Age should be between 10 and 100.';
  }

  // Gender
  if (!data.gender) {
    errors.gender = 'Please select your gender.';
  }

  // Country
  if (!data.country || data.country.trim() === '') {
    errors.country = 'Please enter your country.';
  }

  // Academic level
  if (!data.academic_level) {
    errors.academic_level = 'Please select your academic level.';
  }

  // Most used platform
  if (!data.most_used_platform) {
    errors.most_used_platform = 'Please select your most used platform.';
  }

  // Purpose of use
  if (!data.purpose_of_use) {
    errors.purpose_of_use = 'Please select your primary purpose.';
  }

  // Avg daily usage hours
  if (data.avg_daily_usage_hours === undefined || data.avg_daily_usage_hours === null || String(data.avg_daily_usage_hours) === '') {
    errors.avg_daily_usage_hours = 'Please enter your average daily screen time.';
  } else if (data.avg_daily_usage_hours < 0 || data.avg_daily_usage_hours > 24) {
    errors.avg_daily_usage_hours = 'Screen time cannot be more than 24 hours.';
  }

  // Daily unlocks
  if (data.daily_unlocks === undefined || data.daily_unlocks === null || String(data.daily_unlocks) === '') {
    errors.daily_unlocks = 'Please enter your approximate daily phone unlocks.';
  } else if (data.daily_unlocks < 0) {
    errors.daily_unlocks = 'Daily unlocks cannot be negative.';
  }

  // Study hours
  if (data.study_hours === undefined || data.study_hours === null || String(data.study_hours) === '') {
    errors.study_hours = 'Please enter your daily study hours.';
  } else if (data.study_hours < 0 || data.study_hours > 24) {
    errors.study_hours = 'Study hours cannot be more than 24 hours.';
  }

  // Physical activity
  if (data.physical_activity_hours === undefined || data.physical_activity_hours === null || String(data.physical_activity_hours) === '') {
    errors.physical_activity_hours = 'Please enter your daily physical activity hours.';
  } else if (data.physical_activity_hours < 0 || data.physical_activity_hours > 24) {
    errors.physical_activity_hours = 'Physical activity cannot be more than 24 hours.';
  }

  // Sleep
  if (data.sleep_hours_per_night === undefined || data.sleep_hours_per_night === null || String(data.sleep_hours_per_night) === '') {
    errors.sleep_hours_per_night = 'Please enter your average sleep hours per night.';
  } else if (data.sleep_hours_per_night < 0 || data.sleep_hours_per_night > 24) {
    errors.sleep_hours_per_night = 'Sleep hours cannot be more than 24 hours.';
  }

  // Stress level
  if (!data.stress_level) {
    errors.stress_level = 'Please select your stress level.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

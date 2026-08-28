// ============================================================
//  SukoonSaathi — Prediction API Service
//  Keeps all API logic isolated from UI components
// ============================================================

import type { StudentData, PredictionResult } from '../types';

const API_URL = 'https://sukoonsaathi-backend.onrender.com';

export class ApiError extends Error {
  public statusCode?: number;
  public isNetworkError: boolean;
  public isValidationError: boolean;

  constructor(
    message: string,
    options?: { statusCode?: number; isNetworkError?: boolean; isValidationError?: boolean }
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = options?.statusCode;
    this.isNetworkError = options?.isNetworkError ?? false;
    this.isValidationError = options?.isValidationError ?? false;
  }
}

export async function predictWellness(data: StudentData): Promise<PredictionResult> {
  const controller = new AbortController();
  // 90 second timeout — generous for Render cold start
  const timeoutId = setTimeout(() => controller.abort(), 90_000);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 422) {
      throw new ApiError(
        'The prediction service could not process your inputs. Please check your answers and try again.',
        { statusCode: 422, isValidationError: true }
      );
    }

    if (response.status === 500) {
      throw new ApiError(
        'The prediction service encountered an internal error. Please try again in a moment.',
        { statusCode: 500 }
      );
    }

    if (!response.ok) {
      throw new ApiError(
        `Unexpected error (${response.status}). Please try again.`,
        { statusCode: response.status }
      );
    }

    const json = await response.json() as unknown;

    // Type guard — make sure response has expected shape
    if (
      typeof json !== 'object' ||
      json === null ||
      !('predicted_mental_health_score' in json) ||
      typeof (json as Record<string, unknown>)['predicted_mental_health_score'] !== 'number'
    ) {
      throw new ApiError(
        'Received an unexpected response from the prediction service. Please try again.'
      );
    }

    return json as PredictionResult;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) throw err;

    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new ApiError(
          'The request timed out. The prediction service may be starting up — please try again.',
          { isNetworkError: true }
        );
      }
      if (
        err.message.includes('fetch') ||
        err.message.includes('network') ||
        err.message.includes('Failed to fetch')
      ) {
        throw new ApiError(
          'Could not connect to the prediction service. Please check your internet connection and try again.',
          { isNetworkError: true }
        );
      }
    }

    throw new ApiError(
      'Something went wrong. Please try again in a moment.'
    );
  }
}

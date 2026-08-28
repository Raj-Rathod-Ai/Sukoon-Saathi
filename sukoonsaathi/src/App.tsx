// ============================================================
//  SukoonSaathi — App.tsx
//  Single-page application — all sections on one URL
//  HEADER → HERO → INTRO → FORM (01→02→03) → RESULT → FOOTER
// ============================================================

import { useState, useRef, useCallback } from 'react';
import type { StudentData, FormErrors, PredictionResult } from './types';
import { predictWellness, ApiError } from './services/predictionApi';
import { validateForm, hasErrors } from './utils/validation';

// Layout
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WellnessIntro } from './components/WellnessIntro';
import { Footer } from './components/Footer';
import { Disclaimer } from './components/Disclaimer';

// Form
import { ProgressIndicator } from './components/ProgressIndicator';
import { ProfileSection } from './components/form/ProfileSection';
import { DigitalHabitsSection } from './components/form/DigitalHabitsSection';
import { LifestyleSection } from './components/form/LifestyleSection';
import { PredictionButton } from './components/PredictionButton';

// Loading + Result
import { LoadingState } from './components/LoadingState';
import { ResultSection } from './components/result/ResultSection';

// ── Initial empty form state ──────────────────────────────────
const INITIAL_FORM: Partial<StudentData> = {
  age: undefined,
  gender: undefined,
  country: '',
  academic_level: undefined,
  most_used_platform: undefined,
  purpose_of_use: undefined,
  avg_daily_usage_hours: undefined,
  daily_unlocks: undefined,
  study_hours: undefined,
  physical_activity_hours: undefined,
  sleep_hours_per_night: undefined,
  stress_level: undefined,
};

type AppState = 'idle' | 'loading' | 'result' | 'error';

export default function App() {
  const [formData, setFormData] = useState<Partial<StudentData>>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [appState, setAppState] = useState<AppState>('idle');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [apiError, setApiError] = useState<string>('');

  // Refs for smooth scrolling
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // ── Determine which progress step is active (for indicator) ──
  const getActiveStep = (): number => {
    const d = formData;
    // Step 1 complete when age, gender, country filled
    if (!d.age || !d.gender || !d.country) return 1;
    // Step 2 complete when academic, platform, purpose, usage, unlocks filled
    if (!d.academic_level || !d.most_used_platform || !d.purpose_of_use ||
        d.avg_daily_usage_hours === undefined || d.daily_unlocks === undefined) return 2;
    return 3;
  };

  // ── Field update handler ──────────────────────────────────────
  const handleChange = useCallback(
    (field: keyof StudentData, value: StudentData[keyof StudentData]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear error for this field on change
      if (errors[field]) {
        setErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  // ── Scroll to form ────────────────────────────────────────────
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Submit handler ────────────────────────────────────────────
  const handleSubmit = async () => {
    // Validate
    const validationErrors = validateForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      // Scroll to first error
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setErrors({});
    setApiError('');
    setAppState('loading');

    // Scroll to loading/result area
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const result = await predictWellness(formData as StudentData);
      setPrediction(result);
      setAppState('result');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(err.message);
      } else {
        setApiError('Something went wrong. Please try again in a moment.');
      }
      setAppState('error');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // ── Reset ─────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setPrediction(null);
    setApiError('');
    setAppState('idle');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* ── Header ── */}
      <Header />

      {/* ── Hero ── */}
      <Hero onStart={scrollToForm} />

      {/* ── Form Introduction ── */}
      <WellnessIntro />

      {/* ── Form ── (always visible, resets on "Check Again") */}
      {appState !== 'result' && (
        <div
          ref={formRef}
          id="wellness-form"
          aria-label="Wellness check form"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 var(--space-lg) var(--space-3xl)',
          }}
        >
          {/* Progress */}
          <ProgressIndicator currentStep={getActiveStep()} />

          {/* Section 01 */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <ProfileSection data={formData} errors={errors} onChange={handleChange} />
          </div>

          {/* Section 02 */}
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <DigitalHabitsSection data={formData} errors={errors} onChange={handleChange} />
          </div>

          {/* Section 03 */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <LifestyleSection data={formData} errors={errors} onChange={handleChange} />
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PredictionButton
              isLoading={appState === 'loading'}
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}

      {/* ── Loading / Result / Error zone ── */}
      <div ref={resultRef} id="result-zone">
        {/* Loading */}
        {appState === 'loading' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <LoadingState />
          </div>
        )}

        {/* Result */}
        {appState === 'result' && prediction && (
          <ResultSection
            score={prediction.predicted_mental_health_score}
            formData={formData as StudentData}
            onReset={handleReset}
          />
        )}

        {/* Error */}
        {appState === 'error' && (
          <div
            role="alert"
            style={{
              maxWidth: '520px',
              margin: '0 auto',
              padding: 'var(--space-2xl) var(--space-lg)',
              animation: 'fadeUp 0.4s ease forwards',
            }}
          >
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-2xl)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Calm icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-beige)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-lg)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 6v5M10 14v.5" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="10" cy="10" r="8.5" stroke="var(--color-accent)" strokeWidth="1.5" />
                </svg>
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--color-text)',
                  marginBottom: '8px',
                }}
              >
                We couldn't calculate your SukoonScore right now.
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-xl)',
                }}
              >
                {apiError || 'The prediction service may be waking up. Please try again in a moment.'}
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* Try again — re-submit */}
                <button
                  id="retry-btn"
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: 'var(--color-text)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-sage-dark)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-text)';
                  }}
                >
                  Try Again
                </button>

                {/* Go back to form */}
                <button
                  id="back-to-form-btn"
                  type="button"
                  onClick={() => {
                    setAppState('idle');
                    setTimeout(() => {
                      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  Edit Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Disclaimer ── */}
      {appState !== 'loading' && <Disclaimer />}

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

// ============================================================
//  SukoonSaathi — ResultSection  (enhanced with score tiers)
// ============================================================

import type { StudentData } from '../../types';
import { ScoreRing } from './ScoreRing';
import { DailyRhythm } from './DailyRhythm';
import { InputSummary } from './InputSummary';
import { getScoreInsight } from '../../utils/scoreInsight';

interface ResultSectionProps {
  score: number;
  formData: StudentData;
  onReset: () => void;
}

export function ResultSection({ score, formData, onReset }: ResultSectionProps) {
  const insight = getScoreInsight(score);

  return (
    <div
      id="result-section"
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: 'var(--space-lg)',
        animation: 'fadeUp 0.5s ease forwards',
      }}
    >
      {/* ── Score card ─────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: 'var(--space-lg)',
          textAlign: 'center',
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-sage)',
              marginBottom: '8px',
            }}
          >
            Here's your signal.
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--color-text)',
              marginBottom: '6px',
            }}
          >
            Your SukoonScore
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Your responses have been processed through the wellness prediction model.
          </p>
        </div>

        {/* Score ring */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
          <ScoreRing score={score} tierColor={insight.color} />
        </div>

        {/* ── Tier insight card ── */}
        <div
          style={{
            background: insight.bgColor,
            border: `1.5px solid ${insight.borderColor}`,
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            textAlign: 'left',
            marginBottom: 'var(--space-lg)',
            animation: 'fadeUp 0.5s ease 0.3s both',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{insight.emoji}</span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: insight.color,
                letterSpacing: '-0.1px',
              }}
            >
              {insight.headline}
            </span>
          </div>
          <p
            style={{
              fontSize: '13px',
              color: insight.color,
              lineHeight: 1.65,
              opacity: 0.9,
            }}
          >
            {insight.message}
          </p>

          {/* Special celebration for 9+ */}
          {score >= 9 && (
            <div
              style={{
                marginTop: '14px',
                paddingTop: '14px',
                borderTop: `1px solid ${insight.borderColor}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '16px' }}>🎉</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: insight.color,
                  letterSpacing: '0.04em',
                }}
              >
                You're in the top wellness tier! Keep going — you're an inspiration.
              </span>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div
          style={{
            background: 'var(--color-beige)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.55,
            textAlign: 'left',
          }}
        >
          <strong style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>
            Important
          </strong>
          This score is an informational ML estimate and should not be interpreted as a medical or
          psychological diagnosis. If you're concerned about your mental health, consider speaking
          with a qualified professional or someone you trust.
        </div>
      </div>

      {/* ── Daily Rhythm card ─────────────────────────────────── */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: 'var(--space-lg)',
          animation: 'fadeUp 0.5s ease 0.2s both',
        }}
      >
        <DailyRhythm data={formData} />
      </div>

      {/* ── Input Summary card ────────────────────────────────── */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: 'var(--space-2xl)',
          animation: 'fadeUp 0.5s ease 0.35s both',
        }}
      >
        <InputSummary data={formData} />
      </div>

      {/* ── Reset button ──────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          id="reset-btn"
          type="button"
          onClick={onReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = 'var(--color-sage)';
            btn.style.color = 'var(--color-sage-dark)';
            btn.style.backgroundColor = 'var(--color-sage-pale)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.borderColor = 'var(--color-border)';
            btn.style.color = 'var(--color-text)';
            btn.style.backgroundColor = 'var(--color-surface)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M11 7A4 4 0 1 1 7 3a4 4 0 0 1 3 1.35M11 3v2.35H8.65"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Start a New Check
        </button>
      </div>
    </div>
  );
}

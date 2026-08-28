// ============================================================
//  SukoonSaathi — LoadingState
//  Calm, human loading messages — handles Render cold start
// ============================================================

import { useEffect, useState } from 'react';

const MESSAGES = [
  { text: 'Connecting to SukoonSaathi...', delay: 0 },
  { text: 'Understanding your daily pattern...', delay: 3000 },
  { text: 'Preparing your wellness signal...', delay: 7000 },
  { text: 'Taking a little longer than usual...', delay: 14000 },
  { text: 'The prediction service may be waking up. Please wait...', delay: 22000 },
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    MESSAGES.forEach((msg, i) => {
      if (i === 0) return;
      const t = setTimeout(() => {
        setMessageIndex(i);
      }, msg.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading your SukoonScore"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'var(--space-4xl) var(--space-lg)',
        gap: 'var(--space-xl)',
      }}
    >
      {/* Breathing pulse ring */}
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg viewBox="0 0 80 80" width="80" height="80">
          {/* Background ring */}
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-sage-light)" strokeWidth="3" />
          {/* Animated ring */}
          <circle
            cx="40" cy="40" r="34"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="213"
            strokeDashoffset="160"
            transform="rotate(-90 40 40)"
            style={{ animation: 'spin-slow 1.2s linear infinite' }}
          />
        </svg>

        {/* Center logo mark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <path
              d="M13 15 C13 11, 18 9, 22 12 C26 15, 26 18, 20 20 C14 22, 14 25, 18 28 C22 31, 27 29, 27 25"
              stroke="#6B8F71"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Message */}
      <div style={{ textAlign: 'center' }}>
        <p
          key={messageIndex}
          style={{
            fontSize: '16px',
            fontWeight: 500,
            color: 'var(--color-text)',
            marginBottom: '6px',
            animation: 'fadeUp 0.4s ease forwards',
          }}
        >
          {MESSAGES[messageIndex].text}
        </p>
        {messageIndex >= 3 && (
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              animation: 'fadeUp 0.4s ease forwards',
            }}
          >
            Our backend is hosted on Render and may take a moment to wake up.
          </p>
        )}
      </div>
    </div>
  );
}

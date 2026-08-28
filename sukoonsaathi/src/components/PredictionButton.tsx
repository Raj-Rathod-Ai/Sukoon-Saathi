// ============================================================
//  SukoonSaathi — PredictionButton
//  Interactive button with hover glow, shimmer & click bounce
// ============================================================

import { useState } from 'react';

interface PredictionButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export function PredictionButton({ isLoading, isDisabled, onClick }: PredictionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const disabled = isLoading || isDisabled;

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <button
        id="predict-btn"
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-busy={isLoading}
        aria-label={isLoading ? 'Calculating your SukoonScore...' : 'Check My SukoonScore'}
        className={`btn-interactive ${!disabled ? 'shimmer-effect' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '18px 36px',
          fontSize: '16px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          letterSpacing: '0.03em',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: disabled
            ? 'var(--color-border)'
            : isHovered
            ? 'var(--color-sage-dark)'
            : 'var(--color-text)',
          color: disabled ? 'var(--color-text-muted)' : '#FFFFFF',
          transform: disabled
            ? 'none'
            : isPressed
            ? 'scale(0.96) translateY(1px)'
            : isHovered
            ? 'scale(1.02) translateY(-2px)'
            : 'scale(1) translateY(0)',
          boxShadow: disabled
            ? 'none'
            : isHovered
            ? '0 12px 30px rgba(79, 112, 85, 0.35), 0 4px 12px rgba(28, 28, 26, 0.15)'
            : '0 4px 16px rgba(28, 28, 26, 0.12)',
        }}
      >
        {isLoading ? (
          <>
            {/* Smooth dual ring spinner */}
            <span
              style={{
                width: '20px',
                height: '20px',
                border: '2.5px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#FFFFFF',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin-slow 0.8s linear infinite',
                flexShrink: 0,
              }}
            />
            <span>Calculating your SukoonScore...</span>
          </>
        ) : (
          <>
            <span>Check My SukoonScore</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                flexShrink: 0,
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

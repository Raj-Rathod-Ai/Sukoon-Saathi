// ============================================================
//  SukoonSaathi — Progress Indicator
// ============================================================

interface ProgressIndicatorProps {
  currentStep: number; // 1, 2, or 3
}

const steps = [
  { num: '01', label: 'Profile' },
  { num: '02', label: 'Digital Habits' },
  { num: '03', label: 'Lifestyle' },
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div
      role="navigation"
      aria-label="Form progress"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        marginBottom: 'var(--space-2xl)',
      }}
    >
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div
            key={step.num}
            style={{ display: 'flex', alignItems: 'center', flex: index < 2 ? '1' : 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              {/* Circle */}
              <div
                aria-current={isActive ? 'step' : undefined}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.02em',
                  transition: 'all var(--transition-base)',
                  backgroundColor: isDone
                    ? 'var(--color-sage)'
                    : isActive
                    ? 'var(--color-text)'
                    : 'var(--color-surface-warm)',
                  color: isDone || isActive ? 'white' : 'var(--color-text-muted)',
                  border: isActive
                    ? 'none'
                    : isDone
                    ? 'none'
                    : '1.5px solid var(--color-border)',
                }}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>

              {/* Label — hide on mobile if not active */}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? 'var(--color-text)'
                    : isDone
                    ? 'var(--color-sage)'
                    : 'var(--color-text-muted)',
                  transition: 'color var(--transition-base)',
                  whiteSpace: 'nowrap',
                }}
                className={!isActive ? 'progress-label' : ''}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < 2 && (
              <div
                style={{
                  flex: 1,
                  height: '1.5px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  backgroundColor: isDone ? 'var(--color-sage)' : 'var(--color-border)',
                  transition: 'background-color var(--transition-slow)',
                  borderRadius: '2px',
                }}
              />
            )}
          </div>
        );
      })}

      <style>{`
        @media (max-width: 480px) {
          .progress-label { display: none !important; }
        }
      `}</style>
    </div>
  );
}

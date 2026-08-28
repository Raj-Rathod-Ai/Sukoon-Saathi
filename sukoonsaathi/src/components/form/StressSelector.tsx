// ============================================================
//  SukoonSaathi — StressSelector
//  4 neutral-styled buttons — no red, no judgment
// ============================================================

type StressLevel = 'Low' | 'Medium' | 'High' | 'Very High';

interface StressSelectorProps {
  value: StressLevel | '';
  onChange: (value: StressLevel) => void;
  hasError?: boolean;
}

const STRESS_OPTIONS: { value: StressLevel; label: string; emoji: string }[] = [
  { value: 'Low', label: 'Low', emoji: '🌿' },
  { value: 'Medium', label: 'Medium', emoji: '🌤️' },
  { value: 'High', label: 'High', emoji: '⛅' },
  { value: 'Very High', label: 'Very High', emoji: '🌦️' },
];

export function StressSelector({ value, onChange, hasError }: StressSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Stress level"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
      }}
      className="stress-grid"
    >
      {STRESS_OPTIONS.map(opt => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            style={{
              padding: '14px 8px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              fontWeight: isSelected ? 700 : 500,
              borderRadius: 'var(--radius-lg)',
              border: `1.5px solid ${
                isSelected
                  ? 'var(--color-sage)'
                  : hasError
                  ? '#A0522D'
                  : 'var(--color-border)'
              }`,
              backgroundColor: isSelected
                ? 'var(--color-sage-pale)'
                : 'var(--color-surface)',
              color: isSelected ? 'var(--color-sage-dark)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              outline: 'none',
              minHeight: '72px',
              justifyContent: 'center',
            }}
            onFocus={e => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = 'var(--color-sage)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)';
              }
            }}
            onBlur={e => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = hasError ? '#A0522D' : 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: 1 }} aria-hidden="true">{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (max-width: 480px) {
          .stress-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================
//  SukoonSaathi — SegmentedControl
//  Used for: Gender, Academic Level, Purpose
// ============================================================

interface SegmentedControlProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  hasError?: boolean;
}

export function SegmentedControl({ id, value, onChange, options, hasError }: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
      }}
    >
      {options.map(opt => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            id={`${id}-${opt.value}`}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            style={{
              padding: '10px 18px',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              fontWeight: isSelected ? 700 : 500,
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${
                isSelected
                  ? 'var(--color-sage)'
                  : hasError
                  ? '#A0522D'
                  : 'var(--color-border)'
              }`,
              backgroundColor: isSelected ? 'var(--color-sage-light)' : 'var(--color-surface)',
              color: isSelected ? 'var(--color-sage-dark)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              outline: 'none',
              minHeight: '42px',
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
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

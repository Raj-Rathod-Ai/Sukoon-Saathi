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
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              minHeight: '42px',
              transform: isSelected ? 'scale(1.04)' : 'scale(1)',
              boxShadow: isSelected
                ? '0 3px 10px rgba(107, 143, 113, 0.25)'
                : '0 1px 2px rgba(28, 28, 26, 0.03)',
            }}
            onMouseEnter={e => {
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--color-sage)';
                e.currentTarget.style.boxShadow = '0 3px 8px rgba(107, 143, 113, 0.15)';
              }
            }}
            onMouseLeave={e => {
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = hasError ? '#A0522D' : 'var(--color-border)';
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(28, 28, 26, 0.03)';
              }
            }}
            onMouseDown={e => {
              e.currentTarget.style.transform = 'scale(0.96)';
            }}
            onMouseUp={e => {
              e.currentTarget.style.transform = isSelected ? 'scale(1.04)' : 'scale(1)';
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
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(28, 28, 26, 0.03)';
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

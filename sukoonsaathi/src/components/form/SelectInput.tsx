// ============================================================
//  SukoonSaathi — SelectInput
// ============================================================

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  hasError?: boolean;
}

export function SelectInput({ id, value, onChange, options, placeholder, hasError }: SelectInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 40px 12px 14px',
          fontSize: '15px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
          backgroundColor: 'var(--color-surface)',
          border: `1.5px solid ${hasError ? '#A0522D' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          appearance: 'none',
          cursor: 'pointer',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = hasError ? '#A0522D' : 'var(--color-sage)';
          e.currentTarget.style.boxShadow = hasError
            ? '0 0 0 3px rgba(160,82,45,0.12)'
            : '0 0 0 3px rgba(107,143,113,0.15)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = hasError ? '#A0522D' : 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        aria-invalid={hasError ? 'true' : 'false'}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--color-text-muted)',
        }}
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

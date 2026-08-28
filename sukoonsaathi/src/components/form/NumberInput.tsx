// ============================================================
//  SukoonSaathi — NumberInput
// ============================================================

interface NumberInputProps {
  id: string;
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  hasError?: boolean;
  unit?: string;
}

const inputStyle = (hasError?: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '12px 14px',
  fontSize: '15px',
  fontFamily: 'var(--font-sans)',
  fontWeight: 500,
  color: 'var(--color-text)',
  backgroundColor: 'var(--color-surface)',
  border: `1.5px solid ${hasError ? '#A0522D' : 'var(--color-border)'}`,
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
  appearance: 'none',
  MozAppearance: 'textfield',
});

export function NumberInput({
  id, value, onChange, min, max, step = 0.5, placeholder, hasError, unit,
}: NumberInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        id={id}
        type="number"
        value={value === '' ? '' : value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={e => {
          const val = e.target.value;
          if (val === '' || val === '-') {
            onChange('');
          } else {
            const parsed = parseFloat(val);
            if (!isNaN(parsed)) onChange(parsed);
          }
        }}
        style={inputStyle(hasError)}
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
      />
      {unit && (
        <span
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
            letterSpacing: '0.03em',
          }}
        >
          {unit}
        </span>
      )}
      <style>{`
        #${id}::-webkit-outer-spin-button,
        #${id}::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
}

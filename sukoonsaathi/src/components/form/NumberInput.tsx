// ============================================================
//  SukoonSaathi — NumberInput
//  Modern numeric input with unit badge & hover/focus glow
// ============================================================

import { useState } from 'react';

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

export function NumberInput({
  id,
  value,
  onChange,
  min,
  max,
  step = 0.5,
  placeholder,
  hasError,
  unit,
}: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={hasError ? 'true' : 'false'}
        style={{
          width: '100%',
          padding: unit ? '13px 72px 13px 16px' : '13px 16px',
          fontSize: '15px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          color: 'var(--color-text)',
          backgroundColor: isFocused
            ? 'var(--color-surface)'
            : isHovered
            ? 'var(--color-surface-warm)'
            : 'var(--color-surface)',
          border: `1.5px solid ${
            hasError
              ? '#A0522D'
              : isFocused
              ? 'var(--color-sage)'
              : isHovered
              ? 'var(--color-sage)'
              : 'var(--color-border)'
          }`,
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          boxShadow: isFocused
            ? hasError
              ? '0 0 0 3.5px rgba(160, 82, 45, 0.12)'
              : '0 0 0 3.5px rgba(107, 143, 113, 0.18), 0 2px 8px rgba(107, 143, 113, 0.08)'
            : isHovered
            ? '0 2px 8px rgba(28, 28, 26, 0.05)'
            : 'none',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          appearance: 'none',
          MozAppearance: 'textfield',
        }}
      />
      {unit && (
        <span
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '11px',
            fontWeight: 700,
            color: isFocused ? 'var(--color-sage-dark)' : 'var(--color-text-muted)',
            backgroundColor: isFocused ? 'var(--color-sage-light)' : 'var(--color-bg-alt)',
            padding: '3px 7px',
            borderRadius: 'var(--radius-sm)',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
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

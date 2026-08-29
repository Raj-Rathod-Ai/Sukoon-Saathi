// ============================================================
//  SukoonSaathi — SelectInput
//  High quality select with custom chevron, focus ring & groups
// ============================================================

import { useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

export interface SelectGroup {
  groupName: string;
  options: { value: string; label: string }[];
}

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  groups?: SelectGroup[];
  placeholder?: string;
  hasError?: boolean;
}

export function SelectInput({
  id,
  value,
  onChange,
  options,
  groups,
  placeholder,
  hasError,
}: SelectInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={hasError ? 'true' : 'false'}
        style={{
          width: '100%',
          padding: '13px 42px 13px 16px',
          fontSize: '15px',
          fontFamily: 'var(--font-sans)',
          fontWeight: value ? 600 : 400,
          color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
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
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          boxShadow: isFocused
            ? hasError
              ? '0 0 0 3.5px rgba(160, 82, 45, 0.12)'
              : '0 0 0 3.5px rgba(107, 143, 113, 0.18), 0 2px 8px rgba(107, 143, 113, 0.08)'
            : isHovered
            ? '0 2px 8px rgba(28, 28, 26, 0.05)'
            : 'none',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Grouped rendering if provided */}
        {groups && groups.length > 0 ? (
          groups.map(grp => (
            <optgroup key={grp.groupName} label={grp.groupName}>
              {grp.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))
        ) : (
          options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        )}
      </select>

      {/* Styled Custom Chevron Indicator */}
      <div
        style={{
          position: 'absolute',
          right: '14px',
          top: '50%',
          transform: `translateY(-50%) ${isFocused ? 'rotate(180deg)' : 'rotate(0deg)'}`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease',
          pointerEvents: 'none',
          color: isFocused ? 'var(--color-sage-dark)' : 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

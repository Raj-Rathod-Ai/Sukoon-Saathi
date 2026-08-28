// ============================================================
//  SukoonSaathi — FormField wrapper
// ============================================================

import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helper?: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, htmlFor, error, helper, children, required }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: error ? '#A0522D' : 'var(--color-text)',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-sage)', fontSize: '14px' }} aria-hidden="true">*</span>
        )}
      </label>

      {children}

      {helper && !error && (
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          {helper}
        </p>
      )}

      {error && (
        <p
          role="alert"
          style={{
            fontSize: '12px',
            color: '#A0522D',
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="6" cy="6" r="5.5" stroke="#A0522D" strokeWidth="1" />
            <path d="M6 3.5v3M6 8v.5" stroke="#A0522D" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

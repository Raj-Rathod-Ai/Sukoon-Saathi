// ============================================================
//  SukoonSaathi — Section 01: Profile
// ============================================================

import type { StudentData, FormErrors } from '../../types';
import { FormField } from './FormField';
import { NumberInput } from './NumberInput';
import { SegmentedControl } from './SegmentedControl';

interface ProfileSectionProps {
  data: Partial<StudentData>;
  errors: FormErrors;
  onChange: (field: keyof StudentData, value: StudentData[keyof StudentData]) => void;
}

const SECTION_STYLE: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-2xl)',
  boxShadow: 'var(--shadow-xs)',
};

const GRID_2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-xl)',
};

export function ProfileSection({ data, errors, onChange }: ProfileSectionProps) {
  return (
    <div style={SECTION_STYLE}>
      {/* Section header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-sage)',
            marginBottom: '6px',
          }}
        >
          01
        </div>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '-0.3px',
            color: 'var(--color-text)',
            marginBottom: '6px',
          }}
        >
          About you
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          A little context helps us understand your routine.
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {/* Age + Gender */}
        <div style={GRID_2} className="form-grid-2">
          <FormField label="Age" htmlFor="age" error={errors.age} required>
            <NumberInput
              id="age"
              value={data.age ?? ''}
              onChange={val => onChange('age', val === '' ? (0 as unknown as number) : val as number)}
              min={10}
              max={100}
              step={1}
              placeholder="e.g. 21"
              hasError={!!errors.age}
              unit="yrs"
            />
          </FormField>

          <FormField label="Gender" htmlFor="gender-Male" error={errors.gender} required>
            <SegmentedControl
              id="gender"
              value={data.gender ?? ''}
              onChange={val => onChange('gender', val as StudentData['gender'])}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
              hasError={!!errors.gender}
            />
          </FormField>
        </div>

        {/* Country — full width */}
        <FormField
          label="Country"
          htmlFor="country"
          error={errors.country}
          helper="Enter your current country of study."
          required
        >
          <input
            id="country"
            type="text"
            value={data.country ?? ''}
            onChange={e => onChange('country', e.target.value)}
            placeholder="e.g. India"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '15px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              color: 'var(--color-text)',
              backgroundColor: 'var(--color-surface)',
              border: `1.5px solid ${errors.country ? '#A0522D' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = errors.country ? '#A0522D' : 'var(--color-sage)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = errors.country ? '#A0522D' : 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-invalid={!!errors.country}
          />
        </FormField>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

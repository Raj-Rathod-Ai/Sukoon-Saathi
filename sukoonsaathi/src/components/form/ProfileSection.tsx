// ============================================================
//  SukoonSaathi — Section 01: Profile
// ============================================================

import type { StudentData, FormErrors } from '../../types';
import { FormField } from './FormField';
import { NumberInput } from './NumberInput';
import { SegmentedControl } from './SegmentedControl';
import { SelectInput } from './SelectInput';
import { COUNTRY_GROUPS, COUNTRY_OPTIONS } from '../../constants/countries';

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
  boxShadow: '0 4px 20px rgba(28, 28, 26, 0.04)',
  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
};

const GRID_2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 'var(--space-xl)',
};

export function ProfileSection({ data, errors, onChange }: ProfileSectionProps) {
  return (
    <div style={SECTION_STYLE} className="form-section-card">
      {/* Section header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-sage-dark)',
              backgroundColor: 'var(--color-sage-light)',
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-block',
            }}
          >
            01
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-sage)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Profile Basics
          </span>
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
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          A little context helps the machine learning model understand your daily routine.
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

        {/* Country — Select menu with Groups */}
        <FormField
          label="Country"
          htmlFor="country"
          error={errors.country}
          helper="Select your current country of study or residence."
          required
        >
          <SelectInput
            id="country"
            value={data.country ?? ''}
            onChange={val => onChange('country', val)}
            options={COUNTRY_OPTIONS}
            groups={COUNTRY_GROUPS}
            placeholder="Select your country..."
            hasError={!!errors.country}
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

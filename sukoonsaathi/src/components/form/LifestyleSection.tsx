// ============================================================
//  SukoonSaathi — Section 03: Lifestyle & Stress
// ============================================================

import type { StudentData, FormErrors } from '../../types';
import { FormField } from './FormField';
import { NumberInput } from './NumberInput';
import { StressSelector } from './StressSelector';

interface LifestyleSectionProps {
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

const GRID_3: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'var(--space-xl)',
};

export function LifestyleSection({ data, errors, onChange }: LifestyleSectionProps) {
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
          03
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
          Your daily balance
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Sleep, movement and stress can provide important context.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {/* Study + Activity + Sleep */}
        <div style={GRID_3} className="form-grid-3">
          <FormField
            label="Study hours"
            htmlFor="study-hours"
            error={errors.study_hours}
            helper="Average daily study time."
            required
          >
            <NumberInput
              id="study-hours"
              value={data.study_hours ?? ''}
              onChange={val => onChange('study_hours', val === '' ? 0 : val as number)}
              min={0}
              max={24}
              step={0.5}
              placeholder="e.g. 5"
              hasError={!!errors.study_hours}
              unit="hrs/day"
            />
          </FormField>

          <FormField
            label="Physical activity"
            htmlFor="activity-hours"
            error={errors.physical_activity_hours}
            helper="Exercise, sports, walking, gym."
            required
          >
            <NumberInput
              id="activity-hours"
              value={data.physical_activity_hours ?? ''}
              onChange={val => onChange('physical_activity_hours', val === '' ? 0 : val as number)}
              min={0}
              max={24}
              step={0.5}
              placeholder="e.g. 1"
              hasError={!!errors.physical_activity_hours}
              unit="hrs/day"
            />
          </FormField>

          <FormField
            label="Sleep per night"
            htmlFor="sleep-hours"
            error={errors.sleep_hours_per_night}
            helper="How much do you usually sleep?"
            required
          >
            <NumberInput
              id="sleep-hours"
              value={data.sleep_hours_per_night ?? ''}
              onChange={val => onChange('sleep_hours_per_night', val === '' ? 0 : val as number)}
              min={0}
              max={24}
              step={0.5}
              placeholder="e.g. 7"
              hasError={!!errors.sleep_hours_per_night}
              unit="hrs/night"
            />
          </FormField>
        </div>

        {/* Stress level */}
        <FormField
          label="Stress level kaisa rehta hai?"
          error={errors.stress_level}
          required
        >
          <StressSelector
            value={data.stress_level ?? ''}
            onChange={val => onChange('stress_level', val)}
            hasError={!!errors.stress_level}
          />
        </FormField>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .form-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

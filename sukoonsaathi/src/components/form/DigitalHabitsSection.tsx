// ============================================================
//  SukoonSaathi — Section 02: Academic & Digital Habits
// ============================================================

import type { StudentData, FormErrors } from '../../types';
import { FormField } from './FormField';
import { NumberInput } from './NumberInput';
import { SegmentedControl } from './SegmentedControl';
import { SelectInput } from './SelectInput';

interface DigitalHabitsSectionProps {
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

const PLATFORMS = [
  'Instagram', 'YouTube', 'LinkedIn', 'Twitter', 'TikTok', 'Snapchat',
  'WhatsApp', 'Facebook', 'WeChat', 'LINE', 'KakaoTalk', 'VKontakte',
].map(p => ({ value: p, label: p }));

const PURPOSES = [
  { value: 'Education', label: 'Education' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Networking', label: 'Networking' },
  { value: 'News', label: 'News' },
];

const ACADEMIC_LEVELS = [
  { value: 'High School', label: 'High School' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate', label: 'Graduate' },
];

export function DigitalHabitsSection({ data, errors, onChange }: DigitalHabitsSectionProps) {
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
            02
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
            Digital & Academic
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
          Your daily screen & study habits
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Tell us how you spend your study time and digital media routine.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {/* Academic level — full width */}
        <FormField
          label="Academic level"
          htmlFor="academic-level-High School"
          error={errors.academic_level}
          required
        >
          <SegmentedControl
            id="academic-level"
            value={data.academic_level ?? ''}
            onChange={val => onChange('academic_level', val as StudentData['academic_level'])}
            options={ACADEMIC_LEVELS}
            hasError={!!errors.academic_level}
          />
        </FormField>

        {/* Platform + Purpose */}
        <div style={GRID_2} className="form-grid-2">
          <FormField label="Most used platform" htmlFor="platform" error={errors.most_used_platform} required>
            <SelectInput
              id="platform"
              value={data.most_used_platform ?? ''}
              onChange={val => onChange('most_used_platform', val as StudentData['most_used_platform'])}
              options={PLATFORMS}
              placeholder="Select primary platform..."
              hasError={!!errors.most_used_platform}
            />
          </FormField>

          <FormField label="Primary purpose" htmlFor="purpose-Education" error={errors.purpose_of_use} required>
            <SegmentedControl
              id="purpose"
              value={data.purpose_of_use ?? ''}
              onChange={val => onChange('purpose_of_use', val as StudentData['purpose_of_use'])}
              options={PURPOSES}
              hasError={!!errors.purpose_of_use}
            />
          </FormField>
        </div>

        {/* Screen time + Phone unlocks */}
        <div style={GRID_2} className="form-grid-2">
          <FormField
            label="Average daily screen time"
            htmlFor="avg-usage"
            error={errors.avg_daily_usage_hours}
            helper="Approximate hours on social platforms or digital media."
            required
          >
            <NumberInput
              id="avg-usage"
              value={data.avg_daily_usage_hours ?? ''}
              onChange={val => onChange('avg_daily_usage_hours', val === '' ? 0 : val as number)}
              min={0}
              max={24}
              step={0.5}
              placeholder="e.g. 5.5"
              hasError={!!errors.avg_daily_usage_hours}
              unit="hrs/day"
            />
          </FormField>

          <FormField
            label="Daily phone unlocks"
            htmlFor="unlocks"
            error={errors.daily_unlocks}
            helper="About how many times do you unlock your phone per day?"
            required
          >
            <NumberInput
              id="unlocks"
              value={data.daily_unlocks ?? ''}
              onChange={val => onChange('daily_unlocks', val === '' ? 0 : val as number)}
              min={0}
              step={1}
              placeholder="e.g. 60"
              hasError={!!errors.daily_unlocks}
              unit="times"
            />
          </FormField>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

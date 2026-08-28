// ============================================================
//  SukoonSaathi — InputSummary
//  Compact summary of user inputs shown below the score
// ============================================================

import type { StudentData } from '../../types';

interface InputSummaryProps {
  data: StudentData;
}

interface SummaryItem {
  label: string;
  value: string;
}

export function InputSummary({ data }: InputSummaryProps) {
  const items: SummaryItem[] = [
    { label: 'Age', value: `${data.age} yrs` },
    { label: 'Gender', value: data.gender },
    { label: 'Country', value: data.country },
    { label: 'Academic', value: data.academic_level },
    { label: 'Platform', value: data.most_used_platform },
    { label: 'Purpose', value: data.purpose_of_use },
    { label: 'Sleep', value: `${data.sleep_hours_per_night} hrs` },
    { label: 'Study', value: `${data.study_hours} hrs` },
    { label: 'Screen time', value: `${data.avg_daily_usage_hours} hrs` },
    { label: 'Activity', value: `${data.physical_activity_hours} hrs` },
    { label: 'Stress', value: data.stress_level },
    { label: 'Phone unlocks', value: `${data.daily_unlocks}×/day` },
  ];

  return (
    <div>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-md)',
        }}
      >
        Based on your responses
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
        className="summary-grid"
      >
        {items.map(item => (
          <div
            key={item.label}
            style={{
              background: 'var(--color-surface-warm)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '3px',
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 560px) {
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 360px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
//  SukoonSaathi — Daily Rhythm (result section)
//  Visual bars using ACTUAL form inputs only
// ============================================================

import type { StudentData } from '../../types';

interface DailyRhythmProps {
  data: StudentData;
}

interface RhythmBar {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export function DailyRhythm({ data }: DailyRhythmProps) {
  const bars: RhythmBar[] = [
    {
      label: 'Sleep',
      value: data.sleep_hours_per_night,
      max: 12,
      unit: 'hrs/night',
      color: '#6B8F71',
    },
    {
      label: 'Study',
      value: data.study_hours,
      max: 12,
      unit: 'hrs/day',
      color: '#8B7355',
    },
    {
      label: 'Screen Time',
      value: data.avg_daily_usage_hours,
      max: 12,
      unit: 'hrs/day',
      color: '#9A9490',
    },
    {
      label: 'Physical Activity',
      value: data.physical_activity_hours,
      max: 6,
      unit: 'hrs/day',
      color: '#B5CABC',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.2px',
            color: 'var(--color-text)',
            marginBottom: '4px',
          }}
        >
          Your Daily Rhythm
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
          Here's what your routine looked like based on your answers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {bars.map(bar => {
          const pct = Math.min((bar.value / bar.max) * 100, 100);
          return (
            <div key={bar.label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}
                >
                  {bar.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {bar.value} {bar.unit}
                </span>
              </div>
              {/* Track */}
              <div
                style={{
                  height: '8px',
                  backgroundColor: 'var(--color-sage-light)',
                  borderRadius: '100px',
                  overflow: 'hidden',
                }}
                role="progressbar"
                aria-valuenow={bar.value}
                aria-valuemax={bar.max}
                aria-label={`${bar.label}: ${bar.value} ${bar.unit}`}
              >
                {/* Fill */}
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    backgroundColor: bar.color,
                    borderRadius: '100px',
                    transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
//  SukoonSaathi — Hero Daily Rhythm Abstract Visual
//  Calm circular rings representing sleep/study/activity/screen
// ============================================================

export function DailyRhythmVisual() {
  const segments = [
    { label: 'Sleep', color: '#6B8F71', offset: 0, size: 90 },
    { label: 'Study', color: '#8B7355', offset: 30, size: 72 },
    { label: 'Screen', color: '#9A9490', offset: 60, size: 54 },
    { label: 'Activity', color: '#B5CABC', offset: 90, size: 36 },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '280px',
        height: '280px',
        flexShrink: 0,
      }}
    >
      {/* Concentric rings */}
      <svg
        viewBox="0 0 280 280"
        width="280"
        height="280"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Outer glow ring */}
        <circle cx="140" cy="140" r="130" fill="none" stroke="#E8F0E9" strokeWidth="1" />
        <circle cx="140" cy="140" r="110" fill="none" stroke="#E8F0E9" strokeWidth="1" />
        <circle cx="140" cy="140" r="90" fill="none" stroke="#E8F0E9" strokeWidth="1" />
        <circle cx="140" cy="140" r="70" fill="none" stroke="#F0EBE3" strokeWidth="1" />

        {/* Sleep arc — outermost */}
        <circle
          cx="140" cy="140" r="120"
          fill="none"
          stroke="#6B8F71"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="502"
          strokeDashoffset="140"
          transform="rotate(-90 140 140)"
          opacity="0.7"
          style={{ animation: 'pulse-ring 4s ease-in-out infinite' }}
        />

        {/* Study arc */}
        <circle
          cx="140" cy="140" r="98"
          fill="none"
          stroke="#8B7355"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="410"
          strokeDashoffset="160"
          transform="rotate(-60 140 140)"
          opacity="0.6"
          style={{ animation: 'pulse-ring 5s ease-in-out infinite 0.5s' }}
        />

        {/* Screen time arc */}
        <circle
          cx="140" cy="140" r="76"
          fill="none"
          stroke="#9A9490"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="320"
          strokeDashoffset="120"
          transform="rotate(-30 140 140)"
          opacity="0.5"
          style={{ animation: 'pulse-ring 6s ease-in-out infinite 1s' }}
        />

        {/* Activity arc — innermost */}
        <circle
          cx="140" cy="140" r="54"
          fill="none"
          stroke="#B5CABC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="226"
          strokeDashoffset="80"
          transform="rotate(20 140 140)"
          opacity="0.5"
          style={{ animation: 'pulse-ring 7s ease-in-out infinite 1.5s' }}
        />

        {/* Center dot */}
        <circle cx="140" cy="140" r="5" fill="#6B8F71" opacity="0.6" />
        <circle cx="140" cy="140" r="2" fill="#6B8F71" />

        {/* Small dot markers on rings */}
        {segments.map((seg, i) => {
          const angle = (-90 + seg.offset) * (Math.PI / 180);
          const r = [120, 98, 76, 54][i];
          const x = 140 + r * Math.cos(angle);
          const y = 140 + r * Math.sin(angle);
          return (
            <circle
              key={seg.label}
              cx={x} cy={y} r="4"
              fill={seg.color}
              opacity="0.8"
            />
          );
        })}
      </svg>

      {/* Floating labels */}
      <div
        style={{
          position: 'absolute',
          top: '18px',
          right: '30px',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--color-sage)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Sleep
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '20px',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Study
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '28px',
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Activity
      </div>
    </div>
  );
}

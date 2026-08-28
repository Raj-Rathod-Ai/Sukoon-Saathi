// ============================================================
//  SukoonSaathi — Wellness Intro (before form)
// ============================================================

export function WellnessIntro() {
  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        padding: 'var(--space-3xl) var(--space-lg) var(--space-2xl)',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-md)',
        }}
      >
        Let's understand your routine.
      </h2>

      <p
        style={{
          fontSize: '17px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          marginBottom: 'var(--space-sm)',
        }}
      >
        Bas kuch simple questions. No right or wrong answers — just your usual routine.
      </p>

      <p
        style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}
      >
        Your answers are used only to generate the wellness prediction.
      </p>
    </div>
  );
}

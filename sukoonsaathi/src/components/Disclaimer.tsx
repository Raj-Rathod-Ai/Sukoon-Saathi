// ============================================================
//  SukoonSaathi — Disclaimer
// ============================================================

export function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="Important disclaimer"
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: 'var(--space-2xl) var(--space-lg)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          marginBottom: 'var(--space-sm)',
        }}
      >
        <strong style={{ color: 'var(--color-text-secondary)' }}>Important:</strong>{' '}
        SukoonSaathi provides an ML-based informational estimate from the information you enter. It is not a medical diagnosis, psychological assessment, or substitute for professional care.
      </p>
      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
        If you're concerned about your mental health, consider speaking with a qualified mental-health professional or someone you trust.
      </p>
    </div>
  );
}

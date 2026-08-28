// ============================================================
//  SukoonSaathi — PredictionButton
// ============================================================

interface PredictionButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export function PredictionButton({ isLoading, isDisabled, onClick }: PredictionButtonProps) {
  return (
    <button
      id="predict-btn"
      type="button"
      onClick={onClick}
      disabled={isLoading || isDisabled}
      aria-busy={isLoading}
      aria-label={isLoading ? 'Calculating your SukoonScore...' : 'Check My SukoonScore'}
      style={{
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px 32px',
        fontSize: '16px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        letterSpacing: '0.02em',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        cursor: isLoading || isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition-base)',
        backgroundColor: isLoading || isDisabled
          ? 'var(--color-border)'
          : 'var(--color-text)',
        color: isLoading || isDisabled ? 'var(--color-text-muted)' : 'white',
        boxShadow: isLoading || isDisabled
          ? 'none'
          : 'var(--shadow-md)',
      }}
      onMouseEnter={e => {
        if (!isLoading && !isDisabled) {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = 'var(--color-sage-dark)';
          btn.style.transform = 'translateY(-1px)';
          btn.style.boxShadow = 'var(--shadow-lg)';
        }
      }}
      onMouseLeave={e => {
        if (!isLoading && !isDisabled) {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = 'var(--color-text)';
          btn.style.transform = 'translateY(0)';
          btn.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseDown={e => {
        if (!isLoading && !isDisabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
        }
      }}
      onMouseUp={e => {
        if (!isLoading && !isDisabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }
      }}
    >
      {isLoading ? (
        <>
          {/* Breathing pulse loader */}
          <span
            style={{
              width: '18px',
              height: '18px',
              border: '2.5px solid rgba(28,28,26,0.3)',
              borderTopColor: 'var(--color-text)',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin-slow 0.8s linear infinite',
              flexShrink: 0,
            }}
          />
          Calculating...
        </>
      ) : (
        <>
          Check My SukoonScore
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
  );
}

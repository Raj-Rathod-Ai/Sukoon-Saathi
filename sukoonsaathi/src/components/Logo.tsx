// ============================================================
//  SukoonSaathi — Logo Component
//  Minimal flowing S + calm dot — represents balance & peace
// ============================================================

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 36, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SukoonSaathi logo"
      className={className}
    >
      {/* Soft warm circle background */}
      <circle cx="20" cy="20" r="20" fill="#E8F0E9" />

      {/* Upper arc of the S — flowing upward left to right */}
      <path
        d="M13 15 C13 11, 18 9, 22 12 C26 15, 26 18, 20 20"
        stroke="#6B8F71"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lower arc of the S — flowing downward right to left */}
      <path
        d="M20 20 C14 22, 14 25, 18 28 C22 31, 27 29, 27 25"
        stroke="#6B8F71"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small warm accent dot — like a gentle companion beside the S */}
      <circle cx="27" cy="13" r="2" fill="#8B7355" opacity="0.75" />
    </svg>
  );
}

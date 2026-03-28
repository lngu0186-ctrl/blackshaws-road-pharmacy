// No React import needed with automatic JSX runtime in Vite

// Icon 1: Blister pack / pill sheet
export function IconContraceptive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="12" y="10" width="40" height="44" rx="4" fill="currentColor"/>
      <rect x="16" y="14" width="8" height="6" rx="1" fill="white"/>
      <rect x="28" y="14" width="8" height="6" rx="1" fill="white"/>
      <rect x="40" y="14" width="8" height="6" rx="1" fill="white"/>
      <rect x="16" y="24" width="8" height="6" rx="1" fill="white"/>
      <rect x="28" y="24" width="8" height="6" rx="1" fill="white"/>
      <rect x="40" y="24" width="8" height="6" rx="1" fill="white"/>
      <rect x="16" y="34" width="8" height="6" rx="1" fill="white"/>
      <rect x="28" y="34" width="8" height="6" rx="1" fill="white"/>
      <rect x="40" y="34" width="8" height="6" rx="1" fill="white"/>
    </svg>
  )
}

// Icon 2: Stylised capsule/pill
export function IconUTI({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="32" cy="28" rx="12" ry="6" fill="currentColor"/>
      <rect x="20" y="28" width="24" height="12" rx="6" fill="currentColor"/>
      <ellipse cx="32" cy="40" rx="12" ry="6" fill="currentColor"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="white"/>
      <rect x="24" y="28" width="16" height="12" rx="4" fill="white"/>
      <ellipse cx="32" cy="40" rx="8" ry="4" fill="white"/>
    </svg>
  )
}

// Icon 3: Outline of back with blistering rash dots
export function IconShingles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shoulder and back outline */}
      <path d="M20 24C16 26 14 30 14 34C14 40 18 44 24 46C28 47 32 47 36 46C42 44 46 40 46 34C46 28 44 24 40 22" fill="currentColor"/>
      <rect x="18" y="22" width="28" height="24" rx="8" fill="currentColor"/>
      {/* Rash dots */}
      <circle cx="24" cy="32" r="2" fill="white"/>
      <circle cx="32" cy="30" r="2" fill="white"/>
      <circle cx="40" cy="34" r="2" fill="white"/>
      <circle cx="28" cy="38" r="2" fill="white"/>
      <circle cx="36" cy="36" r="2" fill="white"/>
    </svg>
  )
}

// Icon 4: Arm with patchy skin markings (psoriasis)
export function IconPsoriasis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Arm shape */}
      <path d="M24 14C24 14 20 18 20 26C20 36 24 44 28 48C32 52 44 52 48 48C52 44 56 36 56 28C56 20 52 14 44 14H24Z" fill="currentColor"/>
      {/* Patchy spots */}
      <circle cx="28" cy="28" r="4" fill="white"/>
      <circle cx="36" cy="32" r="3" fill="white"/>
      <circle cx="44" cy="26" r="3" fill="white"/>
      <circle cx="40" cy="38" r="3" fill="white"/>
      <circle cx="32" cy="42" r="3" fill="white"/>
    </svg>
  )
}

// Icon 5: Commercial aeroplane
export function IconVaccinations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Fuselage */}
      <path d="M32 16C36 16 40 18 44 22C50 28 52 36 52 42C52 50 48 58 44 60L34 62L24 60C20 58 16 50 16 42C16 36 18 28 24 22C28 18 32 16 32 16Z" fill="currentColor"/>
      {/* Wings */}
      <path d="M24 34L16 44L8 42L16 32L24 34Z" fill="currentColor"/>
      <path d="M40 32L48 42L56 44L48 32L40 32Z" fill="currentColor"/>
      {/* Tail */}
      <path d="M34 24L32 20L20 22L22 26L34 24Z" fill="currentColor"/>
      {/* Windows */}
      <circle cx="38" cy="26" r="1.5" fill="white"/>
      <circle cx="42" cy="28" r="1.5" fill="white"/>
      <circle cx="38" cy="34" r="1.5" fill="white"/>
      <circle cx="42" cy="36" r="1.5" fill="white"/>
    </svg>
  )
}

// Icon 6: Two children with spots (impetigo)
export function IconImpetigo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Child 1 (head) */}
      <circle cx="22" cy="28" r="8" fill="currentColor"/>
      {/* Child 1 body */}
      <path d="M18 38C16 42 16 48 18 52" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Spots on face */}
      <circle cx="20" cy="26" r="1" fill="white"/>
      <circle cx="24" cy="28" r="1" fill="white"/>
      <circle cx="22" cy="30" r="1" fill="white"/>
      {/* Child 2 (head) */}
      <circle cx="42" cy="28" r="8" fill="currentColor"/>
      {/* Child 2 body */}
      <path d="M38 38C36 42 36 48 38 52" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Spots on face */}
      <circle cx="40" cy="26" r="1" fill="white"/>
      <circle cx="44" cy="28" r="1" fill="white"/>
      <circle cx="42" cy="30" r="1" fill="white"/>
      {/* Body spots */}
      <circle cx="18" cy="44" r="1.5" fill="white"/>
      <circle cx="22" cy="46" r="1.5" fill="white"/>
      <circle cx="38" cy="44" r="1.5" fill="white"/>
      <circle cx="42" cy="46" r="1.5" fill="white"/>
    </svg>
  )
}

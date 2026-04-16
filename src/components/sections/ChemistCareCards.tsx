// Clean line-art icons for Chemist Care Now condition cards

// Icon 1: Contraceptive pill blister pack
export function IconContraceptive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      <rect x="14" y="10" width="36" height="44" rx="3" />
      <circle cx="24" cy="20" r="3" />
      <circle cx="32" cy="20" r="3" />
      <circle cx="40" cy="20" r="3" />
      <circle cx="24" cy="30" r="3" />
      <circle cx="32" cy="30" r="3" />
      <circle cx="40" cy="30" r="3" />
      <circle cx="24" cy="40" r="3" />
      <circle cx="32" cy="40" r="3" />
      <circle cx="40" cy="40" r="3" />
    </svg>
  )
}

// Icon 2: UTI – kidney/bladder outline with droplet
export function IconUTI({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      {/* Bladder shape */}
      <path d="M22 18c-6 2-10 8-10 16 0 10 8 18 20 18s20-8 20-18c0-8-4-14-10-16" />
      {/* Ureters */}
      <path d="M22 18V10" />
      <path d="M42 18V10" />
      {/* Water droplet */}
      <path d="M32 28c-2 3-5 6-5 9a5 5 0 0010 0c0-3-3-6-5-9z" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// Icon 3: Shingles – skin with rash/blisters
export function IconShingles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      {/* Body/torso outline */}
      <path d="M16 14h32v36a4 4 0 01-4 4H20a4 4 0 01-4-4V14z" />
      <line x1="16" y1="14" x2="48" y2="14" />
      {/* Rash dots in a band pattern (dermatome) */}
      <circle cx="24" cy="26" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="30" cy="24" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="36" cy="27" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="42" cy="25" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="27" cy="32" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="33" cy="30" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="39" cy="33" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// Icon 4: Psoriasis – arm with patchy skin markings
export function IconPsoriasis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      {/* Tube of cream */}
      <rect x="18" y="24" width="28" height="22" rx="3" />
      <path d="M22 24V18a2 2 0 012-2h16a2 2 0 012 2v6" />
      <rect x="28" y="12" width="8" height="6" rx="2" />
      {/* Squiggle of cream coming out */}
      <path d="M32 10c-1-3-3-3-2-6" strokeWidth="2.5" />
      {/* Patches on tube label */}
      <path d="M24 32h16" opacity="0.4" />
      <path d="M26 36h12" opacity="0.4" />
      <path d="M28 40h8" opacity="0.4" />
    </svg>
  )
}

// Icon 5: Travel vaccinations – syringe + plane
export function IconVaccinations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      {/* Syringe */}
      <path d="M14 50l6-6" />
      <path d="M20 44l18-18" strokeWidth="2.5" />
      <path d="M38 26l4-4" />
      <path d="M42 22l4 4" />
      <line x1="24" y1="36" x2="28" y2="40" />
      <line x1="28" y1="32" x2="32" y2="36" />
      {/* Small plane */}
      <path d="M44 10l4 2-8 8-6-2-2 2 4 4-2 2-6-4-2 2 3 3-2 1-4-4" fill="none" />
      <path d="M48 8l4 4" />
      <path d="M52 12l-4-4" />
      {/* Simplified plane in corner */}
      <path d="M46 12l6-2 4 4-2 6" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

// Icon 6: Impetigo – child face with sores
export function IconImpetigo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> aria-hidden="true" focusable="false"
      {/* Child face */}
      <circle cx="32" cy="30" r="16" />
      {/* Hair */}
      <path d="M18 24c2-8 8-14 14-14s12 6 14 14" />
      {/* Eyes */}
      <circle cx="26" cy="30" r="1.5" fill="currentColor" />
      <circle cx="38" cy="30" r="1.5" fill="currentColor" />
      {/* Mouth */}
      <path d="M28 37c2 2 6 2 8 0" />
      {/* Sores / red marks */}
      <circle cx="22" cy="36" r="2.5" fill="currentColor" opacity="0.35" />
      <circle cx="40" cy="24" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="36" cy="40" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

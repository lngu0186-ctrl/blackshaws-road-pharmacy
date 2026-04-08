// Maps health-services-nav slugs to services.ts slugs
// This allows the mega menu links (e.g., /health-services/medscheck) to find the right service data

export const SERVICE_SLUG_MAP: Record<string, string> = {
  // Preventive Health
  'health-checks': 'blood-pressure-check',
  'vaccinations': 'flu-vaccination',
  'travel-health': 'travel-vaccinations',
  'blood-pressure': 'blood-pressure-check',

  // Medication Services
  'medscheck': 'medscheck',
  'diabetes-medscheck': 'diabetes-management',
  'medication-management': 'prescription-reviews',
  'dose-administration-aids': 'dose-administration-aids',
  'escripts': 'prescription-reviews',
  'absence-certificates': 'prescription-reviews',

  // Chronic Condition Support
  'diabetes': 'diabetes-management',
  'heart-health': 'hypertension-management',
  'asthma-copd': 'asthma-management',
  'pain-support': 'pain-support',
  'gut-health': 'diabetes-management',
  'weight-management': 'diabetes-management',

  // Specialised Care
  'wound-care': 'wound-care',
  'out-of-hospital': 'out-of-hospital',
  'aged-care': 'aged-care-services',

  // Life Stage & Wellness
  'womens-health': 'contraceptive-pill',
  'mens-health': 'mens-health',
  'baby-breastfeeding': 'baby-breastfeeding',
  'skin-health': 'skin-health',
  'uti-program': 'uti-treatment',

  // Canonical slugs that should also resolve directly
  'prescription-reviews': 'prescription-reviews',
  'hypertension-management': 'hypertension-management',
  'asthma-management': 'asthma-management',
  'diabetes-management': 'diabetes-management',
  'contraceptive-pill': 'contraceptive-pill',
  'pregnancy-testing': 'pregnancy-testing',
  'uti-treatment': 'uti-treatment',
}

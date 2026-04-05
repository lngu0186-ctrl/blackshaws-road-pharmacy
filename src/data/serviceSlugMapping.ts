// Maps health-services-nav slugs to services.ts slugs
// This allows the mega menu links (e.g., /health-services/medscheck) to find the right service data

export const SERVICE_SLUG_MAP: Record<string, string> = {
  // Preventive Health
  'health-checks': 'blood-pressure-check', // Overview page for health checks
  'vaccinations': 'flu-vaccination', // Landing page for all vaccinations
  'travel-health': 'travel-vaccinations',
  'blood-pressure': 'blood-pressure-check',

  // Medication Services
  'medscheck': 'medscheck',
  'diabetes-medscheck': 'medscheck', // Points to same service for now
  'medication-management': 'prescription-reviews',
  'dose-administration-aids': 'dose-administration-aids',
  'escripts': 'prescription-reviews', // eScripts handled under prescription reviews
  'absence-certificates': 'prescription-reviews', // Placeholder

  // Chronic Condition Support
  'diabetes': 'diabetes-management',
  'heart-health': 'hypertension-management', // Heart health uses hypertension service
  'asthma-copd': 'asthma-management',
  'pain-support': 'pain-support', // Now has real content
  'gut-health': 'diabetes-management', // Temporary mapping
  'weight-management': 'diabetes-management', // Temporary mapping

  // Specialised Care
  'wound-care': 'wound-care',
  'out-of-hospital': 'out-of-hospital', // Now has real content
  'aged-care': 'aged-care-services',

  // Life Stage & Wellness
  'womens-health': 'contraceptive-pill', // Women's health landing
  'mens-health': 'mens-health', // Now has real content
  'baby-breastfeeding': 'baby-breastfeeding', // Now has real content
  'skin-health': 'skin-health', // Now has real content
  'uti-program': 'uti-treatment',
}

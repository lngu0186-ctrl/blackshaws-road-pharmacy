// Service definitions for Blackshaws Road Pharmacy
// All content should be Australian pharmacy-focused and professional

export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ServiceCategory
  icon: string
  image?: string
  whoIsItFor: string
  whatToExpect: string
  cost: string
  bookingCTA: string
  isFree: boolean
  tags: string[]
}

export type ServiceCategory =
  | 'health-checks'
  | 'vaccinations'
  | 'medication-management'
  | 'chronic-disease'
  | 'womens-health'
  | 'wound-care'
  | 'aged-care-ndis'
  | 'beauty-skincare'

export const serviceCategories: Record<ServiceCategory, { title: string; description: string }> = {
  'health-checks': {
    title: 'Health Checks & Screenings',
    description: 'Quick, accurate health screenings to monitor your wellbeing. No appointment needed for most services.',
  },
  vaccinations: {
    title: 'Vaccinations & Immunisations',
    description: 'Protect yourself and your family with our comprehensive vaccination services. Book online or walk in.',
  },
  'medication-management': {
    title: 'Medication Management',
    description: 'Expert review and optimisation of your medications to ensure safety and effectiveness.',
  },
  'chronic-disease': {
    title: 'Chronic Disease Support',
    description: 'Ongoing care and management for conditions like diabetes, asthma, and hypertension.',
  },
  'womens-health': {
    title: "Women's Health",
    description: 'Confidential women\'s health services including contraceptive advice and pregnancy testing.',
  },
  'wound-care': {
    title: 'Wound Care & Minor Ailments',
    description: 'Professional wound management and treatment for minor illnesses and infections.',
  },
  'aged-care-ndis': {
    title: 'Aged Care & NDIS Support',
    description: 'Dedicated services for elderly patients and NDIS participants.',
  },
  'beauty-skincare': {
    title: 'Beauty & Skincare Consultations',
    description: 'Expert advice on skincare, cosmeceuticals, and beauty treatments from qualified professionals.',
  },
}

export const services: Service[] = [
  // HEALTH CHECKS
  {
    id: 'blood-pressure-check',
    slug: 'blood-pressure-check',
    title: 'Blood Pressure Check',
    shortDescription: 'Quick and accurate blood pressure screening with pharmacist advice',
    fullDescription: 'Regular blood pressure monitoring is essential for maintaining heart health and detecting hypertension early. Our pharmacists use clinically validated equipment to measure your blood pressure and provide immediate advice on maintaining healthy levels. We can also help you track your readings over time and refer you to a doctor if needed.',
    category: 'health-checks',
    icon: 'activity',
    whoIsItFor: 'Anyone concerned about their blood pressure, or as part of routine health monitoring. Recommended for adults over 40, or earlier if you have risk factors.',
    whatToExpect: 'A 5-minute screening using automated blood pressure monitor. Your results are recorded and explained by a qualified pharmacist, along with lifestyle recommendations.',
    cost: 'Free (no Medicare levy required)',
    bookingCTA: 'Walk in anytime — no appointment needed',
    isFree: true,
    tags: ['blood pressure', 'hypertension', 'heart health', 'screening'],
  },
  {
    id: 'cholesterol-screening',
    slug: 'cholesterol-screening',
    title: 'Cholesterol & Lipid Screening',
    shortDescription: 'Comprehensive cholesterol test with instant results and advice',
    fullDescription: 'High cholesterol is a major risk factor for heart disease and stroke. Our screening tests measure total cholesterol, HDL, LDL, and triglycerides using a small finger-prick blood sample. Results are available within minutes, and our pharmacists provide detailed interpretation and lifestyle guidance. If needed, we can refer you to your GP for further assessment.',
    category: 'health-checks',
    icon: 'heart',
    whoIsItFor: 'Adults interested in heart health, those with family history of cardiovascular disease, or as part of a comprehensive health check.',
    whatToExpect: 'A quick finger-prick test (less than 5 minutes). Results in 10 minutes. Pharmacist consultation included to explain your numbers and next steps.',
    cost: '$25 (includes full lipid panel and consultation)',
    bookingCTA: 'Book online or walk in',
    isFree: false,
    tags: ['cholesterol', 'lipids', 'heart disease', 'cardiovascular'],
  },
  {
    id: 'blood-glucose-screening',
    slug: 'blood-glucose-screening',
    title: 'Blood Glucose & Diabetes Screening',
    shortDescription: 'Test your blood sugar levels and assess diabetes risk',
    fullDescription: 'Early detection of diabetes or pre-diabetes can prevent serious complications. Our blood glucose screening uses a fasting blood sample to measure glucose levels and assess your risk. We also provide education on diabetes prevention, management strategies, and can help you access further medical care if needed.',
    category: 'health-checks',
    icon: 'droplet',
    whoIsItFor: 'Anyone wanting to check their diabetes risk, those with symptoms like excessive thirst or fatigue, or for routine monitoring if you have pre-diabetes.',
    whatToExpect: 'Fasting (8 hours) recommended. Small finger-prick test. Results in 5 minutes. Comprehensive consultation on results and risk factors.',
    cost: '$20 (includes test and pharmacist consultation)',
    bookingCTA: 'Walk in — fasting required',
    isFree: false,
    tags: ['diabetes', 'blood sugar', 'glucose', 'screening'],
  },
  {
    id: 'stroke-risk-assessment',
    slug: 'stroke-risk-assessment',
    title: 'Stroke Risk Assessment',
    shortDescription: 'Evaluate your risk of stroke with comprehensive screening',
    fullDescription: 'Stroke is a leading cause of death and disability in Australia. Our stroke risk assessment combines blood pressure measurement, cholesterol screening, atrial fibrillation detection, and lifestyle questionnaire to provide a personalised risk profile. We identify modifiable risk factors and provide actionable advice to reduce your risk.',
    category: 'health-checks',
    icon: 'brain',
    whoIsItFor: 'Adults over 40, those with family history of stroke, or anyone wanting to understand and reduce their stroke risk.',
    whatToExpect: '15-minute assessment including BP, cholesterol (optional), AFib check via ECG device, and consultation with pharmacist.',
    cost: 'Free for BP check, $45 for full stroke risk package',
    bookingCTA: 'Book for a full assessment or walk in for BP check',
    isFree: true,
    tags: ['stroke', 'cardiovascular', 'risk assessment', 'afib'],
  },
  {
    id: 'sleep-apnea-screening',
    slug: 'sleep-apnea-screening',
    title: 'Sleep Apnea Screening',
    shortDescription: 'Identify potential sleep apnea with at-home testing kit',
    fullDescription: 'Sleep apnea affects millions of Australians and can lead to serious health issues if untreated. We provide at-home sleep apnea screening devices that monitor your breathing, oxygen levels, and snoring patterns overnight. Results are reviewed by our pharmacists who can refer you to a sleep specialist if needed.',
    category: 'health-checks',
    icon: 'moon',
    whoIsItFor: 'People who snore loudly, feel excessively tired during the day, have been told they stop breathing during sleep, or have high blood pressure.',
    whatToExpect: 'Pick up a take-home device, wear it overnight, return for results. Full consultation provided.',
    cost: '$99 for screening kit and report',
    bookingCTA: 'Enquire in store for more information',
    isFree: false,
    tags: ['sleep apnea', 'snoring', 'sleep disorder', 'CPAP'],
  },
  // VACCINATIONS
  {
    id: 'flu-vaccination',
    slug: 'flu-vaccination',
    title: 'Flu Vaccination',
    shortDescription: 'Protect yourself and your family from influenza with our annual flu shots',
    fullDescription: 'Influenza is a serious illness that can lead to hospitalisation and even death, especially in vulnerable populations. We offer the latest quadrivalent flu vaccine covering four strains of influenza. Vaccination is recommended annually for everyone over 6 months old. Our pharmacists are trained vaccinators and can administer the shot quickly and safely with no GP appointment required.',
    category: 'vaccinations',
    icon: 'shield',
    whoIsItFor: 'Everyone over 6 months of age. Particularly important for pregnant women, elderly, children, and those with chronic conditions.',
    whatToExpect: 'Quick injection in the upper arm. No Medicare card required. 15-minute observation period recommended. Most private health funds offer rebates.',
    cost: '$20-$30 (varies by vaccine type) — free for eligible under National Immunisation Program',
    bookingCTA: 'Book online or walk in',
    isFree: true,
    tags: ['flu', 'influenza', 'vaccine', 'immunisation'],
  },
  {
    id: 'covid-19-vaccination',
    slug: 'covid-19-vaccination',
    title: 'COVID-19 Vaccination',
    shortDescription: 'Stay protected with up-to-date COVID-19 vaccines and boosters',
    fullDescription: 'COVID-19 vaccination remains important for protecting against severe illness. We offer current bivalent and monovalent vaccines as recommended by ATAGI. Whether it\'s your first dose or a booster, our pharmacists can administer the vaccine safely and record it in your immunisation history.',
    category: 'vaccinations',
    icon: 'shield',
    whoIsItFor: 'All adults and eligible children as per current ATAGI recommendations. Check our website for latest eligibility.',
    whatToExpect: 'Similar to flu shot — quick injection with minimal discomfort. No Medicare card needed. Bookings available.',
    cost: 'Free for all eligible Australians',
    bookingCTA: 'Book your COVID-19 vaccination today',
    isFree: true,
    tags: ['COVID', 'coronavirus', 'vaccine', 'booster'],
  },
  {
    id: 'travel-vaccinations',
    slug: 'travel-vaccinations',
    title: 'Travel Vaccinations & Advice',
    shortDescription: 'Comprehensive travel health consultations including vaccines and medications',
    fullDescription: 'Planning an overseas trip? Stay healthy abroad with our travel health service. We provide destination-specific vaccinations (hepatitis A & B, typhoid, yellow fever, Japanese encephalitis, meningococcal, rabies, and more), malaria prophylaxis, and expert advice on food/water safety, jet lag prevention, and travel-related health risks. Yellow fever certificates available.',
    category: 'vaccinations',
    icon: 'plane',
    whoIsItFor: 'All travellers heading overseas, especially to Asia, Africa, South America, and the Pacific Islands. Book 4-6 weeks before departure for optimal protection.',
    whatToExpect: 'Comprehensive consultation (30 minutes) covering itinerary, required vaccines, medications, and health precautions. Some vaccines require multiple doses over several visits.',
    cost: 'Varies by vaccine — consultation fee $30 (waived if vaccines administered)',
    bookingCTA: 'Book a travel health appointment',
    isFree: false,
    tags: ['travel', 'vaccines', 'yellow fever', 'malaria', 'hepatitis'],
  },
  {
    id: 'shingles-vaccination',
    slug: 'shingles-vaccination',
    title: 'Shingles Vaccination',
    shortDescription: 'Protect yourself from shingles and post-herpetic neuralgia',
    fullDescription: 'Shingles (herpes zoster) is a painful reactivation of chickenpox virus that can cause long-term nerve pain. We offer the recombinant zoster vaccine (RZV, Shingrix®), which provides over 90% protection. Recommended for adults over 50, and for adults over 18 with immunosuppression. Two doses required, 2-6 months apart.',
    category: 'vaccinations',
    icon: 'shield',
    whoIsItFor: 'Adults 50+ (free under National Immunisation Program), adults 18+ with immunocompromising conditions, and anyone seeking protection.',
    whatToExpect: 'Two-dose series. Second dose 2-6 months after first. Quick injection with minimal side effects. No Medicare card required.',
    cost: 'Free for eligible adults (NIP), otherwise $150 per dose',
    bookingCTA: 'Book your shingles vaccine today',
    isFree: true,
    tags: ['shingles', 'herpes zoster', 'vaccine', 'elderly'],
  },
  {
    id: 'whooping-cough-vaccination',
    slug: 'whooping-cough-vaccination',
    title: 'Whooping Cough (Pertussis) Vaccination',
    shortDescription: 'Protect infants and vulnerable adults from pertussis',
    fullDescription: 'Whooping cough can be life-threatening for newborns. We offer dTap (diphtheria, tetanus, pertussis) vaccines for adults, especially recommended for parents, grandparents, and caregivers of infants. Cocooning strategy protects babies before they complete their own vaccinations. Also available as part of combination vaccines.',
    category: 'vaccinations',
    icon: 'shield',
    whoIsItFor: 'Adults who are around infants (parents, grandparents, childcare workers), pregnant women (each pregnancy), and adults who haven\'t had a pertussis booster in the last 10 years.',
    whatToExpect: 'Single injection. Can be combined with flu shot. Safe during pregnancy (recommended in 2nd or 3rd trimester).',
    cost: '$30-$50 depending on vaccine type',
    bookingCTA: 'Get vaccinated to protect your family',
    isFree: false,
    tags: ['whooping cough', 'pertussis', 'vaccine', 'babies'],
  },
  // MEDICATION MANAGEMENT
  {
    id: 'medscheck',
    slug: 'medscheck',
    title: 'MedsCheck - Medication Review',
    shortDescription: 'Comprehensive pharmacy review of your medications for safety and effectiveness',
    fullDescription: 'MedsCheck is a government-funded service where our pharmacists conduct a thorough review of all your medications (prescription, OTC, supplements). We identify potential interactions, address side effects, improve adherence, and ensure you\'re getting the maximum benefit from your treatments. A MedsCheck report is sent to your GP.',
    category: 'medication-management',
    icon: 'clipboard-list',
    whoIsItFor: 'Patients taking 4+ medications, those with chronic conditions, recently discharged from hospital, or anyone wanting to optimise their medication regimen. Government-funded for eligible patients.',
    whatToExpect: '30-minute private consultation. Bring all your medications (including supplements). Pharmacist provides a written report and discusses any concerns with you and your GP.',
    cost: 'Free (government funded for eligible patients) — $30 for private review',
    bookingCTA: 'Book your MedsCheck today',
    isFree: true,
    tags: ['medication review', 'MedsCheck', 'pharmacist', 'safety'],
  },
  {
    id: 'prescription-reviews',
    slug: 'prescription-reviews',
    title: 'Prescription Review & Counselling',
    shortDescription: 'Expert advice on new medications and ongoing prescription management',
    fullDescription: 'When you start a new medication, understanding how to take it correctly is crucial. Our pharmacists provide detailed counselling on dosage, timing, side effects, interactions, and what to expect. We also perform ongoing prescription reviews to ensure your treatment remains optimal. We can coordinate with your doctor for any necessary adjustments.',
    category: 'medication-management',
    icon: 'pill',
    whoIsItFor: 'Anyone prescribed a new medication, patients with questions about their prescriptions, those experiencing side effects, or those wanting to optimise their treatment.',
    whatToExpect: 'Discussions at the counter or in private consulting room. We take the time to ensure you\'re confident with your medication.',
    cost: 'Free with any prescription',
    bookingCTA: 'Ask your pharmacist when you collect your script',
    isFree: true,
    tags: ['prescription', 'counselling', 'pharmacist', 'medicines'],
  },
  {
    id: 'dose-administration-aids',
    slug: 'dose-administration-aids',
    title: 'Dose Administration Aids (DAA)',
    shortDescription: 'Organise your medications with weekly blister packs for ease and adherence',
    fullDescription: 'Managing multiple medications can be confusing and lead to missed doses. Our Dose Administration Aid service organises your medications into clearly labelled weekly or fortnightly blister packs. Each dose is pre-packed with the correct tablets for the right time of day. We also provide a medication list and can coordinate with your GP and caregivers.',
    category: 'medication-management',
    icon: 'calendar-check',
    whoIsItFor: 'Patients taking multiple medications, those with memory or dexterity issues, elderly patients, NDIS participants, and anyone wanting to simplify their medication routine.',
    whatToExpect: 'Bring your current medications for a quick assessment. Free setup and ongoing supply. Delivery available for regular customers.',
    cost: 'Free service (cost of medications extra) — may be subsidised by government programs',
    bookingCTA: 'Enquire about DAA services today',
    isFree: true,
    tags: ['blister pack', 'medication management', 'adherence', 'elderly'],
  },
  // CHRONIC DISEASE SUPPORT
  {
    id: 'diabetes-management',
    slug: 'diabetes-management',
    title: 'Diabetes Care & Management',
    shortDescription: 'Ongoing support for patients with type 1, type 2, and gestational diabetes',
    fullDescription: 'Living with diabetes requires daily management and regular monitoring. Our diabetes service includes blood glucose meter training, HbA1c testing, medication review, dietary advice, and ongoing support. We stock a full range of diabetes supplies (glucometers, test strips, insulin pens, CGM devices) and provide education on insulin administration, carbohydrate counting, and complication prevention.',
    category: 'chronic-disease',
    icon: 'droplet',
    whoIsItFor: 'All patients with diabetes (type 1, type 2, gestational) or pre-diabetes. Also for those newly diagnosed or wanting better control.',
    whatToExpect: 'Private consultation with diabetes-trained pharmacist. We can perform HbA1c point-of-care test (results in 5 minutes) and provide a management plan.',
    cost: 'Free consultations — testing may have small fee (HbA1c $15)',
    bookingCTA: 'Book a diabetes consultation',
    isFree: true,
    tags: ['diabetes', 'blood glucose', 'insulin', 'CGM', 'HbA1c'],
  },
  {
    id: 'asthma-management',
    slug: 'asthma-management',
    title: 'Asthma & Respiratory Care',
    shortDescription: 'Expert asthma management, inhaler technique training, and action plans',
    fullDescription: 'Proper asthma management can prevent attacks and improve quality of life. Our pharmacists are certified in asthma education and can review your inhaler technique, spacer use, and medication adherence. We develop personalised asthma action plans in collaboration with your doctor, teach you how to recognise worsening symptoms, and ensure you have the right medications. We also provide free spacer fitting and education.',
    category: 'chronic-disease',
    icon: 'wind',
    whoIsItFor: 'All patients with asthma or COPD, especially those with frequent symptoms, hospitalisations, or poor inhaler technique.',
    whatToExpect: ' inhaler technique assessment, spacer fit check, peak flow measurement, and action plan development.',
    cost: 'Free — funded by Asthma Australia (where eligible)',
    bookingCTA: 'Book an asthma review today',
    isFree: true,
    tags: ['asthma', 'COPD', 'respiratory', 'inhaler', 'spacer'],
  },
  {
    id: 'hypertension-management',
    slug: 'hypertension-management',
    title: 'Hypertension Management',
    shortDescription: 'Long-term support for managing high blood pressure',
    fullDescription: 'High blood pressure is a major risk factor for heart attack and stroke. Our hypertension service provides ongoing monitoring, medication review, lifestyle advice, and support to help you achieve and maintain target blood pressure. We work with your GP to optimise your treatment and can adjust doses under protocol where eligible.',
    category: 'chronic-disease',
    icon: 'activity',
    whoIsItFor: 'Patients diagnosed with hypertension, those with borderline readings, or anyone wanting to monitor and improve their blood pressure control.',
    whatToExpect: 'Regular BP checks, medication review, and personalised advice on diet, exercise, and stress management.',
    cost: 'Free with blood pressure check service',
    bookingCTA: 'Enroll in our hypertension program',
    isFree: true,
    tags: ['hypertension', 'blood pressure', 'heart health', 'medication'],
  },
  // WOMEN'S HEALTH
  {
    id: 'contraceptive-pill',
    slug: 'contraceptive-pill',
    title: 'Contraceptive Pill Resupply',
    shortDescription: 'Quick, confidential resupply of the oral contraceptive pill without a GP visit',
    fullDescription: 'Need a repeat prescription for the contraceptive pill but can\'t get to your GP? Our pharmacists can provide a continued supply of oral contraceptives under the Victorian Government\'s Chemist Care Now program. We assess your eligibility, review your health history, and provide a script for up to 3 months supply. Confidential, convenient, and no Medicare card required.',
    category: 'womens-health',
    icon: 'heart',
    whoIsItFor: 'Women already prescribed the oral contraceptive pill who need a repeat supply but cannot see their GP. Available to all genders seeking contraceptive support.',
    whatToExpect: 'Quick consultation with pharmacist (10-15 minutes). Bring your current pill pack and ID. If eligible, receive prescription on the spot.',
    cost: 'Consultation fee applies ($20) — no Medicare needed',
    bookingCTA: 'Walk in or call ahead',
    isFree: false,
    tags: ['contraception', 'pill', 'women\'s health', 'reproductive'],
  },
  {
    id: 'pregnancy-testing',
    slug: 'pregnancy-testing',
    title: 'Pregnancy Testing & Counselling',
    shortDescription: 'Confidential pregnancy testing with supportive counselling and referrals',
    fullDescription: 'A pregnancy test can be a stressful experience. Our confidential testing service provides accurate results within minutes, along with supportive, non-judgmental counselling from a caring pharmacist. We can discuss your options, provide information on pregnancy care, and refer you to appropriate healthcare providers including GP, midwife, or social services.',
    category: 'womens-health',
    icon: 'heart',
    whoIsItFor: 'Anyone who thinks they might be pregnant and needs testing, support, and information about next steps.',
    whatToExpect: 'Quick urine test with results in 3-5 minutes. Private consultation space available. All information is confidential.',
    cost: 'Free testing and counselling',
    bookingCTA: 'Walk in anytime — no appointment needed',
    isFree: true,
    tags: ['pregnancy', 'testing', 'counselling', 'reproductive health'],
  },
  {
    id: 'uti-treatment',
    slug: 'uti-treatment',
    title: 'UTI Treatment & Advice',
    shortDescription: 'Quick relief from uncomplicated urinary tract infections without a GP',
    fullDescription: 'Urinary tract infections (UTIs) are common and uncomfortable. Under the Victorian Government\'s Chemist Care Now program, our pharmacists can assess and treat uncomplicated UTIs in women. We provide same-day treatment with antibiotics (where appropriate), advice on symptom management, and prevention strategies. No GP appointment needed.',
    category: 'womens-health',
    icon: 'droplet',
    whoIsItFor: 'Women with mild to moderate UTI symptoms (burning, frequency, urgency) who are otherwise healthy. Not for complicated UTIs, men, or pregnant women.',
    whatToExpect: 'Symptom assessment and medical history review. If eligible, receive antibiotics on the spot with pharmacist counselling.',
    cost: 'Consultation fee plus medication cost — no Medicare required',
    bookingCTA: 'Walk in for quick UTI relief',
    isFree: false,
    tags: ['UTI', 'urinary tract infection', 'women\'s health', 'antibiotics'],
  },
  // WOUND CARE
  {
    id: 'wound-care',
    slug: 'wound-care',
    title: 'Wound Care & Dressing Service',
    shortDescription: 'Professional wound assessment, cleaning, and advanced dressing application',
    fullDescription: 'Proper wound care promotes healing and prevents infection. Our trained pharmacists provide wound assessment, cleaning, debridement, and application of advanced dressings for acute and chronic wounds. We manage lacerations, abrasions, pressure injuries, diabetic foot ulcers, post-surgical wounds, and more. Ongoing dressing changes available with a treatment plan.',
    category: 'wound-care',
    icon: 'bandage',
    whoIsItFor: 'Anyone with a wound requiring professional care — acute injuries, chronic wounds, post-operative dressings, or complex wounds needing advanced products.',
    whatToExpect: 'Private consultation room. Assessment, cleaning, treatment, and education. We can also coordinate with your doctor or community nurses.',
    cost: '$20 consultation + cost of dressings (may be covered by DVA,compensation, or private health)',
    bookingCTA: 'Book a wound care appointment',
    isFree: false,
    tags: ['wound', 'dressing', 'ulcer', 'healing', 'infection'],
  },
  {
    id: 'minor-ailments',
    slug: 'minor-ailments',
    title: 'Minor Ailments Treatment',
    shortDescription: 'Treatment for common conditions without a GP prescription',
    fullDescription: 'Our pharmacists can treat a wide range of minor ailments safely and effectively. Under the Victorian Government\'s Chemist Care Now program, we provide same-day treatment for conditions like conjunctivitis, ear infections, impetigo, nappy rash, and simple skin infections. Save time and avoid a GP visit for minor issues.',
    category: 'wound-care',
    icon: 'stethoscope',
    whoIsItFor: 'Patients with minor, uncomplicated infections or conditions that don\'t require antibiotics or specialist care. Not for severe, chronic, or complicated conditions.',
    whatToExpect: 'Assessment of symptoms. If eligible, receive treatment and advice. If condition is serious, we\'ll refer you to a doctor.',
    cost: 'Consultation fee plus medication cost — no Medicare required',
    bookingCTA: 'Walk in for minor ailment treatment',
    isFree: false,
    tags: ['conjunctivitis', 'ear infection', 'skin infection', 'impetigo', 'minor ailments'],
  },
  // AGED CARE & NDIS
  {
    id: 'aged-care-services',
    slug: 'aged-care-services',
    title: 'Aged Care Pharmacy Services',
    shortDescription: 'Comprehensive pharmacy support for elderly patients and their carers',
    fullDescription: 'We provide specialised pharmacy services for elderly patients, including home medicine reviews, dose administration aids, medication synchronisation, and delivery services. Our pharmacists work closely with GPs, aged care facilities, and family carers to ensure safe, effective medication use. We understand the complexities of poly-pharmacy and are committed to optimising outcomes for older Australians.',
    category: 'aged-care-ndis',
    icon: 'heart',
    whoIsItFor: 'Elderly patients, especially those on multiple medications, living at home or in aged care facilities, and their family carers.',
    whatToExpect: 'In-store consultation or home visit (by arrangement). Development of a medication management plan with clear instructions and compliance packaging.',
    cost: 'Home Medicine Reviews (HMRs) are government-funded for eligible patients. Other services free or subsidised.',
    bookingCTA: 'Enquire about aged care services',
    isFree: true,
    tags: ['aged care', 'elderly', 'DAA', 'home medicine review', 'HMR'],
  },
  {
    id: 'ndis-support',
    slug: 'ndis-support',
    title: 'NDIS Pharmacy Support',
    shortDescription: 'Pharmacy services for NDIS participants including managed and self-managed',
    fullDescription: 'We are registered NDIS providers offering a range of pharmacy services for participants. This includes medication management, dose administration aids, wound care, health monitoring, and consumable supplies. We work with participants, plan managers, and support coordinators to ensure services meet individual needs and NDIS plan goals.',
    category: 'aged-care-ndis',
    icon: 'users',
    whoIsItFor: 'NDIS participants with reasonable and necessary supports for pharmacy services. Both managed and self-managed participants welcome.',
    whatToExpect: 'Consultation to assess your needs. Development of service agreement and support plan. Ongoing service delivery with NDIS claim processing.',
    cost: 'As per NDIS price guide — may be covered by your plan',
    bookingCTA: 'Contact us to discuss your NDIS needs',
    isFree: false,
    tags: ['NDIS', 'disability', 'participant', 'managed'],
  },
  // BEAUTY & SKINCARE
  {
    id: 'skincare-consultations',
    slug: 'skincare-consultations',
    title: 'Skincare Consultations',
    shortDescription: 'Personalised skincare advice and product recommendations from trained beauty therapists',
    fullDescription: 'Our qualified beauty therapists provide personalised skin assessments and product recommendations. Using professional-grade products and tools, we analyse your skin type, concerns (acne, ageing, pigmentation, sensitivity), and develop a tailored skincare routine. We also offer advanced treatments including peels, microdermabrasion, and LED therapy.',
    category: 'beauty-skincare',
    icon: 'sparkles',
    whoIsItFor: 'Anyone wanting to improve their skin health, address specific concerns, or get professional advice on products and routines.',
    whatToExpect: 'Skin analysis using specialised equipment. Discussion of concerns and goals. Product recommendations and treatment plan.',
    cost: 'Free initial consultation — treatments from $60',
    bookingCTA: 'Book your skincare consultation',
    isFree: true,
    tags: ['skincare', 'beauty', 'cosmeceuticals', 'skin analysis'],
  },
  {
    id: 'mineral-makeup',
    slug: 'mineral-makeup',
    title: 'Mineral Makeup & Application',
    shortDescription: 'Experience the benefits of true mineral makeup with our certified artists',
    fullDescription: 'We offer a range of high-quality mineral makeup products that are gentle on the skin while providing excellent coverage. Our trained makeup artists can provide personalised colour matching, application lessons, and special occasion makeup. Mineral makeup is ideal for sensitive skin, acne-prone individuals, and those wanting non-comedogenic products.',
    category: 'beauty-skincare',
    icon: 'sparkles',
    whoIsItFor: 'Anyone with sensitive skin, acne, rosacea, or who wants a natural, non-irritating makeup option. Also great for special occasions.',
    whatToExpect: 'Colour matching session, application demonstration, and product recommendations. Try before you buy.',
    cost: 'Free colour matching — makeup services from $50',
    bookingCTA: 'Book a makeup consultation',
    isFree: true,
    tags: ['mineral makeup', 'beauty', 'cosmetics', 'sensitive skin'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category)
}

export function getCategories(): ServiceCategory[] {
  return [...new Set(services.map((service) => service.category))]
}

/**
 * Returns services grouped by category for navigation/mega menu display
 */
export function getServicesGroupedByCategory(): Array<{
  category: ServiceCategory
  title: string
  description: string
  services: Service[]
}> {
  return getCategories().map((category) => ({
    category,
    title: serviceCategories[category].title,
    description: serviceCategories[category].description,
    services: getServicesByCategory(category),
  }))
}

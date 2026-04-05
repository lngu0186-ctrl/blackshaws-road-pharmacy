// Health services navigation data structure for the benchmark IA
// Defines the 5 grouped sections for the Health Services mega dropdown

import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Shield,
  Plane,
  ClipboardList,
  Pill,
  CalendarCheck,
  FileText,
  Droplet,
  Heart,
  Wind,
  Flame,
  Apple,
  Dumbbell,
  Leaf,
  FlaskConical,
  Home,
  Users,
  Venus,
  Mars,
  Baby,
  Sparkles,
  Bandage,
} from 'lucide-react'

export interface HealthServiceNavItem {
  title: string
  href: string
  icon: LucideIcon
}

export interface HealthServiceGroup {
  id: string
  heading: string
  items: HealthServiceNavItem[]
}

export const healthServiceGroups: HealthServiceGroup[] = [
  {
    id: 'preventive-health',
    heading: 'Preventive Health',
    items: [
      { title: 'Health Checks', href: '/health-services/health-checks', icon: Activity },
      { title: 'Vaccinations', href: '/health-services/vaccinations', icon: Shield },
      { title: 'Travel Health', href: '/health-services/travel-health', icon: Plane },
      { title: 'Blood Pressure', href: '/health-services/blood-pressure', icon: Activity },
    ],
  },
  {
    id: 'medication-services',
    heading: 'Medication Services',
    items: [
      { title: 'MedsCheck', href: '/health-services/medscheck', icon: ClipboardList },
      { title: 'Diabetes MedsCheck', href: '/health-services/diabetes-medscheck', icon: Pill },
      { title: 'Medication Management', href: '/health-services/prescription-reviews', icon: Pill },
      { title: 'Dose Administration Aids', href: '/health-services/dose-administration-aids', icon: CalendarCheck },
      { title: 'eScripts', href: '/health-services/escripts', icon: FileText },
      { title: 'Absence Certificates', href: '/health-services/absence-certificates', icon: FileText },
    ],
  },
  {
    id: 'chronic-condition-support',
    heading: 'Chronic Condition Support',
    items: [
      { title: 'Diabetes', href: '/health-services/diabetes', icon: Droplet },
      { title: 'Heart Health', href: '/health-services/hypertension-management', icon: Heart },
      { title: 'Asthma & COPD', href: '/health-services/asthma-management', icon: Wind },
      { title: 'Pain Support', href: '/health-services/pain-support', icon: Flame },
      { title: 'Gut Health', href: '/health-services/diabetes-management', icon: Apple },
      { title: 'Weight Management', href: '/health-services/diabetes-management', icon: Dumbbell },
    ],
  },
  {
    id: 'specialised-care',
    heading: 'Specialised Care',
    items: [
      { title: 'Plant Based Therapies', href: '/plant-based-therapies', icon: Leaf },
      { title: 'Compounding', href: '/compounding', icon: FlaskConical },
      { title: 'Wound Care', href: '/health-services/wound-care', icon: Bandage },
      { title: 'Out of Hospital', href: '/health-services/out-of-hospital', icon: Home },
      { title: 'Aged Care', href: '/health-services/aged-care', icon: Users },
    ],
  },
  {
    id: 'life-stage-wellness',
    heading: 'Life Stage & Wellness',
    items: [
      { title: "Women's Health", href: '/health-services/contraceptive-pill', icon: Venus },
      { title: "Men's Health", href: '/health-services/contraceptive-pill', icon: Mars },
      { title: 'Baby & Breastfeeding', href: '/health-services/pregnancy-testing', icon: Baby },
      { title: 'Skin Health', href: '/health-services/skin-health', icon: Sparkles },
      { title: 'UTI Program', href: '/health-services/uti-treatment', icon: Droplet },
    ],
  },
]

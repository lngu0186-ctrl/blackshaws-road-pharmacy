// Single source of truth for pharmacy contact details and opening hours.
// TODO(owner): confirm the contact email domain (blackshawsroadpharmacy.com.au vs blackshawspharmacy.com.au)
// and the mobile number before launch.

export interface DayHours {
  day: string
  /** Minutes since midnight */
  openMin: number
  closeMin: number
  openLabel: string
  closeLabel: string
}

export const pharmacyInfo = {
  name: 'Blackshaws Road Pharmacy',
  address: '310A Blackshaws Road, Altona North VIC 3025',
  addressShort: '310A Blackshaws Road, Altona North',
  phone: '(03) 9391 3257',
  phoneHref: 'tel:+61393913257',
  mobile: '0406 692 267',
  mobileHref: 'tel:+61406692267',
  email: 'online@blackshawsroadpharmacy.com.au',
  parking: 'Parking available on Blackshaws Road',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=310A+Blackshaws+Road+Altona+North+VIC+3025',
  vaccinationBookingUrl: 'https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist',
}

// Index 0 = Sunday, matching Date.getDay()
export const weeklyHours: DayHours[] = [
  { day: 'Sunday', openMin: 8 * 60, closeMin: 13 * 60, openLabel: '8:00 am', closeLabel: '1:00 pm' },
  { day: 'Monday', openMin: 8 * 60, closeMin: 20 * 60, openLabel: '8:00 am', closeLabel: '8:00 pm' },
  { day: 'Tuesday', openMin: 8 * 60, closeMin: 20 * 60, openLabel: '8:00 am', closeLabel: '8:00 pm' },
  { day: 'Wednesday', openMin: 8 * 60, closeMin: 20 * 60, openLabel: '8:00 am', closeLabel: '8:00 pm' },
  { day: 'Thursday', openMin: 8 * 60, closeMin: 20 * 60, openLabel: '8:00 am', closeLabel: '8:00 pm' },
  { day: 'Friday', openMin: 8 * 60, closeMin: 20 * 60, openLabel: '8:00 am', closeLabel: '8:00 pm' },
  { day: 'Saturday', openMin: 8 * 60, closeMin: 14 * 60, openLabel: '8:00 am', closeLabel: '2:00 pm' },
]

/** Hours ordered Monday first, for display tables. */
export const displayHours: DayHours[] = [...weeklyHours.slice(1), weeklyHours[0]]

export const hoursSummary = [
  { label: 'Monday to Friday', value: '8:00 am to 8:00 pm' },
  { label: 'Saturday', value: '8:00 am to 2:00 pm' },
  { label: 'Sunday', value: '8:00 am to 1:00 pm' },
]

export interface OpenStatus {
  isOpen: boolean
  /** Short human label, e.g. "Open now, closes 9:00 pm" or "Closed, opens 8:00 am" */
  label: string
  todayHours: DayHours
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const today = weeklyHours[now.getDay()]
  const minutes = now.getHours() * 60 + now.getMinutes()

  if (minutes >= today.openMin && minutes < today.closeMin) {
    return { isOpen: true, label: `Open now, closes ${today.closeLabel}`, todayHours: today }
  }
  if (minutes < today.openMin) {
    return { isOpen: false, label: `Closed, opens ${today.openLabel} today`, todayHours: today }
  }
  const tomorrow = weeklyHours[(now.getDay() + 1) % 7]
  return { isOpen: false, label: `Closed, opens ${tomorrow.openLabel} tomorrow`, todayHours: today }
}

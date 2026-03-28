'use client'

import { MapPin, Phone, Clock, Car } from 'lucide-react'
import { Button } from '../ui/Button'

const hours = [
  { day: 'Monday', open: '8:00 AM', close: '9:00 PM' },
  { day: 'Tuesday', open: '8:00 AM', close: '9:00 PM' },
  { day: 'Wednesday', open: '8:00 AM', close: '9:00 PM' },
  { day: 'Thursday', open: '8:00 AM', close: '9:00 PM' },
  { day: 'Friday', open: '8:00 AM', close: '9:00 PM' },
  { day: 'Saturday', open: '8:00 AM', close: '6:00 PM' },
  { day: 'Sunday', open: '10:00 AM', close: '5:00 PM' },
]

const pharmacyInfo = {
  address: '310A Blackshaws Road, Altona North VIC 3025',
  phone: '(03) 9391 3257',
  mobile: '0406 692 267',
  email: 'info@blackshawsroadpharmacy.com.au',
  parking: 'Free parking available at the rear of the pharmacy',
}

export function LocationSection() {
  return (
    <section id="location" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden border-2 border-[var(--color-gray-200)] shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.8235793153158!3d-37.87324797975917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64e7c4ab2b3b5%3A0x504567521000ce1!2s310A%20Blackshaws%20Rd%2C%20Altona%20North%20VIC%203025!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blackshaws Road Pharmacy location"
            />
          </div>

          {/* Contact info */}
          <div>
            <p className="section-label" style={{ color: 'var(--color-red)' }}>VISIT US</p>
            <h2 className="mb-8" style={{ color: 'var(--color-navy)' }}>
              Find us in Altona North
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-navy)/10' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: 'var(--color-navy)' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--color-navy)' }}>Address</h4>
                  <p className="text-[var(--color-gray-600)] whitespace-pre-line">{pharmacyInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-navy)/10' }}
                >
                  <Phone className="w-5 h-5" style={{ color: 'var(--color-navy)' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--color-navy)' }}>Phone</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:0393913257"
                      className="text-lg font-semibold hover:underline block"
                      style={{ color: 'var(--color-navy)' }}
                    >
                      Ph: (03) 9391 3257
                    </a>
                    <a
                      href="tel:0406692267"
                      className="text-lg font-semibold hover:underline block"
                      style={{ color: 'var(--color-navy)' }}
                    >
                      M: 0406 692 267
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-navy)/10' }}
                >
                  <Clock className="w-5 h-5" style={{ color: 'var(--color-navy)' }} />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold mb-3" style={{ color: 'var(--color-navy)' }}>Opening Hours</h4>
                  <div className="space-y-2">
                    {hours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between text-sm border-b border-[var(--color-gray-200)] pb-2"
                      >
                        <span className="text-[var(--color-gray-600)] font-medium">{item.day}</span>
                        <span className="font-semibold" style={{ color: 'var(--color-navy)' }}>
                          {item.open} – {item.close}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-navy)/10' }}
                >
                  <Car className="w-5 h-5" style={{ color: 'var(--color-navy)' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--color-navy)' }}>Parking</h4>
                  <p className="text-[var(--color-gray-600)]">{pharmacyInfo.parking}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild>
                <a href="tel:0393913257">Call Now</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.google.com/maps/dir/?api=1&destination=310A+Blackshaws+Road+Altona+North+VIC+3025" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
              <Button variant="primary" size="lg" style={{ backgroundColor: 'var(--color-red)' }} asChild>
                <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer">
                  Book Vaccination
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

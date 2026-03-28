import { Link } from 'react-router-dom'
import { Phone, Calendar, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/Button'
import type { Service } from '../data/services'

interface BookingCTAProps {
  service?: Service
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function BookingCTA({
  service,
  variant = 'primary',
  size = 'md',
  className = '',
}: BookingCTAProps) {
  const phoneNumber = '0393913257'
  const formattedPhone = '(03) 9391 3257'

  const content = (
    <div
      className={`booking-cta rounded-2xl p-8 md:p-10 ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #1a2744 100%)',
      }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {service
              ? `Book Your ${service.title} Appointment`
              : 'Book a Health Service Today'}
          </h3>
          <p className="opacity-90 mb-6">
            {service
              ? 'Our qualified pharmacists are ready to help you. Book online, call us, or walk in.'
              : 'Our friendly pharmacy team is here to help with all your health needs. Most services are walk-in or bookable online.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" style={{ color: 'var(--color-red)' }} />
              <span>{formattedPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: 'var(--color-red)' }} />
              <span>Walk-ins welcome</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--color-red)' }} />
              <span>No Medicare required</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
          <a href={`tel:${phoneNumber}`} className="inline-block">
            <Button
              variant={variant}
              size={size}
              className="w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
          {service && (
            <Link to="/services">
              <Button
                variant="outline"
                size={size}
                className="w-full sm:w-auto !text-white !border-white hover:!bg-white hover:!text-[var(--color-navy)]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View All Services
              </Button>
            </Link>
          )}
          {!service && (
            <Link to="/services">
              <Button
                variant="outline"
                size={size}
                className="w-full sm:w-auto !text-white !border-white hover:!bg-white hover:!text-[var(--color-navy)]"
              >
                Explore Services
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  return content
}

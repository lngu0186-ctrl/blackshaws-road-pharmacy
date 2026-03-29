import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { BrandLogo } from '../BrandLogo'
import { Clock3, MapPin, Phone } from 'lucide-react'
const iphoneFrame = '/iphone-frame.png'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      <div className="absolute inset-0">
        <img
          src="/hero-pharmacy.webp"
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/68 md:bg-[var(--color-navy-deep)]/58" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,24,63,0.82)_0%,rgba(16,24,63,0.5)_50%,rgba(16,24,63,0.32)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,14,38,0.5)_100%)]" />
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[var(--color-red)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-18 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="badge-red">EST. 1968</span>
              <span className="badge-soft">Alliance Pharmacy member</span>
            </div>

            <div className="mt-7">
              <BrandLogo variant="light" className="h-18 w-auto md:h-24" style={{ maxWidth: '330px' }} />
            </div>

            <h1 className="mt-8 max-w-4xl text-white">Premium everyday pharmacy care for Altona North and the west.</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/78 md:text-xl">Prescriptions, trusted pharmacist advice, vaccinations, medication reviews and a curated online health range — all delivered with the calm confidence of a long-standing local pharmacy.</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/76">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><MapPin className="h-4 w-4" /> 310A Blackshaws Road, Altona North</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2"><Clock3 className="h-4 w-4" /> Open 7 days</span>
              <a href="tel:0393913257" className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 hover:bg-white/8"><Phone className="h-4 w-4" /> (03) 9391 3257</a>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/shop"><Button variant="red" size="lg">Shop online now</Button></Link>
              <a href="https://www.medadvisor.com.au/Network/BlackshawsRoadNightChemist" target="_blank" rel="noopener noreferrer"><Button variant="ghost" size="lg" className="text-white hover:bg-white/10">Book a vaccination</Button></a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-[320px]">
              <img
                src={iphoneFrame}
                alt=""
                role="presentation"
                className="relative z-10 w-full h-auto pointer-events-none select-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
              />
              <div className="absolute z-0 overflow-hidden overflow-y-auto"
                style={{
                  top: '3.8%',
                  left: '5.8%',
                  right: '5.8%',
                  bottom: '3.8%',
                  borderRadius: '38px',
                }}>
                <div className="h-full w-full bg-white flex flex-col">
                  <div className="h-12 shrink-0" />

                  <div className="px-5 pb-5 flex flex-col flex-1 text-[var(--color-text-dark)]">
                    <div className="text-center mb-4">
                      <h3 className="text-[1rem] leading-tight font-bold text-[var(--color-navy-deep)]" style={{ fontFamily: 'var(--font-display)' }}>
                        Blackshaws Road<br />Pharmacy
                      </h3>
                      <p className="mt-1.5 text-[0.65rem] leading-snug text-[var(--color-text-muted)]">
                        310A Blackshaws Road<br />
                        Altona North<br />
                        Victoria 3025
                      </p>
                      <p className="mt-2 text-[0.6rem] text-[var(--color-navy)]" style={{ fontWeight: 600 }}>
                        Give us a call on{' '}
                        <span className="text-[var(--color-red)]">03 9391 3257</span>
                      </p>
                    </div>

                    <div className="h-px bg-[var(--color-border)] my-2" />

                    <div className="mb-3">
                      <p className="text-[0.7rem] font-bold text-[var(--color-navy-deep)] mb-1">Do you have an ePrescription?</p>
                      <p className="text-[0.55rem] leading-relaxed text-[var(--color-text-muted)]">
                        EMAIL us a copy of your prescription. Please note that if it is a paper prescription we will require the original hard-copy upon collection of the medication.
                      </p>
                      <p className="text-[0.55rem] leading-relaxed text-[var(--color-text-muted)] mt-1.5">
                        Alternatively TEXT/SMS us a copy of your ESCRIPT link.
                      </p>
                    </div>

                    <div className="rounded-xl bg-[var(--color-navy-soft)] p-3 mb-3">
                      <div className="space-y-1 text-[0.55rem] text-[var(--color-text-dark)]">
                        <p><span className="font-semibold text-[var(--color-navy)]">Phone:</span> 03 9391 3257</p>
                        <p><span className="font-semibold text-[var(--color-navy)]">Fax:</span> 03 9391 8099</p>
                        <p><span className="font-semibold text-[var(--color-navy)]">Mobile:</span> 0406 692 267</p>
                        <p><span className="font-semibold text-[var(--color-navy)]">Email:</span> <span className="text-[var(--color-red)]">online@blackshawsroadpharmacy.com.au</span></p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[var(--color-cream)] p-3 mb-4">
                      <p className="text-[0.6rem] font-bold text-[var(--color-navy-deep)] mb-1.5">Opening Hours</p>
                      <div className="space-y-0.5 text-[0.55rem] text-[var(--color-text-muted)]">
                        <div className="flex justify-between"><span>Monday – Friday</span><span className="font-semibold text-[var(--color-text-dark)]">8am – 8pm</span></div>
                        <div className="flex justify-between"><span>Saturday</span><span className="font-semibold text-[var(--color-text-dark)]">8am – 2pm</span></div>
                        <div className="flex justify-between"><span>Sunday</span><span className="font-semibold text-[var(--color-text-dark)]">8am – 1pm</span></div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link to="/upload-prescription" className="block">
                        <button className="w-full rounded-full py-2.5 text-[0.7rem] font-bold text-white bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] transition-colors shadow-[0_8px_20px_-8px_rgba(192,57,43,0.6)]">
                          Upload Prescription
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 text-center">
            <p className="text-sm text-white/80 mb-4">Have an ePrescription? Upload it now and we'll have it ready for collection.</p>
            <Link to="/upload-prescription">
              <Button variant="red" size="lg" className="w-full">Upload Prescription</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock3, Calendar, Share2 } from 'lucide-react'
import { BrandSignature } from '../components/layout/BrandSignature'

interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

const articles: Record<string, Article> = {
  'when-to-see-pharmacist-vs-gp': {
    slug: 'when-to-see-pharmacist-vs-gp',
    title: 'When Should You See a Pharmacist vs. a GP?',
    excerpt: 'Not sure whether your symptoms need a doctor or whether a pharmacist can help?',
    date: '2026-04-01',
    readTime: '5 min read',
    category: 'General Health',
    content: `
<p>When you're unwell or have a health concern, knowing whether to see a pharmacist or book a GP appointment can save you time, money, and unnecessary worry. Both professionals play vital but different roles in the healthcare system.</p>

<h2>What pharmacists can help with</h2>
<p>Pharmacists are highly trained medication experts who can assess and treat many common, minor conditions. In Victoria, the Chemist Care Now program allows accredited pharmacists to provide treatment for:</p>
<ul>
  <li><strong>Urinary tract infections (UTIs)</strong> — assessment and antibiotic supply where appropriate</li>
  <li><strong>Contraceptive pill resupply</strong> — continuing supply for women with an existing prescription</li>
  <li><strong>Shingles</strong> — antiviral treatment for adults 18+</li>
  <li><strong>Impetigo (school sores)</strong> — topical or oral antibiotic treatment</li>
  <li><strong>Minor skin infections</strong> — assessment and treatment advice</li>
  <li><strong>Cold and flu symptoms</strong> — symptom management and product recommendations</li>
</ul>
<p>Pharmacists can also provide vaccination services, health checks (blood pressure, cholesterol, blood glucose), medication reviews (MedsCheck), and advice on over-the-counter medicines.</p>

<h2>When to see a GP instead</h2>
<p>You should see a GP (or seek urgent care) when:</p>
<ul>
  <li>Your symptoms are severe, worsening, or have lasted more than a few days</li>
  <li>You need a formal diagnosis for a new or complex condition</li>
  <li>You require medical certificates for extended absence from work (pharmacists can issue certificates for 1–2 days in Victoria)</li>
  <li>You have a chronic condition that needs ongoing management and specialist referrals</li>
  <li>You need pathology requests, imaging referrals, or specialist letters</li>
  <li>You are pregnant and experiencing new or unusual symptoms</li>
</ul>

<h2>The pharmacist-first approach</h2>
<p>For many everyday health issues, starting with a pharmacist is the fastest, most convenient option. Our team can assess your condition, recommend treatment, and refer you to a GP when needed. This avoids unnecessary GP appointments and gets you the right care at the right time.</p>
<p>If you're ever unsure, call us on <a href="tel:0393913257">(03) 9391 3257</a> and we'll guide you to the right service.</p>

<div class="bg-red-50 border border-red-100 rounded-xl p-6 mt-8">
  <h3 class="text-red-700 font-semibold mb-2">When to seek emergency care</h3>
  <p class="text-sm text-gray-700">If you experience chest pain, difficulty breathing, severe allergic reaction, sudden weakness, or any life-threatening symptom, call 000 immediately or go to the nearest emergency department.</p>
</div>
    `.trim(),
  },
  'flu-vaccination-why-annual': {
    slug: 'flu-vaccination-why-annual',
    title: 'Flu Vaccination: Why Annual Shots Matter',
    excerpt: 'The flu virus changes every year.',
    date: '2026-03-28',
    readTime: '6 min read',
    category: 'Preventive Health',
    content: `
<p>Influenza (the flu) is a highly contagious viral infection that causes severe illness in thousands of Australians every year. Annual vaccination is the most effective way to protect yourself and your community.</p>

<h2>Why do I need a flu vaccine every year?</h2>
<p>Unlike some vaccines that provide lifelong immunity, the flu vaccine needs to be updated annually for two key reasons:</p>
<ol>
  <li><strong>The flu virus mutates.</strong> Influenza strains change from year to year. Each year's vaccine is formulated to protect against the four strains predicted to be most common in the upcoming flu season.</li>
  <li><strong>Immunity wanes over time.</strong> Protection from the flu vaccine declines after 6–12 months. An annual shot ensures you remain protected throughout the flu season.</li>
</ol>

<h2>Who should get the flu vaccine?</h2>
<p>The Australian Technical Advisory Group on Immunisation (ATAGI) recommends annual flu vaccination for everyone aged 6 months and over. It is especially important for:</p>
<ul>
  <li>Adults aged 65 and over</li>
  <li>Pregnant women (any stage of pregnancy)</li>
  <li>Aboriginal and Torres Strait Islander people aged 6 months and over</li>
  <li>People with certain medical conditions (asthma, diabetes, heart disease, chronic lung disease)</li>
  <li>Healthcare workers and carers</li>
</ul>

<h2>When is the best time to get vaccinated?</h2>
<p>Flu season in Australia typically runs from June to September. The ideal time to vaccinate is <strong>April or May</strong>, which ensures protection through the peak months. However, getting vaccinated at any time during the season is better than not getting vaccinated at all.</p>

<h2>Is the flu vaccine free?</h2>
<p>Yes, for eligible groups under the National Immunisation Program (NIP). This includes adults 65+, pregnant women, young children, Aboriginal and Torres Strait Islander people, and those with certain medical conditions. For others, the vaccine typically costs $20–30 at most community pharmacies, including Blackshaws Road Pharmacy.</p>

<p>Book your flu vaccination at Blackshaws Road Pharmacy by calling <a href="tel:0393913257">(03) 9391 3257</a> or walking in during store hours.</p>
    `.trim(),
  },
  'managing-high-blood-pressure': {
    slug: 'managing-high-blood-pressure',
    title: 'Managing High Blood Pressure at Home',
    excerpt: 'High blood pressure affects one in three Australian adults.',
    date: '2026-03-25',
    readTime: '7 min read',
    category: 'Chronic Conditions',
    content: `
<p>High blood pressure (hypertension) is often called the "silent killer" because it rarely causes obvious symptoms but significantly increases your risk of heart attack, stroke, and kidney disease. Managing it effectively requires a combination of lifestyle changes, regular monitoring, and, where needed, medication.</p>

<h2>What is a healthy blood pressure?</h2>
<p>For most adults, a healthy blood pressure is below <strong>120/80 mmHg</strong>. Blood pressure between 120–139/80–89 mmHg is considered "elevated" and warrants lifestyle changes. Readings consistently above 140/90 mmHg typically require medical intervention.</p>

<h2>Lifestyle changes that help</h2>
<ul>
  <li><strong>Reduce salt intake.</strong> Aim for less than 5g (one teaspoon) of salt per day. Avoid processed foods, canned soups, and salty snacks.</li>
  <li><strong>Exercise regularly.</strong> At least 150 minutes of moderate-intensity exercise per week (brisk walking, cycling, swimming) can lower blood pressure by 5–8 mmHg.</li>
  <li><strong>Maintain a healthy weight.</strong> Losing even 5–10% of your body weight can significantly reduce blood pressure.</li>
  <li><strong>Limit alcohol.</strong> No more than two standard drinks per day for men, one for women.</li>
  <li><strong>Stop smoking.</strong> Smoking constricts blood vessels and raises blood pressure. Quitting is one of the most impactful changes you can make.</li>
  <li><strong>Manage stress.</strong> Chronic stress contributes to elevated blood pressure. Practice relaxation techniques, get enough sleep, and seek support when needed.</li>
</ul>

<h2>Monitoring at home</h2>
<p>Home blood pressure monitors are widely available and can help you track your readings over time. Our pharmacists can recommend validated devices and show you how to use them correctly. Bring your readings to your next GP or pharmacy visit for review.</p>

<h2>When medication is needed</h2>
<p>If lifestyle changes alone don't bring your blood pressure into a healthy range, your GP may prescribe antihypertensive medications. Common options include ACE inhibitors, calcium channel blockers, diuretics, and beta blockers. Our pharmacists can explain how these work, discuss side effects, and help you manage your regimen.</p>

<p>Visit Blackshaws Road Pharmacy for free blood pressure checks or to discuss your hypertension management plan. Call <a href="tel:0393913257">(03) 9391 3257</a> to book.</p>
    `.trim(),
  },
}

export default function LearnArticle() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (slug && articles[slug]) {
      const a = articles[slug]
      setArticle(a)
      document.title = `${a.title} | Blackshaws Road Pharmacy`

      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      }
      metaDescription.content = a.excerpt

      let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.name = 'robots'
        document.head.appendChild(metaRobots)
      }
      metaRobots.content = 'index, follow'
    }
  }, [slug])

  if (!article) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4 text-[var(--color-navy)]">Article Not Found</h1>
            <p className="text-[var(--color-text-muted)] mb-6">The article you're looking for doesn't exist or hasn't been published yet.</p>
            <Link to="/learn" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-navy-deep)] transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Health Library
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-cream)]">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Link to="/" className="hover:text-[var(--color-navy)]">Home</Link>
          <span>/</span>
          <Link to="/learn" className="hover:text-[var(--color-navy)]">Health Library</Link>
          <span>/</span>
          <span className="text-[var(--color-navy)] font-medium truncate">{article.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="section-padding-lg bg-[linear-gradient(135deg,var(--color-navy-deep),var(--color-navy))] text-white">
        <div className="container-custom max-w-4xl">
          <span className="inline-block rounded-full bg-[var(--color-red)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]">
            {article.category}
          </span>
          <h1 className="mt-5 text-white">{article.title}</h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(article.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" /> {article.readTime}</span>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{article.excerpt}</p>
          <div className="mt-6">
            <BrandSignature tone="dark" className="max-w-xl" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <article className="prose prose-lg max-w-none prose-headings:text-[var(--color-navy)] prose-a:text-[var(--color-red)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--color-navy)]" dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Share / CTA */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)] transition-colors">
                  <Share2 className="h-4 w-4" /> Share this article
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:0393913257" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-red)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-red-hover)] transition-colors">
                  Call (03) 9391 3257
                </a>
                <Link to="/learn" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-navy-soft)] transition-colors">
                  <ArrowLeft className="h-4 w-4" /> More articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

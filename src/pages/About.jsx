import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useModal } from '../hooks/useModal.jsx';
import './About.css';

const LinkedinIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const VALUES = [
  {
    title: 'Technical Integrity',
    desc: 'We deliver realistic labs that challenge student capacities rather than simple certificates of attendance.',
    practice: '95% of the syllabus maps to sandbox terminals and live topologies.',
    accent: '#7dd3fc',
  },
  {
    title: 'Inclusive Growth',
    desc: 'We dedicate scholarship portions and entry points to bridge gender gaps in cybersecurity and machine learning.',
    practice: 'Scholarship portions and beginner-friendly entry points in every intake.',
    accent: '#35d08a',
  },
  {
    title: 'Global Outlook',
    desc: 'Our training modules mirror curriculum standards expected by major international employers.',
    practice: 'Curriculum mapped to Cisco, EC-Council, and AWS certification paths.',
    accent: '#f4b63f',
  },
];

const FACULTY = [
  { initials: 'JM', name: 'John Mutunga', role: 'CEO & Founder, Cyberpro Global', creds: '', linkedin: 'https://www.linkedin.com/in/john-mutunga-242a7216/', img: '/images/faculty/Joe.png' },
  { initials: 'PO', name: 'Preston Odera', role: 'Executive Chairman', creds: '', linkedin: 'https://www.linkedin.com/in/preston-odera-06b72516/', img: '/images/faculty/odera.png' },
  { initials: 'OP', name: 'Orifah W. WYDLER Peter', role: 'Director, Cyberpro', creds: 'MSc ITM, ITIL, PRINCE2, CEH, CISM, CHFI, CISA', linkedin: 'https://www.linkedin.com/in/orifah-w-wydler-peter-msc-itm-itil-prince2-ceh-cism-chfi-cisa-01a90117/', img: '/images/faculty/orife.png' },
  { initials: 'BK', name: 'Benta Kamau', role: 'Director, AI Strategy, Governance & Digital Risk', creds: 'LLB, PgDL', linkedin: 'https://www.linkedin.com/in/benta-kamau/', img: '/images/faculty/benta.png' },
  { initials: 'MO', name: 'Martine Osike', role: 'Chief Technology Officer (CTO)', creds: '', linkedin: 'https://www.linkedin.com/in/martine-osike-636625b9/', img: '/images/faculty/martine.png' },
  { initials: 'MM', name: 'Mathew Mwakoma', role: 'Marketing Officer', creds: '', linkedin: 'https://www.linkedin.com/in/mathew-mwakoma-b167b9290', img: '/images/faculty/mathew.png' },
  { initials: 'JMu', name: 'Jeniffer Mutave', role: 'Business Manager', creds: '', linkedin: 'https://www.linkedin.com/in/jeniffer-mutave/', img: '/images/faculty/Jani.png' },
  { initials: 'CM', name: 'Christian Munene', role: 'Marketing lead', creds: '', linkedin: 'https://www.linkedin.com/in/christian-munene-54623a2b7/', img: '/images/faculty/munene.png' },
  { initials: 'JM', name: 'Mwera M. Alex', role: 'AI & Data Engineer', creds: '', linkedin: 'https://www.linkedin.com/in/alex-mwera-222256y/', img: '/images/faculty/alex.png' },
  { initials: 'SM', name: 'Sandra Brenda (Muriuki) Mukami Huma', role: 'Head of Human Resource', creds: '', linkedin: 'https://www.linkedin.com/in/sandra-brenda-mukami-612735307/', img: '/images/faculty/Sandra.png' },
  { initials: 'ES', name: 'Emmaculate Chepkoech', role: 'UON Branch Manager', creds: '', linkedin: 'https://www.linkedin.com/in/emma-sybl-4004b5283' },
  { initials: 'KE', name: 'Emmanuel Kiptum', role: 'Software Engineer', creds: '', linkedin: '#', img: '' },
];

const STORY_CHAPTERS = [
  { num: '01', title: 'The Mission', copy: 'Bridging the gap between exponential technology and practical education.', img: '/images/cyberpro_story/1.jpeg' },
  { num: '02', title: 'The Academy', copy: 'Certification-aligned programs across security, cloud, AI, and governance.', img: '/images/cyberpro_story/10.jpeg' },
  { num: '03', title: 'The Labs', copy: 'Live-fire sandbox environments where practice beats theory.', img: '/images/cyberpro_story/5.jpeg' },
  { num: '04', title: 'The Community', copy: 'Learners, partners, and researchers building Africa\u2019s digital resilience together.', img: '/images/cyberpro_story/8.jpeg' },
];

export default function About() {
  const { openModal } = useModal();

  return (
    <div>
      {/* Dark Hero */}
      <section className="about-hero">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="about-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About</span></div>
            <h1 className="about-hero__title">Our Mission &amp; Leadership</h1>
            <p className="about-hero__desc">Establishing Africa's premier technology academy with global standards of training excellence.</p>
            <div className="about-hero__chips">
              <span className="about-chip"><Building2 size={14} aria-hidden="true" />45+ partner organizations</span>
              <span className="about-chip"><Users size={14} aria-hidden="true" />1,500+ learners trained</span>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '64px' }}>
            <ScrollReveal>
              <div>
                <span className="section-label">Our Purpose</span>
                <h2 className="section-title">Why Cyberpro Global Exists</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                  Technology is developing at an exponential rate. However, practical education systems remain isolated. Cyberpro Global bridges this divide by providing sandbox-centric, certification-aligned training that produces job-ready specialists.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  We teach engineers to think analytically, secure enterprise infrastructures, deploy scalable models, and lead regional technology hubs.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="about-commitments">
                <h3 className="about-commitments__title">Our Commitments</h3>
                <ul className="about-commitments__list">
                  <li>
                    <strong>Hands-on Labs First</strong>
                    <span>95% of our syllabus maps to sandbox terminals and topology builds.</span>
                  </li>
                  <li>
                    <strong>Accreditation Mapping</strong>
                    <span>Curriculums prepare students for Cisco, EC-Council, and AWS certifications.</span>
                  </li>
                  <li>
                    <strong>Mentorship Guarantee</strong>
                    <span>Weekly calls with active tech leads from major enterprises.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Cyberpro Story — chapters in real photos */}
      <section className="section about-story-section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">The Cyberpro Story</span>
              <h2 className="section-title">Four chapters, one mission</h2>
              <p className="section-subtitle">How a practical idea became Africa&rsquo;s training ground for defenders.</p>
            </div>
          </ScrollReveal>
          <div className="story-chapters">
            {STORY_CHAPTERS.map((chapter, i) => (
              <ScrollReveal key={chapter.num} delay={i * 0.08}>
                <article className="story-chapter" style={{ '--chapter-accent': ['#7dd3fc', '#b18cff', '#ff5f6f', '#f4b63f'][i] }}>
                  <div className="story-chapter__photo">
                    <img src={chapter.img} alt={chapter.title} loading="lazy" />
                    <span className="story-chapter__num">{chapter.num}</span>
                  </div>
                  <div className="story-chapter__body">
                    <h3 className="story-chapter__title">{chapter.title}</h3>
                    <p className="story-chapter__copy">{chapter.copy}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Core Values</span>
              <h2 className="section-title">What Drives Our Work</h2>
              <p className="section-subtitle">Three commitments that show up in every syllabus, intake, and partnership.</p>
            </div>
          </ScrollReveal>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="value-card" style={{ '--value-accent': v.accent }}>
                  <div className="value-card__numrow">
                    <span className="value-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="value-card__numrule" aria-hidden="true" />
                  </div>
                  <h3 className="card-title">{v.title}</h3>
                  <p className="card-desc">{v.desc}</p>
                  <div className="value-card__practice">
                    <span className="value-card__practice-label">In practice</span>
                    <span className="value-card__practice-text">{v.practice}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section about-faculty">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Academy Faculty</span>
              <h2 className="section-title">Led by Industry Professionals</h2>
              <p className="section-subtitle">Learn from certified instructors, researchers, and active cloud security directors.</p>
            </div>
          </ScrollReveal>
          <div className="faculty-marquee-container">
            <div className="faculty-marquee">
              {/* Double array for infinite scroll */}
              {[...FACULTY, ...FACULTY].map((f, i) => (
                <div className="faculty-card" key={i}>
                  <div className="faculty-avatar">
                    {f.img ? <img src={f.img} alt={f.name} loading="lazy" /> : <span>{f.initials}</span>}
                  </div>
                  <h3>{f.name}</h3>
                  <p className="faculty-role">{f.role}</p>
                  {f.creds && <p className="faculty-creds">{f.creds}</p>}
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="faculty-linkedin" aria-label={`LinkedIn for ${f.name}`}>
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="about-cta">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <ScrollReveal>
            <span className="about-cta__kicker">Join the academy</span>
            <h2>Build a Career That Matters</h2>
            <p>Start your journey with Cyberpro Global and train where Africa&apos;s defenders are built.</p>
            <div className="flex-center gap-4">
              <button type="button" onClick={() => openModal()} className="btn btn-primary btn-lg">Apply Now <ArrowRight size={18} /></button>
              <Link to="/programs" className="btn about-cta__ghost btn-lg">Explore Programs</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

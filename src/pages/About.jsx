import { Link } from 'react-router-dom';
import { Target, Heart, Globe, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
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
  { icon: Target, title: 'Technical Integrity', desc: 'We deliver realistic labs that challenge student capacities rather than simple certificates of attendance.' },
  { icon: Heart, title: 'Inclusive Growth', desc: 'We dedicate scholarship portions and entry points to bridge gender gaps in cybersecurity and machine learning.' },
  { icon: Globe, title: 'Global Outlook', desc: 'Our training modules mirror curriculum standards expected by major international employers.' },
];

const FACULTY = [
  { initials: 'JM', name: 'John Mutunga', role: 'CEO & Founder, CyberPro Global', creds: '', linkedin: 'https://www.linkedin.com/in/john-mutunga-242a7216/', img: '/images/faculty/Joe.png' },
  { initials: 'PO', name: 'Preston Odera', role: 'Executive Chairman', creds: '', linkedin: 'https://www.linkedin.com/in/preston-odera-06b72516/', img: '/images/faculty/odera.png' },
  { initials: 'OP', name: 'Orifah W. WYDLER Peter', role: 'Director, CyberPro', creds: 'MSc ITM, ITIL, PRINCE2, CEH, CISM, CHFI, CISA', linkedin: 'https://www.linkedin.com/in/orifah-w-wydler-peter-msc-itm-itil-prince2-ceh-cism-chfi-cisa-01a90117/', img: '/images/faculty/orife.png' },
  { initials: 'MO', name: 'Martine Osike', role: 'Chief Technology Officer (CTO)', creds: '', linkedin: 'https://www.linkedin.com/in/martine-osike-636625b9/', img: '/images/faculty/martine.png' },
  { initials: 'MM', name: 'Mathew Mwakoma', role: 'Chief Marketing Officer', creds: '', linkedin: 'https://www.linkedin.com/in/mathew-mwakoma-b167b9290', img: '/images/faculty/mathew.png' },
  { initials: 'SM', name: 'Sandra Brenda (Muriuki) Mukami Huma', role: 'Head of Human Resource', creds: '', linkedin: 'https://www.linkedin.com/in/sandra-brenda-mukami-612735307/', img: '/images/faculty/Sandra.png' },
  { initials: 'JMu', name: 'Jeniffer Mutave', role: 'Marketing Manager', creds: '', linkedin: 'https://www.linkedin.com/in/jeniffer-mutave/', img: '/images/faculty/Jani.png' },
  { initials: 'CM', name: 'Christian Munene', role: 'Business Manager', creds: '', linkedin: 'https://www.linkedin.com/in/christian-munene-54623a2b7/', img: '/images/faculty/munene.png' },
  { initials: 'NK', name: 'Nathan Kibet', role: 'Digital Forensics Analyst', creds: '', linkedin: 'https://www.linkedin.com/in/nathankib3t/', img: '/images/faculty/nathan.png' },
  { initials: 'AM', name: 'Alex M. Musira', role: 'AI & Data Engineer', creds: '', linkedin: 'https://www.linkedin.com/in/alex-mwera-222256y/', img: '/images/faculty/alex.png' },
  { initials: 'BK', name: 'Benta Kamau', role: 'Director, AI Strategy, Governance & Digital Risk', creds: 'LLB, PgDL', linkedin: 'https://www.linkedin.com/in/benta-kamau/', img: '/images/faculty/benta.png' },
  { initials: 'ES', name: 'Emma Sybl', role: 'UON Branch Manager', creds: '', linkedin: 'https://www.linkedin.com/in/emma-sybl-4004b5283' },
  { initials: 'EK', name: 'Esther (Wambui) Kiguru', role: 'Statistician & Researcher', creds: '', linkedin: 'https://www.linkedin.com/in/esther-kiguru-wambui/', img: '/images/faculty/esther.png' },
  { initials: 'KE', name: 'Emmanuel Kiptum', role: 'Software Engineer', creds: '', linkedin: '#', img: '' },
];

export default function About() {
  return (
    <div>
      {/* Dark Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About</span></div>
            <h1 className="about-hero__title">Our Mission & Leadership</h1>
            <p className="about-hero__desc">Establishing Africa's premier technology academy with global standards of training excellence.</p>
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
                <h2 className="section-title">Why CyberPro Global Exists</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                  Technology is developing at an exponential rate. However, practical education systems remain isolated. CyberPro Global bridges this divide by providing sandbox-centric, certification-aligned training that produces job-ready specialists.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  We teach engineers to think analytically, secure enterprise infrastructures, deploy scalable models, and lead regional technology hubs.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="card" style={{ background: 'var(--navy)', color: 'white', border: 'none', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'white' }}>Our Commitments</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px', listStyle: 'none', padding: 0 }}>
                  <li style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--primary)' }}>Hands-on Labs First</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>95% of our syllabus maps to sandbox terminals and topology builds.</span>
                  </li>
                  <li style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--primary)' }}>Accreditation Mapping</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Curriculums prepare students for Cisco, EC-Council, and AWS certifications.</span>
                  </li>
                  <li style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--primary)' }}>Mentorship Guarantee</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Weekly calls with active tech leads from major enterprises.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
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
            </div>
          </ScrollReveal>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="value-card">
                  <div className="value-icon"><v.icon size={24} /></div>
                  <h3 className="card-title">{v.title}</h3>
                  <p className="card-desc">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section">
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
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="about-cta">
        <div className="container">
          <ScrollReveal>
            <h2>Join the Academy</h2>
            <p>Start your journey with CyberPro Global and build a career that matters.</p>
            <div className="flex-center gap-4">
              <Link to="/programs" className="btn btn-white btn-lg">Explore Programs <ArrowRight size={18} /></Link>
              <Link to="/admissions" className="btn btn-outline btn-lg">Apply Now</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

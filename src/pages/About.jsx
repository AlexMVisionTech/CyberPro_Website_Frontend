import { Link } from 'react-router-dom';
import { Target, Heart, Globe, Award } from 'lucide-react';
import './Programs.css';

const VALUES = [
  { icon: Target, title: 'Technical Integrity', desc: 'We deliver realistic labs that challenge student capacities rather than simple certificates of attendance.' },
  { icon: Heart, title: 'Inclusive Growth', desc: 'We dedicate scholarship portions and entry points to bridge gender gaps in cybersecurity and machine learning.' },
  { icon: Globe, title: 'Global Outlook', desc: 'Our training modules mirror curriculum standards expected by major international employers.' },
];

const FACULTY = [
  { initials: 'PM', name: 'Dr. Philip Mulwa', role: 'Director of Academy & Research', creds: 'PhD CompSci • CISSP • CEH' },
  { initials: 'JO', name: 'Prof. Janet Okoth', role: 'Lead Faculty: AI Systems', creds: 'MSc Data Analytics • AWS ML' },
  { initials: 'EG', name: 'Dr. Eric Gitonga', role: 'Principal Instructor: Cloud', creds: 'CCIE Security • AWS SA Pro' },
  { initials: 'AM', name: 'Amina M.', role: 'Adjunct Researcher & Advisor', creds: 'BSc Computer Science • OSCP' },
];

export default function About() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About</span></div>
          <h1 className="page-hero__title">Our Mission & Leadership</h1>
          <p className="page-hero__desc">Establishing Africa's premier technology academy with global standards of training excellence.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '64px' }}>
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
            <div className="card" style={{ background: 'var(--bg-secondary)', border: 'none', padding: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--navy)' }}>Our Commitments</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
                <li><strong>Hands-on Labs First:</strong> 95% of our syllabus maps to sandbox terminals and topology builds.</li>
                <li><strong>Accreditation Mapping:</strong> Curriculums prepare students for Cisco, EC-Council, and AWS certifications.</li>
                <li><strong>Mentorship Guarantee:</strong> Weekly calls with active tech leads from Safaricom, Microsoft, and AWS.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Core Values</span>
            <h2 className="section-title">What Drives Our Work</h2>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div className="card" key={i}>
                <div className="program-icon"><v.icon size={22} /></div>
                <h3 className="card-title">{v.title}</h3>
                <p className="card-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Academy Faculty</span>
            <h2 className="section-title">Led by Industry Professionals</h2>
            <p className="section-subtitle">Learn from certified instructors, researchers, and active cloud security directors.</p>
          </div>
          <div className="faculty-grid">
            {FACULTY.map((f, i) => (
              <div className="card faculty-card" key={i}>
                <div className="faculty-avatar">{f.initials}</div>
                <h3>{f.name}</h3>
                <p className="faculty-role">{f.role}</p>
                <p className="faculty-creds">{f.creds}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

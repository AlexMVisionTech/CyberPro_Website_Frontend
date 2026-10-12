import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Globe2, Signal, BarChart3, Banknote, ExternalLink, BadgeCheck } from 'lucide-react';
import { CAT_LABELS, slugify, TIER_ACCENTS, TIER_ORDER } from './Programs';
import usePrograms from '../hooks/usePrograms';
import { useModal } from '../hooks/useModal.jsx';
import './ProgramDetail.css';

function PathwayStrip({ current }) {
  return (
    <div className="pd-pathway" aria-label="Learning pathway">
      {TIER_ORDER.map((cat, i) => (
        <div
          key={cat}
          className={`pd-pathway__step${cat === current ? ' pd-pathway__step--current' : ''}`}
          style={{ '--tier-accent': TIER_ACCENTS[cat] }}
        >
          <span className="pd-pathway__dot" aria-hidden="true" />
          <span className="pd-pathway__name">
            <em>{String(i + 1).padStart(2, '0')}</em> {CAT_LABELS[cat]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const { openModal } = useModal();
  const { programs, loading, error } = usePrograms();

  const program = programs.find(p => slug === `${slugify(p.title)}-${p.id}` || slug === slugify(p.title));
  const tierAccent = program ? TIER_ACCENTS[program.cat] : '#7dd3fc';

  if (loading) {
    return (
      <div className="program-detail">
        <section className="pd-hero">
          <div className="container">
            <div className="pd-hero__copy">
              <div className="program-skeleton__block program-skeleton__block--title" style={{ width: '40%', height: 22 }} />
              <div className="program-skeleton__block program-skeleton__block--text" style={{ width: '70%', height: 32 }} />
              <div className="program-skeleton__block program-skeleton__block--text" style={{ width: '55%' }} />
            </div>
          </div>
        </section>
        <section className="section"><div className="container">
          <div className="program-detail__grid">
            <div className="program-skeleton__block" style={{ height: 280 }} />
            <div className="program-skeleton__block" style={{ height: 280 }} />
          </div>
        </div></section>
      </div>
    );
  }

  if (error) return <div className="program-detail"><section className="page-hero"><div className="container"><h1 className="page-hero__title">Course unavailable</h1><p className="page-hero__desc">{error}</p></div></section></div>;

  if (!program) {
    return (
      <div className="program-detail">
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/programs">Programs</Link><span>/</span><span>Not Found</span></div>
            <h1 className="page-hero__title">Program Not Found</h1>
            <p className="page-hero__desc">The program you're looking for doesn't exist or has been removed.</p>
            <Link to="/programs" className="btn btn-primary" style={{ marginTop: '24px' }}>
              <ArrowLeft size={16} /> Back to Programs
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="program-detail">
      {/* Hero */}
      <section className="pd-hero">
        <div className="pd-hero__backdrop" aria-hidden="true">
          {program.img && <img src={program.img} alt="" />}
        </div>
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/programs">Programs</Link><span>/</span>
            <span>{program.title}</span>
          </div>
          <div className="program-detail__header pd-hero__copy">
            <span className="pd-hero__tier" style={{ '--tier-accent': tierAccent }}>
              <span className="pd-hero__tier-dot" aria-hidden="true" />
              {CAT_LABELS[program.cat]} tier
            </span>
            <h1 className="page-hero__title">{program.title}</h1>
            <p className="page-hero__desc">{program.desc}</p>
            <div className="pd-hero__chips">
              <span className="pd-chip"><Clock size={14} aria-hidden="true" />{program.dur}</span>
              <span className="pd-chip"><Signal size={14} aria-hidden="true" />{program.lvl}</span>
              <span className="pd-chip pd-chip--fee"><Banknote size={14} aria-hidden="true" />{program.fee}</span>
              <span className="pd-chip pd-chip--cert"><BadgeCheck size={14} aria-hidden="true" />{program.certs}</span>
            </div>
            <div className="program-detail__actions">
              <button onClick={() => openModal(program.title)} className="btn btn-primary btn-lg">
                Apply Now <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <Link to="/programs" className="btn pd-hero__ghost btn-lg">
                <ArrowLeft size={18} /> All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section">
        <div className="container">
          <PathwayStrip current={program.cat} />
          <div className="program-detail__grid">
            <div className="program-detail__main">
              <div className="section-label">Program Overview</div>
              <h2 className="section-title">About This Program</h2>
              <p className="program-detail__text">
                {program.desc}
              </p>
              <p className="program-detail__text">
                This program is part of Cyberpro Global's published catalog, organized under the {CAT_LABELS[program.cat]} tier.
                Availability, enrollment requirements, and cohort details can be confirmed through Cyberpro Global admissions.
              </p>

              <div className="section-label" style={{ marginTop: '40px' }}>What You'll Learn</div>
              <h2 className="section-title">Key Learning Areas</h2>
              <ul className="program-detail__list">
                <li><CheckCircle2 size={18} /> Core concepts in {program.certs.toLowerCase()}</li>
                <li><CheckCircle2 size={18} /> Hands-on practice in guided lab environments</li>
                <li><CheckCircle2 size={18} /> Current context across security, AI, governance, and privacy</li>
                <li><CheckCircle2 size={18} /> Skills aligned to the {program.lvl.toLowerCase()} course tier</li>
                <li><CheckCircle2 size={18} /> Enrollment and scheduling guidance from admissions</li>
              </ul>
            </div>

            <div className="program-detail__sidebar">
              <div className="program-detail__card pd-details-card">
                <h3 className="program-detail__card-title">Program Details</h3>
                <div className="program-detail__meta">
                  <div className="program-detail__meta-item">
                    <span className="pd-meta-icon"><Banknote size={17} aria-hidden="true" /></span>
                    <div>
                      <span className="program-detail__meta-label">Tuition Fee</span>
                      <span className="program-detail__meta-value pd-fee">{program.fee}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <span className="pd-meta-icon"><Clock size={17} aria-hidden="true" /></span>
                    <div>
                      <span className="program-detail__meta-label">Duration</span>
                      <span className="program-detail__meta-value">{program.dur}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <span className="pd-meta-icon"><Signal size={17} aria-hidden="true" /></span>
                    <div>
                      <span className="program-detail__meta-label">Level</span>
                      <span className="program-detail__meta-value">{program.lvl}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <span className="pd-meta-icon"><BarChart3 size={17} aria-hidden="true" /></span>
                    <div>
                      <span className="program-detail__meta-label">Certifications</span>
                      <span className="program-detail__meta-value">{program.certs}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <span className="pd-meta-icon"><Globe2 size={17} aria-hidden="true" /></span>
                    <div>
                      <span className="program-detail__meta-label">Source</span>
                      <a className="program-detail__source-link" href={program.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Cyberpro Global <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="program-detail__card program-detail__cta-card pd-cta-card">
                <h3 className="program-detail__card-title">Ready to Start?</h3>
                <p className="program-detail__cta-text">Take the first step toward your new career. Apply now and our admissions team will guide you through the process.</p>
                <button onClick={() => openModal(program.title)} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                  Apply Now
                </button>
                <Link to="/admissions" className="btn pd-cta-secondary" style={{ width: '100%', marginTop: '12px' }}>
                  Learn About Admissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

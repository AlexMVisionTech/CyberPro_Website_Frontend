import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Globe2, Signal, BarChart3, Banknote, ExternalLink } from 'lucide-react';
import { CAT_LABELS, slugify } from './Programs';
import usePrograms from '../hooks/usePrograms';
import { useModal } from '../hooks/useModal.jsx';
import './ProgramDetail.css';

export default function ProgramDetail() {
  const { slug } = useParams();
  const { openModal } = useModal();
  const { programs, loading, error } = usePrograms();

  const program = programs.find(p => slug === `${slugify(p.title)}-${p.id}` || slug === slugify(p.title));

  if (loading) return <div className="program-detail"><section className="page-hero"><div className="container"><h1 className="page-hero__title">Loading course…</h1></div></section></div>;
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
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/programs">Programs</Link><span>/</span>
            <span>{program.title}</span>
          </div>
          <div className="program-detail__header">
            <h1 className="page-hero__title">{program.title}</h1>
            <p className="page-hero__desc">{program.desc}</p>
            <div className="program-detail__actions">
              <button onClick={() => openModal(program.title)} className="btn btn-primary btn-lg">
                Apply Now <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <Link to="/programs" className="btn btn-outline btn-lg">
                <ArrowLeft size={18} /> All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section">
        <div className="container">
          <div className="program-detail__grid">
            <div className="program-detail__main">
              <div className="section-label">Program Overview</div>
              <h2 className="section-title">About This Program</h2>
              <p className="program-detail__text">
                {program.desc}
              </p>
              <p className="program-detail__text">
                This course is part of CyberPro Global's published catalog and is organized under the {CAT_LABELS[program.cat]} tier. 
                Course availability, enrollment requirements, and cohort details can be confirmed through CyberPro Global admissions.
              </p>

              <div className="section-label" style={{ marginTop: '40px' }}>What You'll Learn</div>
              <h2 className="section-title">Key Learning Areas</h2>
              <ul className="program-detail__list">
                <li><CheckCircle2 size={18} /> Core concepts for {program.certs.toLowerCase()}</li>
                <li><CheckCircle2 size={18} /> Practical application through CyberPro learning activities</li>
                <li><CheckCircle2 size={18} /> Current cybersecurity, AI, governance, and privacy context</li>
                <li><CheckCircle2 size={18} /> Skills aligned to the {program.lvl.toLowerCase()} course tier</li>
                <li><CheckCircle2 size={18} /> Admissions guidance for enrollment and course scheduling</li>
              </ul>
            </div>

            <div className="program-detail__sidebar">
              <div className="program-detail__card">
                <h3 className="program-detail__card-title">Program Details</h3>
                <div className="program-detail__meta">
                  <div className="program-detail__meta-item">
                    <Banknote size={20} />
                    <div>
                      <span className="program-detail__meta-label">Tuition Fee</span>
                      <span className="program-detail__meta-value">{program.fee}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <Clock size={20} />
                    <div>
                      <span className="program-detail__meta-label">Duration</span>
                      <span className="program-detail__meta-value">{program.dur}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <Signal size={20} />
                    <div>
                      <span className="program-detail__meta-label">Level</span>
                      <span className="program-detail__meta-value">{program.lvl}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <BarChart3 size={20} />
                    <div>
                      <span className="program-detail__meta-label">Certifications</span>
                      <span className="program-detail__meta-value">{program.certs}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <Globe2 size={20} />
                    <div>
                      <span className="program-detail__meta-label">Source</span>
                      <a className="program-detail__source-link" href={program.sourceUrl} target="_blank" rel="noopener noreferrer">
                        CyberPro Global <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="program-detail__card program-detail__cta-card">
                <h3 className="program-detail__card-title">Ready to Start?</h3>
                <p className="program-detail__cta-text">Take the first step toward your new career. Apply now and our admissions team will guide you through the process.</p>
                <button onClick={() => openModal(program.title)} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                  Apply Now
                </button>
                <Link to="/admissions" className="btn btn-outline" style={{ width: '100%', marginTop: '12px' }}>
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

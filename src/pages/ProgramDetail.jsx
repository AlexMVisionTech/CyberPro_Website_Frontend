import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Globe2, Signal, BarChart3 } from 'lucide-react';
import { PROGRAMS, CAT_LABELS } from './Programs';
import { useModal } from '../hooks/useModal.jsx';
import './ProgramDetail.css';

export default function ProgramDetail() {
  const { slug } = useParams();
  const { openModal } = useModal();

  const program = PROGRAMS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);

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
                This comprehensive program is designed to equip you with industry-relevant skills through hands-on projects, 
                expert instruction, and real-world case studies. You'll work with cutting-edge tools and technologies used by 
                leading organizations worldwide.
              </p>
              <p className="program-detail__text">
                Our curriculum is continuously updated to reflect the latest industry trends and certification requirements, 
                ensuring you graduate with credentials that employers recognize and value.
              </p>

              <div className="section-label" style={{ marginTop: '40px' }}>What You'll Learn</div>
              <h2 className="section-title">Key Learning Areas</h2>
              <ul className="program-detail__list">
                <li><CheckCircle2 size={18} /> Core principles and foundational knowledge</li>
                <li><CheckCircle2 size={18} /> Practical, hands-on project experience</li>
                <li><CheckCircle2 size={18} /> Industry-standard tools and platforms</li>
                <li><CheckCircle2 size={18} /> Certification exam preparation</li>
                <li><CheckCircle2 size={18} /> Career placement and mentorship support</li>
              </ul>
            </div>

            <div className="program-detail__sidebar">
              <div className="program-detail__card">
                <h3 className="program-detail__card-title">Program Details</h3>
                <div className="program-detail__meta">
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
                    <Globe2 size={20} />
                    <div>
                      <span className="program-detail__meta-label">Mode</span>
                      <span className="program-detail__meta-value">{program.mode}</span>
                    </div>
                  </div>
                  <div className="program-detail__meta-item">
                    <BarChart3 size={20} />
                    <div>
                      <span className="program-detail__meta-label">Certifications</span>
                      <span className="program-detail__meta-value">{program.certs}</span>
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

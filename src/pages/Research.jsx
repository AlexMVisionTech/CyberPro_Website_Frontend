import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, FileText, FlaskConical, Globe, ShieldCheck } from 'lucide-react';
import './Research.css';

const CLUSTERS = [
  { icon: FlaskConical, title: 'Adversarial Machine Learning', desc: 'Researching defense mechanisms against model poisoning, evasion attacks, and data backdoors in production AI systems.', lead: 'Dr. Philip Mulwa' },
  { icon: Globe, title: 'Critical Infrastructure Protection', desc: 'Developing security frameworks for SCADA systems, power grids, and IoT networks across East African institutions.', lead: 'Prof. Janet Okoth' },
  { icon: BookOpen, title: 'Privacy-Preserving Computation', desc: 'Advancing federated learning, differential privacy, and homomorphic encryption for healthcare and finance data.', lead: 'Dr. Eric Gitonga' },
];

const PUBLICATIONS = [
  { title: 'Adversarial Robustness in CNN-Based Malware Classifiers', authors: 'Mulwa, P. et al.', venue: 'IEEE Access, 2026', type: 'Journal' },
  { title: 'Zero-Trust Architecture Adoption in East African Financial Institutions', authors: 'Okoth, J. & Gitonga, E.', venue: 'ACM Computing Surveys, 2025', type: 'Journal' },
  { title: 'Federated Learning for Cross-Border Threat Intelligence Sharing', authors: 'Mulwa, P. & Amina, M.', venue: 'USENIX Security Symposium, 2025', type: 'Conference' },
  { title: 'IoT Firmware Vulnerability Analysis Using Automated Fuzzing', authors: 'Gitonga, E. et al.', venue: 'Black Hat Africa, 2025', type: 'Conference' },
];

export default function Research() {
  return (
    <div>
      <section className="cyber-hero-premium">
        <div className="container research-hero__inner">
          <div className="research-hero__copy">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Research</span>
            </div>
            <h1 className="page-hero__title">Research & Innovation</h1>
            <p className="page-hero__desc">Applied research in cybersecurity, AI safety, and critical infrastructure protection for institutions building resilient digital systems.</p>
            <div className="research-hero__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Partner With Us <ArrowRight size={18} /></Link>
              <a href="#publications" className="btn btn-outline btn-lg">View Publications</a>
            </div>
          </div>

          <div className="research-hero__panel" aria-label="Research focus">
            <span className="research-hero__panel-label">Applied research focus</span>
            <div className="research-hero__panel-row">
              <ShieldCheck size={22} />
              <span>Cyber defense</span>
            </div>
            <div className="research-hero__panel-row">
              <FlaskConical size={22} />
              <span>AI assurance</span>
            </div>
            <div className="research-hero__panel-row">
              <Globe size={22} />
              <span>Infrastructure resilience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section research-clusters-section">
        <div className="container">
          <div className="research-section-heading">
            <span className="section-label">Research Clusters</span>
            <h2 className="section-title">Active Research Initiatives</h2>
            <p className="section-subtitle">Interdisciplinary teams working on problems that matter to Africa and the world.</p>
          </div>
          <div className="research-grid">
            {CLUSTERS.map((c, i) => (
              <div className="research-card" key={i}>
                <div className="research-card__header">
                  <div className="research-card__icon"><c.icon size={22} /></div>
                  <span className="research-card__tag">Cluster</span>
                </div>
                <h3 className="research-card__title">{c.title}</h3>
                <p className="research-card__desc">{c.desc}</p>
                <div className="research-card__lead">
                  &gt; _LEAD: <span>{c.lead}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section publications-section" id="publications">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="research-section-heading">
            <span className="section-label">Publications</span>
            <h2 className="section-title">Selected Publications</h2>
            <p className="section-subtitle">Peer-reviewed research from our faculty across top-tier journals and conferences.</p>
          </div>
          <div className="publications-list">
            {PUBLICATIONS.map((pub, i) => (
              <div className="publication-card" key={i}>
                <div className="publication-icon">
                  <FileText size={22} />
                </div>
                <div className="publication-info">
                  <h4>{pub.title}</h4>
                  <p>{pub.authors} — <em>{pub.venue}</em></p>
                </div>
                <span className={`badge ${pub.type === 'Journal' ? 'badge-crimson' : 'badge-navy'}`}>{pub.type}</span>
                <ExternalLink size={16} className="publication-link-icon" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section research-cta">
        <div className="container research-cta__inner">
          <h2 className="section-title">Collaborate With Our Research Labs</h2>
          <p className="section-subtitle">We welcome partnerships with industry, academia, and government institutions for joint research programs.</p>
          <div className="research-cta__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Get in Touch</Link>
            <Link to="/corporate" className="btn btn-outline btn-lg">Corporate Partnerships</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

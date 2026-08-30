import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, Globe, Users, FileText, ExternalLink } from 'lucide-react';
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
        <div className="hero__grid-overlay" style={{ opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Research</span>
          </div>
          <h1 className="page-hero__title" style={{ color: 'white' }}>Research & Innovation</h1>
          <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Our faculty conducts applied research in cybersecurity, AI safety, and critical infrastructure protection.</p>
        </div>
      </section>

      <section className="section research-clusters-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Research Clusters</span>
            <h2 className="section-title">Active Research Initiatives</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Interdisciplinary teams working on problems that matter to Africa and the world.</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: '56px' }}>
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

      <section className="section publications-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Publications</span>
            <h2 className="section-title">Selected Publications</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Peer-reviewed research from our faculty across top-tier journals and conferences.</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section research-cta">
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2 className="section-title">Collaborate With Our Research Labs</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>We welcome partnerships with industry, academia, and government institutions for joint research programs.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get in Touch</Link>
            <Link to="/corporate" className="btn btn-outline btn-lg">Corporate Partnerships</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

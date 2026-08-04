import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, Globe, Users, FileText, ExternalLink } from 'lucide-react';
import './Programs.css';

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
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Research</span></div>
          <h1 className="page-hero__title">Research & Innovation</h1>
          <p className="page-hero__desc">Our faculty conducts applied research in cybersecurity, AI safety, and critical infrastructure protection.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Research Clusters</span>
            <h2 className="section-title">Active Research Initiatives</h2>
            <p className="section-subtitle">Interdisciplinary teams working on problems that matter to Africa and the world.</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: '48px' }}>
            {CLUSTERS.map((c, i) => (
              <div className="card" key={i}>
                <div className="program-icon"><c.icon size={22} /></div>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-desc">{c.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Lead: {c.lead}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Publications</span>
            <h2 className="section-title">Selected Publications</h2>
          </div>
          <div className="publications-list">
            {PUBLICATIONS.map((pub, i) => (
              <div className="publication-card" key={i}>
                <div className="publication-icon">
                  <FileText size={20} />
                </div>
                <div className="publication-info">
                  <h4>{pub.title}</h4>
                  <p>{pub.authors} — <em>{pub.venue}</em></p>
                </div>
                <span className="badge badge-blue">{pub.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

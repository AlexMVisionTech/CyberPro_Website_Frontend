import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronRight, Clock, Target, Layers, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Programs.css';

const PROGRAMS = [
  { title: 'Cybersecurity Specialist', desc: 'Master core principles of defensive security, security operations, traffic analysis, and risk management architecture.', cat: 'security', dur: '6 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'CompTIA Security+, CISSP', img: '/images/programs/cybersecurity.png' },
  { title: 'Ethical Hacking & Penetration Testing', desc: 'Learn offensive methodologies, scanning systems, WebApp security, and wireless vulnerability assessment.', cat: 'security', dur: '4 Months', mode: 'Remote', lvl: 'Advanced', certs: 'CEH, OSCP', img: '/images/programs/ethical_hacking.png' },
  { title: 'Artificial Intelligence & Machine Learning', desc: 'Implement computer vision, neural networks, NLP, generative AI architectures, and predictive analytics.', cat: 'ai-data', dur: '6 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'AWS ML Specialty, TensorFlow', img: '/images/programs/ai_ml.png' },
  { title: 'Cloud Computing & Architecture', desc: 'Architect scalable enterprise deployments in AWS, GCP and Azure with advanced container governance.', cat: 'infra', dur: '5 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'AWS SAA, Azure Admin', img: '/images/programs/cloud_computing.png' },
  { title: 'Data Science & Analytics', desc: 'Extract business insights using Python, NumPy, Pandas, Tableau, and statistical modeling.', cat: 'ai-data', dur: '6 Months', mode: 'Remote', lvl: 'Beginner', certs: 'IBM Data Science, Google DA', img: '/images/programs/data_science.png' },
  { title: 'DevOps & Automation', desc: 'Implement CI/CD pipelines, Docker, Kubernetes orchestration, and infrastructure as code.', cat: 'devops', dur: '4 Months', mode: 'Hybrid', lvl: 'Intermediate', certs: 'Docker DCA, AWS DevOps', img: '/images/programs/devops.png' },
  { title: 'Digital Forensics & Incident Response', desc: 'Conduct forensic investigations, malware analysis, evidence collection, and chain of custody management.', cat: 'security', dur: '5 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'CHFI, EnCE', img: '/images/programs/digital_forensics.png' },
  { title: 'Network Engineering', desc: 'Design, implement and manage enterprise LAN/WAN networks, routing protocols, and switching fabrics.', cat: 'infra', dur: '6 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'CCNA, CCNP', img: '/images/programs/network_engineering.jpg' },
  { title: 'Full-Stack Software Development', desc: 'Build production-grade web applications using React, Node.js, databases, and modern deployment pipelines.', cat: 'devops', dur: '6 Months', mode: 'Remote', lvl: 'Beginner', certs: 'Meta Front-End, AWS Developer', img: '/images/programs/fullstack_dev.jpg' },
  { title: 'Database Administration', desc: 'Manage relational and NoSQL databases, query optimization, replication, and backup strategies.', cat: 'infra', dur: '3 Months', mode: 'Remote', lvl: 'Intermediate', certs: 'Oracle DBA, MongoDB', img: '/images/programs/database_admin.jpg' },
  { title: 'IoT & Embedded Systems Security', desc: 'Secure IoT ecosystems, firmware analysis, SCADA systems, and industrial control security.', cat: 'security', dur: '4 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'GICSP, ICS-CERT', img: '/images/programs/iot_security.jpg' },
  { title: 'Blockchain & Web3 Security', desc: 'Smart contract auditing, DeFi security, cryptographic protocols, and distributed ledger technology.', cat: 'ai-data', dur: '4 Months', mode: 'Remote', lvl: 'Advanced', certs: 'CBSP, Ethereum Dev', img: '/images/programs/blockchain.jpg' },
  { title: 'Emerging Technologies', desc: 'Explore quantum computing fundamentals, edge computing, AR/VR, and 5G network security.', cat: 'ai-data', dur: '3 Months', mode: 'Remote', lvl: 'Intermediate', certs: 'Industry Certificates', img: '/images/programs/emerging_tech.jpg' },
];

const TABS = [
  { key: 'all', label: 'All Programs' },
  { key: 'security', label: 'Security & Forensics' },
  { key: 'ai-data', label: 'AI, ML & Data' },
  { key: 'infra', label: 'Cloud & Networking' },
  { key: 'devops', label: 'DevOps & Programming' },
];

const CAT_LABELS = {
  security: 'Security',
  'ai-data': 'AI & Data',
  infra: 'Infrastructure',
  devops: 'Development',
};

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export { PROGRAMS, CAT_LABELS, slugify };

export default function Programs() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PROGRAMS.filter(p => {
    const matchesTab = activeTab === 'all' || p.cat === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Immersive Hero */}
      <section className="programs-hero-premium">
        <div className="programs-hero-grid"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <div className="breadcrumb">
              <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ color: 'white' }}>Programs</span>
            </div>
            <h1 className="page-hero__title" style={{ color: 'white' }}>Academy Programs</h1>
            <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>13 expert-designed training tracks mapped to globally recognized certifications and real-world career pipelines.</p>
          </ScrollReveal>


        </div>
      </section>

      {/* Programs Display */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          
          <ScrollReveal>
            <div className="programs-control-panel">
              <div className="tabs">
                {TABS.map(tab => (
                  <button 
                    key={tab.key} 
                    className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`} 
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="programs-search">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search programs..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-3" style={{ marginTop: '40px' }}>
            {filtered.map((prog, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <Link to={`/programs/${slugify(prog.title)}`} className="cyber-program-card">
                  <div className="cyber-program-card__image">
                    <img src={prog.img} alt={prog.title} loading="lazy" />
                    <div className="image-overlay"></div>
                    <span className="cyber-program-card__category">{CAT_LABELS[prog.cat]}</span>
                  </div>
                  <div className="cyber-program-card__body">
                    <h3 className="cyber-program-card__title">{prog.title}</h3>
                    <p className="cyber-program-card__desc">{prog.desc}</p>
                    
                    <div className="cyber-program-card__meta">
                      <div className="meta-item">
                        <Clock size={14} /> <span>{prog.dur}</span>
                      </div>
                      <div className="meta-item">
                        <Target size={14} /> <span>{prog.mode}</span>
                      </div>
                      <div className="meta-item">
                        <Layers size={14} /> <span>{prog.lvl}</span>
                      </div>
                    </div>
                    
                    <div className="cyber-program-card__footer">
                      <div className="certs-label">Certs: {prog.certs}</div>
                      <div className="view-btn">
                        Explore <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <ScrollReveal>
              <div className="programs-empty-state">
                <Search size={48} className="empty-icon" />
                <h3>No Protocols Found</h3>
                <p>No programs match your current search parameters. Try adjusting your filters.</p>
                <button className="btn btn-outline" onClick={() => { setSearch(''); setActiveTab('all'); }}>
                  Clear Filters
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}

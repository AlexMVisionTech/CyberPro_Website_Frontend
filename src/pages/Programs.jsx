import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock, Shield, Brain, Cloud, BarChart3, Code2, Server,
  Database, Cpu, Wifi, Search, ArrowRight, ChevronRight,
  Globe, Terminal, FileCode, Fingerprint
} from 'lucide-react';
import './Programs.css';

const PROGRAMS = [
  { icon: Lock, title: 'Cybersecurity Specialist', desc: 'Master core principles of defensive security, security operations, traffic analysis, and risk management architecture.', cat: 'security', dur: '6 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'CompTIA Security+, CISSP', img: '/images/programs/cybersecurity.png' },
  { icon: Shield, title: 'Ethical Hacking & Penetration Testing', desc: 'Learn offensive methodologies, scanning systems, WebApp security, and wireless vulnerability assessment.', cat: 'security', dur: '4 Months', mode: 'Remote', lvl: 'Advanced', certs: 'CEH, OSCP', img: '/images/programs/ethical_hacking.png' },
  { icon: Brain, title: 'Artificial Intelligence & Machine Learning', desc: 'Implement computer vision, neural networks, NLP, generative AI architectures, and predictive analytics.', cat: 'ai-data', dur: '6 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'AWS ML Specialty, TensorFlow', img: '/images/programs/ai_ml.png' },
  { icon: Cloud, title: 'Cloud Computing & Architecture', desc: 'Architect scalable enterprise deployments in AWS, GCP and Azure with advanced container governance.', cat: 'infra', dur: '5 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'AWS SAA, Azure Admin', img: '/images/programs/cloud_computing.png' },
  { icon: BarChart3, title: 'Data Science & Analytics', desc: 'Extract business insights using Python, NumPy, Pandas, Tableau, and statistical modeling.', cat: 'ai-data', dur: '6 Months', mode: 'Remote', lvl: 'Beginner', certs: 'IBM Data Science, Google DA', img: '/images/programs/data_science.png' },
  { icon: Code2, title: 'DevOps & Automation', desc: 'Implement CI/CD pipelines, Docker, Kubernetes orchestration, and infrastructure as code.', cat: 'devops', dur: '4 Months', mode: 'Hybrid', lvl: 'Intermediate', certs: 'Docker DCA, AWS DevOps', img: '/images/programs/devops.png' },
  { icon: Fingerprint, title: 'Digital Forensics & Incident Response', desc: 'Conduct forensic investigations, malware analysis, evidence collection, and chain of custody management.', cat: 'security', dur: '5 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'CHFI, EnCE', img: '/images/programs/digital_forensics.png' },
  { icon: Server, title: 'Network Engineering', desc: 'Design, implement and manage enterprise LAN/WAN networks, routing protocols, and switching fabrics.', cat: 'infra', dur: '6 Months', mode: 'Hybrid/Remote', lvl: 'Intermediate', certs: 'CCNA, CCNP', img: '/images/programs/network_engineering.jpg' },
  { icon: FileCode, title: 'Full-Stack Software Development', desc: 'Build production-grade web applications using React, Node.js, databases, and modern deployment pipelines.', cat: 'devops', dur: '6 Months', mode: 'Remote', lvl: 'Beginner', certs: 'Meta Front-End, AWS Developer', img: '/images/programs/fullstack_dev.jpg' },
  { icon: Database, title: 'Database Administration', desc: 'Manage relational and NoSQL databases, query optimization, replication, and backup strategies.', cat: 'infra', dur: '3 Months', mode: 'Remote', lvl: 'Intermediate', certs: 'Oracle DBA, MongoDB', img: '/images/programs/database_admin.jpg' },
  { icon: Wifi, title: 'IoT & Embedded Systems Security', desc: 'Secure IoT ecosystems, firmware analysis, SCADA systems, and industrial control security.', cat: 'security', dur: '4 Months', mode: 'Hybrid', lvl: 'Advanced', certs: 'GICSP, ICS-CERT', img: '/images/programs/iot_security.jpg' },
  { icon: Globe, title: 'Blockchain & Web3 Security', desc: 'Smart contract auditing, DeFi security, cryptographic protocols, and distributed ledger technology.', cat: 'ai-data', dur: '4 Months', mode: 'Remote', lvl: 'Advanced', certs: 'CBSP, Ethereum Dev', img: '/images/programs/blockchain.jpg' },
  { icon: Cpu, title: 'Emerging Technologies', desc: 'Explore quantum computing fundamentals, edge computing, AR/VR, and 5G network security.', cat: 'ai-data', dur: '3 Months', mode: 'Remote', lvl: 'Intermediate', certs: 'Industry Certificates', img: '/images/programs/emerging_tech.jpg' },
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

export default function Programs() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PROGRAMS.filter(p => {
    const matchesTab = activeTab === 'all' || p.cat === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Programs</span></div>
          <h1 className="page-hero__title">Academy Programs</h1>
          <p className="page-hero__desc">13 expert-designed training tracks mapped to globally recognized certifications and real-world career pipelines.</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section">
        <div className="container">
          <div className="programs-filter-bar">
            <div className="tabs">
              {TABS.map(tab => (
                <button key={tab.key} className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="programs-search">
              <Search size={16} />
              <input type="text" placeholder="Search programs..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: '40px' }}>
            {filtered.map((prog, i) => (
              <div className="program-card" key={i}>
                <div className="program-card__image">
                  <img src={prog.img} alt={prog.title} loading="lazy" />
                  <span className="program-card__category">{CAT_LABELS[prog.cat]}</span>
                </div>
                <div className="program-card__body">
                  <div className="program-card__icon"><prog.icon size={20} /></div>
                  <h3 className="program-card__title">{prog.title}</h3>
                  <p className="program-card__desc">{prog.desc}</p>
                  <div className="program-card__certs">{prog.certs}</div>
                  <div className="program-card__meta">
                    <span className="badge badge-navy">{prog.dur}</span>
                    <span className="badge badge-blue">{prog.mode}</span>
                    <span className="badge badge-green">{prog.lvl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No programs match your search criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

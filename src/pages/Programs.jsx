import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, Layers, ArrowUpRight, BookOpen } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Programs.css';

const PROGRAMS = [
  { title: 'CyberLaw, Legislation, Policies and Ethics', desc: 'Introduces learners to cybersecurity law, legislation, policy frameworks, ethics, and responsible digital practice.', cat: 'foundation', dur: 'Self-paced', date: '25/09/25', students: '2 Students', lvl: 'Foundations', fee: 'Free', certs: 'Cyber law and ethics', img: '/images/programs/cybersecurity.png', sourceUrl: 'https://cyberpro.global/course/' },
  { title: 'Cyber-Economics and Business Policy', desc: 'Explores the economic and policy dimensions of cybersecurity for business and public-sector decision making.', cat: 'foundation', dur: '45 Hours', date: '19/07/25', students: '1 Student', lvl: 'Foundations', fee: 'KES 30,000', certs: 'Cyber economics and policy', img: '/images/programs/data_science.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Python for Cybersecurity & AI-Powered Defense', desc: 'Build practical Python skills for cyber defense workflows, automation, and AI-assisted security analysis.', cat: 'foundation', dur: 'Short course', date: '2/07/25', students: '2 Students', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Python security automation', img: '/images/programs/ai_ml.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Network Security & AI-Powered Threat Detection', desc: 'Learn network security practices and AI-enhanced approaches to detect, analyze, and respond to threats.', cat: 'foundation', dur: 'Short course', date: '29/04/25', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Network threat detection', img: '/images/programs/network_engineering.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity, AI & Cybercrime Laws', desc: 'Connects cybersecurity and AI concepts with cybercrime legislation, compliance, and enforcement context.', cat: 'foundation', dur: 'Short course', date: '17/03/25', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybercrime law and AI', img: '/images/programs/cybersecurity.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity & AI in Business Management', desc: 'Shows business leaders how cybersecurity and AI affect governance, resilience, operations, and strategy.', cat: 'foundation', dur: 'Short course', date: '17/03/25', students: '2 Students', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Business cyber leadership', img: '/images/programs/emerging_tech.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity & AI Fundamentals', desc: 'A beginner-friendly entry into cybersecurity and AI concepts, risks, controls, and practical applications.', cat: 'foundation', dur: 'Short course', date: '29/04/25', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybersecurity and AI foundations', img: '/images/programs/ai_ml.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Data Analytics, Cybersecurity & AI', desc: 'Combines analytics, cybersecurity, and AI to help learners interpret security data and make better decisions.', cat: 'foundation', dur: 'Short course', date: '17/03/25', students: '17 Students', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Security analytics', img: '/images/programs/data_science.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cloud Computing & Security', desc: 'Introduces cloud computing concepts and core security practices for protecting modern cloud environments.', cat: 'foundation', dur: 'Short course', date: '9/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cloud security fundamentals', img: '/images/programs/cloud_computing.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cyber Law, Legislation, Policies and Ethics', desc: 'Introduces law students and professionals to cybersecurity principles, digital rights, policies, and ethics.', cat: 'foundation', dur: '45 Hours', date: '4/12/24', students: '2 Students', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cyber law and policy', img: '/images/programs/cybersecurity.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity Awareness for Social Sciences', desc: 'Explains the role of cybersecurity in social science contexts, digital society, data use, and online safety.', cat: 'foundation', dur: '40 Hours', date: '9/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 25,000', certs: 'Cyber awareness', img: '/images/programs/emerging_tech.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity for Agriculture and Smart Farming', desc: 'Covers cybersecurity risks, protections, and resilience practices for agriculture and smart farming systems.', cat: 'foundation', dur: '45 Hours', date: '17/02/25', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Agri-tech security', img: '/images/programs/iot_security.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity Foundational Skills', desc: 'COP 400 foundational cybersecurity training covering essential concepts, skills, and security practices.', cat: 'foundation', dur: 'Short course', date: '2/04/25', students: '35 Students', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Foundational cybersecurity', img: '/images/programs/cybersecurity.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cybersecurity, Blockchain, and FinTech', desc: 'Introduces the application of cybersecurity to blockchain, fintech platforms, digital assets, and trust systems.', cat: 'foundation', dur: '60 Hours', date: '4/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Blockchain and fintech security', img: '/images/programs/blockchain.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Digital Art and Intellectual Property', desc: 'Helps arts students understand digital art, intellectual property, online ownership, and cybersecurity intersections.', cat: 'foundation', dur: '35 Hours', date: '4/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Digital IP awareness', img: '/images/programs/emerging_tech.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Financial Data Protection and Cybersecurity', desc: 'Explores cybersecurity strategies for protecting financial data, systems, transactions, and regulated workflows.', cat: 'foundation', dur: '50 Hours', date: '9/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Financial data security', img: '/images/programs/database_admin.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Security Essentials: Networks and Endpoints', desc: 'Introduces the fundamental concepts required to secure networks, endpoints, users, and connected assets.', cat: 'foundation', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Network and endpoint essentials', img: '/images/programs/network_engineering.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { title: 'Cyber-Economics and Business Policy - Intermediate', desc: 'A deeper cybersecurity and economic policy course for learners ready to connect security decisions with business policy.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '4 Students', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Cyber economics and business policy', img: '/images/programs/data_science.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Cybersecurity in E-commerce and Digital Markets', desc: 'Covers cybersecurity considerations for e-commerce platforms, online markets, customer trust, and digital transactions.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'E-commerce security', img: '/images/programs/fullstack_dev.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Cybersecurity and Digital Marketing', desc: 'Explores security and privacy practices for digital marketing operations, platforms, campaigns, and customer data.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Marketing data security', img: '/images/programs/emerging_tech.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Data Security and Privacy in Business Operations', desc: 'A 40-hour course on protecting business data, privacy obligations, operational controls, and cyber hygiene.', cat: 'intermediate', dur: '40 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Data privacy operations', img: '/images/programs/database_admin.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Advanced Endpoint Security for IoT Devices', desc: 'Equips learners to secure IoT endpoints, device fleets, embedded environments, and connected infrastructure.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'IoT endpoint security', img: '/images/programs/iot_security.jpg', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Mobile Device Security', desc: 'A comprehensive 45-hour course covering mobile device threats, controls, policy, and secure usage practices.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Mobile security', img: '/images/programs/cybersecurity.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Endpoint Protection and Response', desc: 'Covers endpoint protection and response concepts, building on network and endpoint security essentials.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Endpoint response', img: '/images/programs/digital_forensics.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Cybersecurity Incident Response and Management', desc: 'A 45-hour course preparing learners to manage cyber incidents, response workflows, and operational coordination.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Incident response', img: '/images/programs/digital_forensics.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
  { title: 'Cyber Threat Intelligence and Analysis', desc: 'Teaches learners to collect, interpret, and apply threat intelligence for stronger detection and defense.', cat: 'intermediate', dur: '45 Hours', date: '4/12/24', students: '1 Student', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Threat intelligence', img: '/images/programs/ethical_hacking.png', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=3' },
];

const TABS = [
  { key: 'all', label: 'All Courses' },
  { key: 'foundation', label: 'Foundations' },
  { key: 'intermediate', label: 'Intermediate' },
];

const CAT_LABELS = {
  foundation: 'Foundations',
  intermediate: 'Intermediate',
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
    const query = search.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Immersive Hero */}
      <section className="programs-hero-premium">
        <div className="programs-hero-grid"></div>
        <div className="container programs-hero-inner">
          <ScrollReveal>
            <div className="programs-hero-copy">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <span>Programs</span>
              </div>
              <h1 className="page-hero__title">CyberPro Courses</h1>
              <p className="page-hero__desc">Browse CyberPro Global's current course catalog across foundations and intermediate cybersecurity, AI, policy, privacy, cloud, and incident response training.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Display */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          
          <ScrollReveal>
            <div className="programs-section-heading">
              <div>
                <span className="section-label">Explore Courses</span>
                <h2>Cybersecurity learning paths from CyberPro Global</h2>
              </div>
              <p>{filtered.length} course{filtered.length === 1 ? '' : 's'} available</p>
            </div>
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
                  placeholder="Search courses..." 
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
                    <div className="cyber-program-card__eyebrow">
                      <BookOpen size={14} />
                      CyberPro Global course
                    </div>
                    <h3 className="cyber-program-card__title">{prog.title}</h3>
                    <p className="cyber-program-card__desc">{prog.desc}</p>
                    
                    <div className="cyber-program-card__meta">
                      <div className="meta-item">
                        <Clock size={14} /> <span>{prog.dur}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={14} /> <span>{prog.students}</span>
                      </div>
                      <div className="meta-item">
                        <Layers size={14} /> <span>{prog.lvl}</span>
                      </div>
                    </div>
                    
                    <div className="cyber-program-card__footer">
                      <div className="certs-label">{prog.fee}</div>
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
                <h3>No Courses Found</h3>
                <p>No courses match your current search parameters. Try adjusting your filters.</p>
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

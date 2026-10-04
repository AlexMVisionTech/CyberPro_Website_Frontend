import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Layers, ArrowUpRight, BookOpen } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import usePrograms from '../hooks/usePrograms';
import './Programs.css';

const TABS = [
  { key: "all", label: "All Courses" },
  { key: "foundation", label: "Foundations" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "expert", label: "Expert" },
];

const CAT_LABELS = {
  foundation: "Foundations",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export { CAT_LABELS, slugify };

export default function Programs() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { programs, loading, error } = usePrograms();

  const filtered = programs.filter(p => {
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
              <p className="page-hero__desc">Browse CyberPro Global's current course catalog across foundation, intermediate, advanced, and expert cybersecurity, AI, policy, privacy, cloud, and incident response training.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Display */}
      <section className="section" id="academia" style={{ paddingTop: '40px' }}>
        <div className="container">
          
          <ScrollReveal>
            <div className="programs-section-heading">
              <div>
                <span className="section-label">Explore Courses</span>
                <h2>Cybersecurity learning paths from CyberPro Global</h2>
              </div>
              <p>{filtered.length} course{filtered.length === 1 ? '' : 's'} available</p>
            </div>
            <div className="academia-pathway-note">
              <div><strong>For universities, colleges, and faculty</strong><p>Use courses as a starting point for student cohorts, guest instruction, faculty development, or a broader learning partnership.</p></div>
              <Link to="/admissions#institutional" className="btn btn-outline">Explore institutional pathways <ArrowUpRight size={16} /></Link>
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
            {loading && <p className="programs-empty-state">Loading course catalog…</p>}
            {error && <p className="programs-empty-state" role="alert">{error}</p>}
            {filtered.map((prog, i) => (
              <ScrollReveal key={prog.id} delay={i * 0.05}>
                <Link to={`/programs/${slugify(prog.title)}-${prog.id}`} className="cyber-program-card">
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

          {!loading && !error && filtered.length === 0 && (
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

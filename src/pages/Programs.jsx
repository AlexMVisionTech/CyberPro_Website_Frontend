import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowUpRight, BadgeCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import usePrograms from '../hooks/usePrograms';
import './Programs.css';

const CAT_LABELS = {
  foundation: "Foundations",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const TIER_ORDER = ['foundation', 'intermediate', 'advanced', 'expert'];

export const TIER_ACCENTS = {
  foundation: '#7dd3fc',
  intermediate: '#b18cff',
  advanced: '#ff5f6f',
  expert: '#f4b63f',
};

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export { CAT_LABELS, slugify };

export default function Programs() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { programs, loading, error } = usePrograms();
  const catalogRef = useRef(null);

  const availableTiers = TIER_ORDER.filter(cat => programs.some(p => p.cat === cat));
  const tabs = [
    { key: 'all', label: 'All Programs' },
    ...availableTiers.map(cat => ({ key: cat, label: CAT_LABELS[cat] })),
  ];
  const tierCount = cat => programs.filter(p => p.cat === cat).length;

  const filtered = programs.filter(p => {
    const matchesTab = activeTab === 'all' || p.cat === activeTab;
    const query = search.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const jumpToTier = (cat) => {
    setActiveTab(cat);
    setSearch('');
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <section className="programs-hero-premium">
        <div className="programs-hero-grid" />
        <span className="hero-nova__stars" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
        </span>
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container programs-hero-inner">
          <ScrollReveal>
            <div className="programs-hero-copy">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <span>Programs</span>
              </div>
              <h1 className="page-hero__title">
                Cyberpro <span className="hero-nova__title-accent">Courses.</span>
              </h1>
              <p className="page-hero__desc">
                Certification-aligned training across cybersecurity, AI, cloud, policy, and digital
                governance — built in tiers so every learner starts where they stand and finish job-ready.
              </p>
              <div className="tier-rail" aria-label="Learning tiers">
                {availableTiers.map((cat, idx) => (
                  <button
                    type="button"
                    key={cat}
                    className="tier-rail__node"
                    style={{ '--tier-accent': TIER_ACCENTS[cat] }}
                    onClick={() => jumpToTier(cat)}
                  >
                    <span className="tier-rail__index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="tier-rail__text">
                      <strong>{CAT_LABELS[cat]}</strong>
                      <small>{tierCount(cat)} program{tierCount(cat) === 1 ? '' : 's'}</small>
                    </span>
                    <ArrowUpRight size={15} className="tier-rail__arrow" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="academia" style={{ paddingTop: '48px' }} ref={catalogRef}>
        <div className="container">
          <ScrollReveal>
            <div className="programs-section-heading">
              <div>
                <span className="section-label">Explore Courses</span>
                <h2>Cybersecurity learning paths from Cyberpro Global</h2>
              </div>
              <p>{filtered.length} program{filtered.length === 1 ? '' : 's'} available</p>
            </div>
            <div className="academia-pathway-note">
              <div><strong>For universities, colleges, and faculty</strong><p>Use courses as a starting point for student cohorts, guest instruction, faculty development, or a broader learning partnership.</p></div>
              <Link to="/admissions#institutional" className="btn btn-outline">Explore institutional pathways <ArrowUpRight size={16} /></Link>
            </div>
            <div className="programs-control-panel">
              <div className="tabs" role="group" aria-label="Program levels">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                    aria-pressed={activeTab === tab.key}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="programs-search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search programs…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search programs"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-3" style={{ marginTop: '40px' }}>
            {loading && [0, 1, 2, 3, 4, 5].map(i => (
              <div className="program-card program-card--skeleton" key={`skeleton-${i}`}>
                <div className="program-card__image program-skeleton__block" />
                <div className="program-card__body">
                  <div className="program-skeleton__block program-skeleton__block--title" />
                  <div className="program-skeleton__block program-skeleton__block--text" />
                  <div className="program-skeleton__block program-skeleton__block--text program-skeleton__block--short" />
                </div>
              </div>
            ))}
            {error && <p className="programs-empty-state" role="alert">{error}</p>}
            {filtered.map((prog, i) => (
              <ScrollReveal key={prog.id} delay={Math.min(i * 0.05, 0.3)}>
                <Link to={`/programs/${slugify(prog.title)}-${prog.id}`} className="cyber-program-card">
                  <div className="cyber-program-card__image">
                    <img src={prog.img} alt={prog.title} loading="lazy" />
                    <div className="image-overlay"></div>
                    <span className="cyber-program-card__category">{CAT_LABELS[prog.cat]}</span>
                  </div>
                  <div className="cyber-program-card__body">
                    <div className="cyber-program-card__eyebrow">
                      <BadgeCheck size={14} />
                      {prog.certs || 'Cyberpro Global certificate'}
                    </div>
                    <h3 className="cyber-program-card__title">{prog.title}</h3>
                    <p className="cyber-program-card__desc">{prog.desc}</p>

                    <div className="cyber-program-card__meta">
                      <span className="program-card__dur"><Clock size={13} aria-hidden="true" />{prog.dur}</span>
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
                <h3>No Programs Found</h3>
                <p>No programs match your current search. Try adjusting your filters.</p>
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Blog.css';
import useApiCollection from '../hooks/useApiCollection';

const CATEGORY_TABS = [
  { key: 'security', label: 'Cybersecurity', chip: 'blog-chip--security' },
  { key: 'ai', label: 'AI & ML', chip: 'blog-chip--ai' },
  { key: 'career', label: 'Career Guides', chip: 'blog-chip--career' },
];

function catChip(cat) {
  return CATEGORY_TABS.find(c => c.key === cat)?.chip || 'blog-chip--security';
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { items: articles, loading, error } = useApiCollection('/articles');

  const tabs = [
    { key: 'all', label: 'All Articles' },
    ...CATEGORY_TABS.filter(cat => articles.some(a => a.cat === cat.key)),
  ];

  const filtered = articles.filter(a => {
    const matchTab = activeTab === 'all' || a.cat === activeTab;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const featured = articles.find(a => a.featured);

  return (
    <div>
      <section className="blog-hero">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Blog</span>
          </div>
          <h1 className="page-hero__title">Cyberpro <span className="hero-nova__title-accent">Insights.</span></h1>
          <p className="page-hero__desc">Security research, technical guides, student stories, and career advice from our training team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && (
            <div className="grid grid-3">
              {[0, 1, 2].map(i => (
                <div className="program-card program-card--skeleton" key={i}>
                  <div className="program-card__image program-skeleton__block" />
                  <div className="program-card__body">
                    <div className="program-skeleton__block program-skeleton__block--title" />
                    <div className="program-skeleton__block program-skeleton__block--text" />
                    <div className="program-skeleton__block program-skeleton__block--text program-skeleton__block--short" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p role="alert">{error}</p>}
          {featured && (
            <ScrollReveal>
              <article className="blog-featured">
                <div className="blog-featured__image">
                  <img src={featured.img} alt={featured.title} />
                  <span className="blog-featured__flag">Featured Article</span>
                </div>
                <div className="blog-featured__body">
                  <h2 className="blog-featured__title">{featured.title}</h2>
                  <p className="blog-featured__excerpt">{featured.excerpt}</p>
                  <div className="blog-featured__meta">
                    <span><User size={14} aria-hidden="true" /> {featured.author}</span>
                    <span><Clock size={14} aria-hidden="true" /> {featured.read} read</span>
                  </div>
                  <span className="blog-featured__cta">Read the guide <ArrowRight size={16} aria-hidden="true" /></span>
                </div>
              </article>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.1}>
            <div className="blog-filter">
              <div className="tabs" role="group" aria-label="Article categories">
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
                <input type="text" placeholder="Search articles…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search articles" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-3" style={{ marginTop: '36px' }}>
            {filtered.map((article, i) => (
              <ScrollReveal key={article.id} delay={Math.min(i * 0.06, 0.3)}>
                <div className="card blog-card">
                  <div className="blog-card__image">
                    <img src={article.img} alt={article.title} loading="lazy" />
                  </div>
                  <div className="blog-card__body">
                    <span className={`blog-chip ${catChip(article.cat)}`}>{article.catLabel}</span>
                    <h3 className="blog-card__title">{article.title}</h3>
                    <p className="blog-card__excerpt">{article.excerpt}</p>
                    <div className="blog-card__meta">
                      <span>{article.date}</span>
                      <span>{article.read} read</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {!loading && !error && filtered.length === 0 && (
            <div className="blog-empty">
              No articles match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

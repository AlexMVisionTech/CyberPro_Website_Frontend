import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight } from 'lucide-react';
import './Blog.css';
import useApiCollection from '../hooks/useApiCollection';

const TABS = [
  { key: 'all', label: 'All Articles' },
  { key: 'security', label: 'Cybersecurity' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'career', label: 'Career Guides' },
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { items: articles, loading, error } = useApiCollection('/articles');

  const filtered = articles.filter(a => {
    const matchTab = activeTab === 'all' || a.cat === activeTab;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const featured = articles.find(a => a.featured);

  return (
    <div>
      <section className="page-hero section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero__bg"></div>
        <div className="hero__grid-overlay" style={{ opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Blog</span>
          </div>
          <h1 className="page-hero__title" style={{ color: 'white' }}>CyberPro Insights</h1>
          <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Security research, technical guides, student stories, and career advice from our training team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && <p>Loading articles…</p>}
          {error && <p role="alert">{error}</p>}
          {featured && (
            <Link to="/blog" className="blog-featured" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-featured__image">
                <img src={featured.img} alt={featured.title} />
              </div>
              <div className="blog-featured__body">
                <span className="badge badge-crimson" style={{ marginBottom: '16px', width: 'fit-content' }}>Featured Article</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <div className="blog-featured__meta">
                  <span><User size={14} /> {featured.author}</span>
                  <span><Clock size={14} /> {featured.read} read</span>
                </div>
              </div>
            </Link>
          )}

          <div className="blog-filter">
            <div className="tabs">
              {TABS.map(tab => (
                <button key={tab.key} className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="programs-search">
              <Search size={16} />
              <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: '36px' }}>
            {filtered.map((article, i) => (
              <div className="card blog-card" key={article.id}>
                <div className="blog-card__image">
                  <img src={article.img} alt={article.title} />
                </div>
                <div className="blog-card__body">
                  <span className="badge badge-navy" style={{ fontSize: '11px', marginBottom: '12px', width: 'fit-content' }}>{article.catLabel}</span>
                  <h3 className="blog-card__title">{article.title}</h3>
                  <p className="blog-card__excerpt">{article.excerpt}</p>
                  <div className="blog-card__meta">
                    <span>{article.date}</span>
                    <span>{article.read} read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No articles match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

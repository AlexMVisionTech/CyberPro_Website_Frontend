import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight } from 'lucide-react';
import './Blog.css';

const ARTICLES = [
  { title: 'Implementing Zero-Trust Architecture in Legacy Enterprise Infrastructure', excerpt: 'Explore concrete pathways to migrate older networks to zero-trust segments using micro-segmentations.', cat: 'security', catLabel: 'Cybersecurity', date: 'August 1, 2026', read: '6 min', author: 'Dr. Philip Mulwa', img: '/images/blog_1.jpg', featured: true },
  { title: 'Model Adversarial Defense: Hardening ML Classifiers', excerpt: 'A technical breakdown of threat mechanisms attacking image recognition systems with adversarial feeds.', cat: 'ai', catLabel: 'Artificial Intelligence', date: 'July 28, 2026', read: '8 min', author: 'Prof. Janet Okoth', img: '/images/blog_2.jpg' },
  { title: 'Navigating Your First Cybersecurity Job Search in Africa', excerpt: 'Practical tips for landing entry-level SOC roles, building portfolios, and passing technical interviews.', cat: 'career', catLabel: 'Career Guide', date: 'July 15, 2026', read: '5 min', author: 'Amina M.', img: '/images/blog_3.jpg' },
  { title: 'AWS Security Best Practices for Startups', excerpt: 'Essential IAM policies, S3 bucket configurations, and CloudTrail monitoring for early-stage companies.', cat: 'security', catLabel: 'Cloud Security', date: 'July 10, 2026', read: '7 min', author: 'Dr. Eric Gitonga', img: '/images/blog_1.jpg' },
  { title: 'The Rise of AI-Powered Phishing Attacks', excerpt: 'How generative AI is transforming social engineering and what defenders need to know.', cat: 'ai', catLabel: 'AI Security', date: 'July 5, 2026', read: '6 min', author: 'Dr. Philip Mulwa', img: '/images/blog_2.jpg' },
  { title: 'Building a Cybersecurity Home Lab on a Budget', excerpt: 'Step-by-step guide to setting up VMs, vulnerable targets, and monitoring tools for self-study.', cat: 'career', catLabel: 'Career Guide', date: 'June 28, 2026', read: '10 min', author: 'Amina M.', img: '/images/blog_3.jpg' },
];

const TABS = [
  { key: 'all', label: 'All Articles' },
  { key: 'security', label: 'Cybersecurity' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'career', label: 'Career Guides' },
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = ARTICLES.filter(a => {
    const matchTab = activeTab === 'all' || a.cat === activeTab;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const featured = ARTICLES.find(a => a.featured);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Blog</span></div>
          <h1 className="page-hero__title">CyberPro Insights</h1>
          <p className="page-hero__desc">Security research, technical guides, student stories, and career advice from our training team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {featured && (
            <Link to="/blog" className="blog-featured" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-featured__image">
                <img src={featured.img} alt={featured.title} />
              </div>
              <div className="blog-featured__body">
                <span className="badge badge-blue" style={{ marginBottom: '16px', width: 'fit-content' }}>Featured Article</span>
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
              <div className="card blog-card" key={i}>
                <div className="blog-card__image">
                  <img src={article.img} alt={article.title} />
                </div>
                <div className="blog-card__body">
                  <span className="badge badge-blue" style={{ fontSize: '11px', marginBottom: '12px', width: 'fit-content' }}>{article.catLabel}</span>
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

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No articles match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

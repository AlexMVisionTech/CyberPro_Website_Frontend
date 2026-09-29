import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Camera } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import useApiCollection from '../hooks/useApiCollection';
import './Events.css';

const TABS = [
  { key: 'all', label: 'All Events' },
  { key: 'ctf', label: 'Hackathons & CTFs' },
  { key: 'bootcamp', label: 'Bootcamps' },
  { key: 'webinar', label: 'Webinars' },
  { key: 'conference', label: 'Conferences' },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const { items: events, loading, error } = useApiCollection('/events');
  const { items: galleryItems } = useApiCollection('/gallery');
  const [featuredFame, setFeaturedFame] = useState(null);
  
  useEffect(() => {
    if (!galleryItems.length) return;
    if (!featuredFame) setFeaturedFame(galleryItems[0]);
    const timer = setInterval(() => {
      setFeaturedFame(prev => {
        const index = galleryItems.findIndex(item => item.id === prev?.id);
        return galleryItems[(index + 1) % galleryItems.length];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryItems, featuredFame]);

  const filtered = activeTab === 'all' ? events : events.filter(e => e.cat === activeTab);

  return (
    <div>
      {/* Dark Hero */}
      <section className="events-hero">
        <div className="container">
          <div className="events-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Events</span></div>
            <h1 className="events-hero__title">Events & Community</h1>
            <p className="events-hero__desc">Join our hackathons, webinars, bootcamps, and networking panels. Build your engineering profile and connect with industry leaders.</p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="events-tabs">
              {TABS.map(tab => (
                <button 
                  key={tab.key} 
                  className={`event-tab-btn ${activeTab === tab.key ? 'active' : ''}`} 
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading && <p>Loading events…</p>}
          {error && <p role="alert">{error}</p>}
          <div className="events-grid">
            {filtered.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.05}>
                <div className="event-card">
                  <div className="event-card__image">
                    <img src={event.img} alt={event.title} loading="lazy" />
                  </div>
                  <div className="event-card__body">
                    <div className="event-card__header">
                    <span className={`badge ${event.color}`}>{event.type}</span>
                    <span className="event-card__date">
                      <Calendar size={14} /> {event.date}
                    </span>
                  </div>
                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__desc">{event.desc}</p>
                  {event.link ? (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                      Register Now
                    </a>
                  ) : (
                    <button className="btn btn-outline btn-sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} disabled>
                      Registration opening soon
                    </button>
                  )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {!loading && !error && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No events in this category yet. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Wall of Fame - Command Center Display */}
      {featuredFame && <section className="section section-dark fame-section">
        <div className="container">
          <ScrollReveal>
            <div className="fame-header">
              <span className="section-label">Wall of Fame</span>
              <h2 className="section-title">Life at CyberPro</h2>
              <p className="section-subtitle">A visual journey through our campuses, labs, and community events.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="fame-command-center">
              {/* Left: Featured Large Display */}
              <div className="fame-featured">
                <img 
                  key={`bg-${featuredFame.id}`}
                  className="fame-featured-bg"
                  src={featuredFame.img} 
                  alt="" 
                />
                <img 
                  key={`fg-${featuredFame.id}`}
                  className="fame-featured-fg"
                  src={featuredFame.img} 
                  alt={featuredFame.caption} 
                />
                <div className="fame-featured-overlay">
                  <h3>{featuredFame.caption}</h3>
                </div>
              </div>

              {/* Right: Interactive Thumbnail Grid */}
              <div className="fame-thumbnails">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`fame-thumb ${featuredFame.id === item.id ? 'active' : ''}`}
                    onMouseEnter={() => setFeaturedFame(item)}
                    onClick={() => setFeaturedFame(item)}
                  >
                    <img 
                      className="fame-thumb-bg"
                      src={item.img} 
                      alt="" 
                      loading="lazy" 
                    />
                    <img 
                      className="fame-thumb-fg"
                      src={item.img} 
                      alt={item.caption} 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Dark CTA Bottom */}
      <section className="events-cta">
        <div className="container">
          <ScrollReveal>
            <h2>Never Miss an Update</h2>
            <p>Join our community newsletter to get early access to exclusive hackathons, webinars, and tech meetups.</p>
            <div className="flex-center">
              <button className="btn btn-white btn-lg">Subscribe to Newsletter <ArrowRight size={18} /></button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

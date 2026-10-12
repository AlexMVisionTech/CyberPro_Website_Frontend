import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import useApiCollection from '../hooks/useApiCollection';
import './Events.css';

const EVENT_CATS = [
  { key: 'ctf', label: 'Hackathons & CTFs', chip: 'event-chip--ctf' },
  { key: 'bootcamp', label: 'Bootcamps', chip: 'event-chip--bootcamp' },
  { key: 'webinar', label: 'Webinars', chip: 'event-chip--webinar' },
  { key: 'conference', label: 'Conferences', chip: 'event-chip--conference' },
];

function catChip(cat) {
  return EVENT_CATS.find(c => c.key === cat)?.chip || 'event-chip--ctf';
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const normalized = dateStr.replace(/–\d+/, '');
  const ts = Date.parse(normalized);
  if (Number.isNaN(ts)) return null;
  const days = Math.ceil((ts - Date.now()) / 86400000);
  return days > 0 ? days : null;
}

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const { items: events, loading, error } = useApiCollection('/events');
  const { items: galleryItems } = useApiCollection('/gallery');
  const [featuredFame, setFeaturedFame] = useState(null);

  useEffect(() => {
    if (!galleryItems.length) return;
    if (!featuredFame) setFeaturedFame(galleryItems[0]);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setFeaturedFame(prev => {
        const index = galleryItems.findIndex(item => item.id === prev?.id);
        return galleryItems[(index + 1) % galleryItems.length];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryItems, featuredFame]);

  const tabs = [
    { key: 'all', label: 'All Events' },
    ...EVENT_CATS.filter(cat => events.some(e => e.cat === cat.key)),
  ];
  const filtered = activeTab === 'all' ? events : events.filter(e => e.cat === activeTab);

  return (
    <div>
      {/* Dark Hero */}
      <section className="events-hero">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="events-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Events</span></div>
            <h1 className="events-hero__title">Events &amp; Community</h1>
            <p className="events-hero__desc">Join our hackathons, webinars, bootcamps, and networking panels. Build your engineering profile and connect with industry leaders.</p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="events-tabs" role="group" aria-label="Event categories">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`event-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  aria-pressed={activeTab === tab.key}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading && (
            <div className="events-grid">
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
          <div className="events-grid">
            {filtered.map((event, i) => {
              const days = daysUntil(event.date);
              return (
                <ScrollReveal key={event.id} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="event-card">
                    <div className="event-card__image">
                      <img src={event.img} alt={event.title} loading="lazy" />
                    </div>
                    <div className="event-card__body">
                      <div className="event-card__header">
                        <span className={`event-chip ${catChip(event.cat)}`}>{event.type}</span>
                        {days && <span className="event-chip event-chip--soon">In {days} days</span>}
                      </div>
                      <h3 className="event-card__title">{event.title}</h3>
                      <p className="event-card__desc">{event.desc}</p>
                      <div className="event-card__meta">
                        <span className="event-card__meta-item"><Calendar size={13} aria-hidden="true" />{event.date}</span>
                        {event.location && <span className="event-card__meta-item"><MapPin size={13} aria-hidden="true" />{event.location}</span>}
                      </div>
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
              );
            })}
          </div>

          {!loading && !error && filtered.length === 0 && (
            <div className="events-empty">
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
              <h2 className="section-title">Life at Cyberpro</h2>
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
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <ScrollReveal>
            <span className="events-cta__kicker">Community</span>
            <h2>Never Miss an Update</h2>
            <p>Join our community newsletter to get early access to exclusive hackathons, webinars, and tech meetups.</p>
            <div className="flex-center">
              <button className="btn btn-primary btn-lg">Subscribe to Newsletter <ArrowRight size={18} /></button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

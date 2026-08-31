import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Camera } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Events.css';

const EVENTS = [
  { title: 'Zero-Day Cyber Defense CTF', date: 'Aug 15, 2026', type: 'Hackathon', cat: 'ctf', desc: 'Breach isolated virtual environments, capture dynamic flags, and earn points on the leaderboard.', color: 'badge-blue', img: '/images/events/ctf-cyber-defense.svg' },
  { title: 'Generative AI Security Pipelines', date: 'Sep 02, 2026', type: 'Webinar', cat: 'webinar', desc: 'Learn safe prompt parsing and hardening pipelines against model poisoning with guest speakers.', color: 'badge-orange', img: '/images/events/ai-security-webinar.svg' },
  { title: 'AWS Enterprise Cloud Foundations', date: 'Sep 20, 2026', type: 'Bootcamp', cat: 'bootcamp', desc: 'Intensive hands-on lab walkthrough of AWS container configuration, IAM, and bucket policies.', color: 'badge-green', img: '/images/events/aws-bootcamp.svg' },
  { title: 'SOC Operations Deep Dive', date: 'Oct 05, 2026', type: 'Webinar', cat: 'webinar', desc: 'Understand SIEM configuration, log correlation, and real-time alert triage in enterprise SOC environments.', color: 'badge-orange', img: '/images/events/soc-webinar.svg' },
  { title: 'Cyberweek Africa 2026', date: 'Oct 27-31, 2026', type: 'Conference', cat: 'conference', desc: 'Africa\'s premier cybersecurity summit on Cyber Threat Intelligence. 4800+ attendees, keynotes, workshops & panels at KICC Nairobi.', color: 'badge-orange', img: '/images/events/image.png', link: 'https://www.cyberweekafrica.com/register/' },
  { title: 'Cyberweek Africa Hackathon', date: 'Oct 27-30, 2026', type: 'Hackathon', cat: 'ctf', desc: 'Africa\'s premier cybersecurity innovation challenge. Build practical solutions for real-world cyber threats. Teams of 5. Students & professionals welcome.', color: 'badge-blue', img: '/images/events/image.png', link: 'https://www.cyberweekafrica.com/hackathon/' },
  { title: 'Network Forensics Challenge', date: 'Oct 18, 2026', type: 'CTF', cat: 'ctf', desc: 'Analyze packet captures, trace attack vectors, and reconstruct incident timelines.', color: 'badge-blue', img: '/images/events/network-forensics.svg' },
  { title: 'Python for Security Automation', date: 'Nov 01, 2026', type: 'Bootcamp', cat: 'bootcamp', desc: 'Build security automation scripts, API integrations, and threat intelligence collectors.', color: 'badge-green', img: '/images/events/python-bootcamp.svg' },
];

const TABS = [
  { key: 'all', label: 'All Events' },
  { key: 'ctf', label: 'Hackathons & CTFs' },
  { key: 'bootcamp', label: 'Bootcamps' },
  { key: 'webinar', label: 'Webinars' },
  { key: 'conference', label: 'Conferences' },
];

const FAME_ITEMS = [
  { id: 1, caption: 'Defcon Qualifier Team' },
  { id: 2, caption: 'Cyber Lab Inauguration' },
  { id: 3, caption: 'Cloud Security Bootcamp' },
  { id: 4, caption: 'Annual Hackathon' },
  { id: 5, caption: 'Guest Speaker Series' },
  { id: 6, caption: 'Capture The Flag' },
  { id: 7, caption: 'Networking Night' },
  { id: 8, caption: 'Red Team vs Blue Team' },
  { id: 9, caption: 'Graduation Ceremony' },
  { id: 10, caption: 'Malware Analysis Lab' },
  { id: 11, caption: 'VR Cyber Training' },
  { id: 12, caption: 'Community Meetup' },
  { id: 13, caption: 'Zero-Day Defense' },
  { id: 14, caption: 'Pen-Testing Workshop' },
  { id: 15, caption: 'Security Summit 2026' }
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const [featuredFame, setFeaturedFame] = useState(FAME_ITEMS[0]);
  
  // Make the featured image dynamic (auto-rotate every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedFame(prev => {
        const currentIndex = FAME_ITEMS.findIndex(item => item.id === prev.id);
        const nextIndex = (currentIndex + 1) % FAME_ITEMS.length;
        return FAME_ITEMS[nextIndex];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredFame]);

  const filtered = activeTab === 'all' ? EVENTS : EVENTS.filter(e => e.cat === activeTab);

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

          <div className="events-grid">
            {filtered.map((event, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
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
                    <button className="btn btn-primary btn-sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                      Register Now
                    </button>
                  )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No events in this category yet. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Wall of Fame - Command Center Display */}
      <section className="section section-dark fame-section">
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
                  src={`/images/cyberpro_story/${featuredFame.id}.jpeg`} 
                  alt="" 
                />
                <img 
                  key={`fg-${featuredFame.id}`}
                  className="fame-featured-fg"
                  src={`/images/cyberpro_story/${featuredFame.id}.jpeg`} 
                  alt={featuredFame.caption} 
                />
                <div className="fame-featured-overlay">
                  <h3>{featuredFame.caption}</h3>
                </div>
              </div>

              {/* Right: Interactive Thumbnail Grid */}
              <div className="fame-thumbnails">
                {FAME_ITEMS.map((item) => (
                  <div 
                    key={item.id} 
                    className={`fame-thumb ${featuredFame.id === item.id ? 'active' : ''}`}
                    onMouseEnter={() => setFeaturedFame(item)}
                    onClick={() => setFeaturedFame(item)}
                  >
                    <img 
                      className="fame-thumb-bg"
                      src={`/images/cyberpro_story/${item.id}.jpeg`} 
                      alt="" 
                      loading="lazy" 
                    />
                    <img 
                      className="fame-thumb-fg"
                      src={`/images/cyberpro_story/${item.id}.jpeg`} 
                      alt={item.caption} 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

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

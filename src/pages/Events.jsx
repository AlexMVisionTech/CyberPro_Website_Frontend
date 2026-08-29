import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Events.css';

const EVENTS = [
  { title: 'Zero-Day Cyber Defense CTF', date: 'Aug 15, 2026', type: 'Hackathon', cat: 'ctf', desc: 'Breach isolated virtual environments, capture dynamic flags, and earn points on the leaderboard.', color: 'badge-blue' },
  { title: 'Generative AI Security Pipelines', date: 'Sep 02, 2026', type: 'Webinar', cat: 'webinar', desc: 'Learn safe prompt parsing and hardening pipelines against model poisoning with guest speakers.', color: 'badge-orange' },
  { title: 'AWS Enterprise Cloud Foundations', date: 'Sep 20, 2026', type: 'Bootcamp', cat: 'bootcamp', desc: 'Intensive hands-on lab walkthrough of AWS container configuration, IAM, and bucket policies.', color: 'badge-green' },
  { title: 'SOC Operations Deep Dive', date: 'Oct 05, 2026', type: 'Webinar', cat: 'webinar', desc: 'Understand SIEM configuration, log correlation, and real-time alert triage in enterprise SOC environments.', color: 'badge-orange' },
  { title: 'Network Forensics Challenge', date: 'Oct 18, 2026', type: 'CTF', cat: 'ctf', desc: 'Analyze packet captures, trace attack vectors, and reconstruct incident timelines.', color: 'badge-blue' },
  { title: 'Python for Security Automation', date: 'Nov 01, 2026', type: 'Bootcamp', cat: 'bootcamp', desc: 'Build security automation scripts, API integrations, and threat intelligence collectors.', color: 'badge-green' },
];

const TABS = [
  { key: 'all', label: 'All Events' },
  { key: 'ctf', label: 'Hackathons & CTFs' },
  { key: 'bootcamp', label: 'Bootcamps' },
  { key: 'webinar', label: 'Webinars' },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
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
                  <div className="event-card__header">
                    <span className={`badge ${event.color}`}>{event.type}</span>
                    <span className="event-card__date">
                      <Calendar size={14} /> {event.date}
                    </span>
                  </div>
                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__desc">{event.desc}</p>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                    Register Now
                  </button>
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

      {/* Gallery */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Gallery</span>
              <h2 className="section-title">Life at CyberPro</h2>
              <p className="section-subtitle">Highlights from our campuses, student events, and project presentations.</p>
            </div>
          </ScrollReveal>
          
          <div className="gallery-grid">
            {['/images/gallery_1.jpg', '/images/gallery_2.jpg', '/images/gallery_3.jpg', '/images/gallery_4.jpg'].map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="gallery-item">
                  <img src={src} alt={`CyberPro campus ${i + 1}`} loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
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

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Server, ArrowRight, ChevronRight, Star, Building2, GraduationCap,
  CalendarDays, ChevronLeft, Radar, Clock
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Partners from '../components/sections/Partners';
import usePrograms from '../hooks/usePrograms';
import useApiCollection from '../hooks/useApiCollection';
import './Home.css';

const CAT_LABELS = {
  foundation: "Foundations",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

function programSlug(program) {
  return `/programs/${program.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${program.id}`;
}

const HERO_AUDIENCES = [
  {
    key: 'individuals',
    label: 'Individuals',
    desc: 'Hands-on labs, global certifications, and career support for your next role in security, AI, or cloud.',
    cta: 'Explore Programs',
    to: '/programs',
  },
  {
    key: 'industry',
    label: 'Industry',
    desc: 'Workforce capability programs that upskill teams across cybersecurity, cloud, and AI — built for enterprise scale.',
    cta: 'Industry Solutions',
    to: '/corporate',
  },
  {
    key: 'government',
    label: 'Government',
    desc: 'National cyber readiness — capability programs that secure public services and critical infrastructure.',
    cta: 'Government Solutions',
    to: '/government',
  },
];

function useTypewriter(text, speed = 42, startDelay = 350) {
  const [typed, setTyped] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text : ''
  );

  useEffect(() => {
    if (typed === text) return;
    let index = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return typed;
}

function eventTimestamp(event) {
  const match = event.date?.match(/[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4}/);
  const timestamp = match ? Date.parse(match[0]) : NaN;
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
}

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const step = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

function StatItem({ target, suffix, label }) {
  const [count, ref] = useCounter(target);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const TESTIMONIALS = [
  { initials: 'KO', name: 'Kevin Omondi', role: 'SOC Analyst at Safaricom', quote: 'The hands-on sandbox labs at Cyberpro Global were a game-changer. I transitioned from IT helpdesk to a SOC Analyst role within 6 months.' },
  { initials: 'AM', name: 'Amina M.', role: 'AI Engineer at Microsoft', quote: 'The curriculum offered the perfect balance of statistical theory and model deployment pipelines. Exactly what I needed to upskill.' },
  { initials: 'JN', name: 'Joseph Njuguna', role: 'Cloud Specialist at KCB Bank', quote: 'The AWS certification preparation sessions helped me pass on my first attempt. The lab simulation was extremely close to real-world production.' },
];

const GLOBE_LATITUDES = Array.from({ length: 9 }, (_, index) => -64 + index * 16);
const GLOBE_LONGITUDES = Array.from({ length: 12 }, (_, index) => index * 15);

function GlobeMatrix({ rotation }) {
  const longitude = `rotateY(${rotation}deg)`;
  return (
    <div className="hero__globe-scene" aria-label="Rotating three-dimensional Cyberpro network globe">
      <div className="hero__globe-halo" />
      <span className="hero__globe-bezel" aria-hidden="true" />
      <div className="hero__globe-shell">
        <div className="hero__globe-sphere">
          <div className="hero__globe-surface" />
          <div className="hero__globe-continents" />
          <div className="hero__globe-grid" style={{ transform: longitude }}>
            {GLOBE_LATITUDES.map(latitude => <span className="hero__globe-latitude" key={latitude} style={{ '--latitude': `${latitude}deg` }} />)}
            {GLOBE_LONGITUDES.map(degree => <span className={`hero__globe-longitude${degree === 0 ? ' hero__globe-longitude--scanner' : ''}`} key={degree} style={{ transform: `rotateY(${degree}deg)` }} />)}
          </div>
          <div className="hero__globe-network" aria-label="Academia, industry, and government connected through Cyberpro">
              <svg className="hero__globe-network-map" viewBox="0 0 300 300" aria-hidden="true">
                <defs><linearGradient id="networkFlow" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ff5f6f" /><stop offset=".52" stopColor="#b18cff" /><stop offset="1" stopColor="#7dd3fc" /></linearGradient></defs>
                <path className="hero__globe-network-arc hero__globe-network-arc--academia" d="M52 78 Q112 77 150 150" />
                <path className="hero__globe-network-arc hero__globe-network-arc--industry" d="M248 78 Q188 77 150 150" />
                <path className="hero__globe-network-arc hero__globe-network-arc--government" d="M150 264 Q122 205 150 150" />
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--academia" cx="52" cy="78" r="4">
                  <animate attributeName="r" values="4;5.4;4" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--industry" cx="248" cy="78" r="4">
                  <animate attributeName="r" values="4;5.4;4" dur="3.2s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--government" cx="150" cy="264" r="4">
                  <animate attributeName="r" values="4;5.4;4" dur="3.2s" begin="2s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-pulse hero__globe-network-pulse--academia" r="2.6" fill="#7dd3fc" opacity="0">
                  <animateMotion dur="5.5s" repeatCount="indefinite" path="M52 78 Q112 77 150 150" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur="5.5s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-pulse hero__globe-network-pulse--industry" r="2.6" fill="#b18cff" opacity="0">
                  <animateMotion dur="6.5s" begin="0.9s" repeatCount="indefinite" path="M248 78 Q188 77 150 150" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur="6.5s" begin="0.9s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-pulse hero__globe-network-pulse--government" r="2.6" fill="#ff5f6f" opacity="0">
                  <animateMotion dur="7s" begin="1.7s" repeatCount="indefinite" path="M150 264 Q122 205 150 150" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur="7s" begin="1.7s" repeatCount="indefinite" />
                </circle>
                <path className="hero__globe-network-threat" d="M-34,-18 Q-6,10 28,42" />
                <path className="hero__globe-network-threat" d="M334,262 Q300,246 272,212" />
                <circle className="hero__globe-network-threat-pulse" r="2.2" fill="#ff5f6f" opacity="0">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M-34,-18 Q-6,10 28,42" />
                  <animate attributeName="opacity" values="0;1;1;0.9;0" keyTimes="0;0.1;0.8;0.9;1" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-threat-pulse" r="2.2" fill="#ff5f6f" opacity="0">
                  <animateMotion dur="3.7s" begin="1.2s" repeatCount="indefinite" path="M334,262 Q300,246 272,212" />
                  <animate attributeName="opacity" values="0;1;1;0.9;0" keyTimes="0;0.1;0.8;0.9;1" dur="3.7s" begin="1.2s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-flash" cx="28" cy="42" r="1" opacity="0">
                  <animate attributeName="r" values="1;1;12" keyTimes="0;0.82;1" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.9;0" keyTimes="0;0.82;0.9;1" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle className="hero__globe-network-flash" cx="272" cy="212" r="1" opacity="0">
                  <animate attributeName="r" values="1;1;12" keyTimes="0;0.82;1" dur="3.7s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.9;0" keyTimes="0;0.82;0.9;1" dur="3.7s" begin="1.2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span className="hero__globe-network-name hero__globe-network-name--academia">ACADEMIA</span>
              <span className="hero__globe-network-name hero__globe-network-name--industry">INDUSTRY</span>
              <span className="hero__globe-network-name hero__globe-network-name--government">GOVERNMENT</span>
              <span className="hero__globe-network-brand"><img src="/logo%20blue.jpg" alt="Cyberpro" /></span>
          </div>
          <span className="hero__globe-scan" aria-hidden="true" />
          <span className="hero__globe-specular" aria-hidden="true" />
          <span className="hero__globe-specular hero__globe-specular--rim" aria-hidden="true" />
          <div className="hero__globe-front-glow" />
        </div>
      </div>
      <div className="hero__globe-orbit hero__globe-orbit--one"><i /></div>
      <div className="hero__globe-orbit hero__globe-orbit--two"><i /></div>
      <div className="hero__globe-signal hero__globe-signal--one" />
      <div className="hero__globe-signal hero__globe-signal--two" />
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAdvantage, setActiveAdvantage] = useState(1);
  const [audience, setAudience] = useState('individuals');
  const [globeRotation, setGlobeRotation] = useState(0);
  const globeRotationRef = useRef(0);
  const globeDragX = useRef(null);
  const { programs, loading: programsLoading, error: programsError } = usePrograms();
  const { items: events } = useApiCollection('/events');
  const filtered = (activeTab === 'all' ? programs : programs.filter(p => p.cat === activeTab)).slice(0, 6);
  const featuredEvent = events.find(event => event.title === 'Cyberweek Africa 2026')
    || [...events].filter(event => eventTimestamp(event) >= Date.now()).sort((a, b) => eventTimestamp(a) - eventTimestamp(b))[0];
  const featuredProgram = programs[0];
  const featuredEventImage = featuredEvent?.title === 'Cyberweek Africa 2026'
    ? '/images/events/cyberweek.png'
    : featuredEvent?.img;
  const featuredEventDays = (() => {
    if (!featuredEvent) return null;
    const ts = eventTimestamp(featuredEvent);
    if (ts === Number.MAX_SAFE_INTEGER) return null;
    const days = Math.ceil((ts - Date.now()) / 86400000);
    return days > 0 ? days : null;
  })();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame;
    let previousTime;
    const animateGlobe = (time) => {
      if (previousTime !== undefined) {
        const elapsed = Math.min(time - previousTime, 48);
        globeRotationRef.current = (globeRotationRef.current + elapsed * 0.006) % 360;
        setGlobeRotation(globeRotationRef.current);
      }
      previousTime = time;
      frame = requestAnimationFrame(animateGlobe);
    };
    frame = requestAnimationFrame(animateGlobe);
    return () => cancelAnimationFrame(frame);
  }, []);

  const dragGlobe = (event) => {
    globeDragX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveGlobe = (event) => {
    if (globeDragX.current !== null) {
      globeRotationRef.current = (globeRotationRef.current + (event.clientX - globeDragX.current) * 0.35) % 360;
      setGlobeRotation(globeRotationRef.current);
      globeDragX.current = event.clientX;
    }
  };

  const releaseGlobe = () => { globeDragX.current = null; };

  const featuredProgramSlug = featuredProgram ? programSlug(featuredProgram) : '/programs';
  const programTiers = ['foundation', 'intermediate', 'advanced', 'expert'].filter(cat => programs.some(p => p.cat === cat));
  const programTabs = [{ key: 'all', label: 'All Programs' }, ...programTiers.map(cat => ({ key: cat, label: CAT_LABELS[cat] }))];

  const activeAudience = HERO_AUDIENCES.find(a => a.key === audience) ?? HERO_AUDIENCES[0];
  const eyebrowText = useTypewriter('ADMISSIONS OPEN · 2026 COHORTS');
  const [hudCount, setHudCount] = useState(1284);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const countTimer = setInterval(() => setHudCount(c => c + Math.floor(Math.random() * 3) + 1), 2400);
    return () => clearInterval(countTimer);
  }, []);

  return (
    <div className="home">
      <section className="hero-nova" aria-label="Cyberpro Global introduction">
        <div className="hero-nova__backdrop" aria-hidden="true">
          <span className="hero-nova__photo" />
          <span className="hero-nova__photo-veil" />
          <span className="hero-nova__photo-glass" />
          <span className="hero-nova__aurora hero-nova__aurora--crimson" />
          <span className="hero-nova__aurora hero-nova__aurora--azure" />
          <span className="hero-nova__aurora hero-nova__aurora--violet" />
          <span className="hero-nova__gridlines" />
          <span className="hero-nova__stars">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </span>
          <span className="hero-nova__grain" />
        </div>

        <div className="container hero-nova__layout">
          <div className="hero-nova__content">
            <p className="hero-nova__eyebrow" aria-label="Admissions open · 2026 cohorts">
              <span className="hero-nova__eyebrow-prompt" aria-hidden="true">&gt;</span>
              <span className="hero-nova__eyebrow-dot" aria-hidden="true" />
              <span className="hero-nova__eyebrow-text">{eyebrowText}</span>
              <span className="hero-nova__eyebrow-cursor" aria-hidden="true" />
            </p>
            <h1 className="hero-nova__title">
              Master cyber defense the way it&rsquo;s <span className="hero-nova__title-accent">actually fought.</span>
            </h1>
            <p className="hero-nova__sub">
              Cyberpro Global trains professionals in live-fire labs, certification-aligned programs,
              and real-world career support — from first login to first day on the job.
            </p>
            <div className="hero-nova__audiences" aria-label="Choose your path">
              {HERO_AUDIENCES.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`hero-nova__audience-btn${audience === item.key ? ' hero-nova__audience-btn--active' : ''}`}
                  onClick={() => setAudience(item.key)}
                  aria-pressed={audience === item.key}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="hero-nova__audience-desc" key={audience}>
              {activeAudience.desc}
            </p>
            <div className="hero-nova__actions">
              <Link to={activeAudience.to} className="btn btn-primary btn-lg">{activeAudience.cta} <ArrowRight size={17} /></Link>
              <Link to="/contact" className="btn hero-nova__btn-ghost btn-lg"><Building2 size={17} /> Talk to our team</Link>
            </div>
          </div>

          <div className="hero-nova__visual">
            <div className="hero__globe-panel">
              <div className="hero__globe-hud" aria-label="Cyberpro network status">
                <span className="hero__globe-hud-brand"><Radar size={15} /><span><small>CYBERPRO / NETWORK 01</small><strong>GLOBAL DIGITAL NETWORK</strong></span></span>
                <span className="hero__globe-hud-live"><i /><span><small>NETWORK STATUS</small><strong><b>{hudCount.toLocaleString()}</b> LIVE CONNECTIONS</strong></span></span>
              </div>
              <div
                className="hero__globe-wrap"
                onPointerDown={dragGlobe}
                onPointerMove={moveGlobe}
                onPointerUp={releaseGlobe}
                onPointerCancel={releaseGlobe}
              >
                <GlobeMatrix rotation={globeRotation} />
              </div>
              <span className="hero__globe-values-rule" aria-hidden="true" />
              <div className="hero__globe-values" aria-label="Technology, Security, Resilience">
                <span className="hero__globe-values-word hero__globe-values-word--tech">Technology</span>
                <i aria-hidden="true" />
                <span className="hero__globe-values-word hero__globe-values-word--sec">Security</span>
                <i aria-hidden="true" />
                <span className="hero__globe-values-word hero__globe-values-word--res">Resilience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-nova__featured" aria-label="Featured at Cyberpro">
            <Link to="/events" className="hero-nova__fcard hero-nova__fcard--event">
              <span className="hero-nova__fcard-thumb">
                {featuredEventImage
                  ? <img src={featuredEventImage} alt="" loading="lazy" />
                  : <CalendarDays size={20} aria-hidden="true" />}
              </span>
              <span className="hero-nova__fcard-copy">
                <span className="hero-nova__fcard-status"><i aria-hidden="true" />EVENT{featuredEventDays ? ` · T-${featuredEventDays} DAYS` : ' · REGISTRATION OPEN'}</span>
                <strong>{featuredEvent?.title || 'Events & community'}</strong>
                <span>{[featuredEvent?.date, featuredEvent?.type || 'Workshops, webinars and meetups'].filter(Boolean).join(' · ')}</span>
              </span>
              <ArrowRight size={16} className="hero-nova__fcard-arrow" aria-hidden="true" />
            </Link>
            <Link to={featuredProgramSlug} className="hero-nova__fcard hero-nova__fcard--course">
              <span className="hero-nova__fcard-thumb">
                {featuredProgram?.img
                  ? <img src={featuredProgram.img} alt="" loading="lazy" />
                  : <GraduationCap size={20} aria-hidden="true" />}
              </span>
              <span className="hero-nova__fcard-copy">
                <span className="hero-nova__fcard-status"><i aria-hidden="true" />PROGRAM · ENROLLING NOW</span>
                <strong>{featuredProgram?.title || (programsLoading ? 'Loading programs…' : 'Professional learning')}</strong>
                <span>{featuredProgram?.dur || 'Practical, career-focused pathways'}</span>
              </span>
              <ArrowRight size={16} className="hero-nova__fcard-arrow" aria-hidden="true" />
            </Link>
            <Link to="/cyber-labs" className="hero-nova__fcard hero-nova__fcard--lab">
              <span className="hero-nova__fcard-thumb hero-nova__fcard-thumb--icon"><Server size={20} aria-hidden="true" /></span>
              <span className="hero-nova__fcard-copy">
                <span className="hero-nova__fcard-status"><i aria-hidden="true" />LAB · ALWAYS-ON</span>
                <strong>Virtual Cyber Labs</strong>
                <span>Practice in guided sandboxes</span>
              </span>
              <ArrowRight size={16} className="hero-nova__fcard-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <Partners />

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Professional learning</span>
              <h2 className="section-title">Build capability for what comes next.</h2>
              <p className="section-subtitle">Practical, certification-aligned programs in cybersecurity, cloud, AI, and digital governance — from first skills to specialist practice.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex-center" style={{ marginBottom: '32px' }}>
              <div className="tabs" role="group" aria-label="Program levels">
                {programTabs.map(tab => (
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
            </div>
          </ScrollReveal>

          <div className="grid grid-3">
            {programsLoading && [0, 1, 2].map(i => (
              <div className="program-card program-card--skeleton" key={`skeleton-${i}`}>
                <div className="program-card__image program-skeleton__block" />
                <div className="program-card__body">
                  <div className="program-skeleton__block program-skeleton__block--title" />
                  <div className="program-skeleton__block program-skeleton__block--text" />
                  <div className="program-skeleton__block program-skeleton__block--text program-skeleton__block--short" />
                </div>
              </div>
            ))}
            {programsError && <p role="alert">{programsError}</p>}
            {!programsLoading && !programsError && filtered.length === 0 && (
              <p className="programs-empty">No programs published in this level yet — explore another tier.</p>
            )}
            {filtered.map((prog, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="program-card">
                  <div className="program-card__image">
                    <img src={prog.img} alt={prog.title} loading="lazy" />
                    <span className="program-card__category">{CAT_LABELS[prog.cat]}</span>
                  </div>
                  <div className="program-card__body">
                    <h3 className="program-card__title"><Link to={programSlug(prog)}>{prog.title}</Link></h3>
                    <p className="program-card__desc">{prog.desc}</p>
                    <div className="program-card__meta">
                      <span className="program-card__dur"><Clock size={13} aria-hidden="true" />{prog.dur}</span>
                      <span className="badge badge-crimson">{prog.fee}</span>
                    </div>
                    <Link to={programSlug(prog)} className="card-link">
                      View Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/programs" className="btn btn-outline btn-lg">View All {programs.length} Programs <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="impact-section">
        <div className="container">
          <div className="impact-bar">
            <StatItem target={1500} suffix="+" label="Learners reached" />
            <div className="impact-divider" />
            <StatItem target={13} suffix="" label="Learning pathways" />
            <div className="impact-divider" />
            <StatItem target={45} suffix="+" label="Partner organizations" />
            <div className="impact-divider" />
            <StatItem target={94} suffix="%" label="Alumni employment" />
          </div>
        </div>
      </section>

      <section className="section section-alt advantages-section">
        <div className="container">
          <ScrollReveal>
            <div className="advantages-header">
              <div>
                <span className="section-label">Academia Advantages</span>
                <h2 className="section-title">Designed for Careers, Guided by Experts</h2>
              </div>
              <p className="section-subtitle">A practical learning environment built around real labs, certification readiness, competitive practice, and career support.</p>
            </div>
          </ScrollReveal>
          <div className="advantages-board">
            <ScrollReveal delay={0.05}>
              <div className="advantages-command">
                <span className="advantages-command__label">Career Readiness Map</span>
                <h3 className="advantages-command__title">From first lab to job-ready portfolio.</h3>
                <p className="advantages-command__desc">Every learner moves through a practical sequence: simulate, certify, compete, and launch.</p>
                <div className="advantages-command__metrics">
                  <div>
                    <strong>01</strong>
                    <span>Simulate</span>
                  </div>
                  <div>
                    <strong>02</strong>
                    <span>Certify</span>
                  </div>
                  <div>
                    <strong>03</strong>
                    <span>Compete</span>
                  </div>
                  <div>
                    <strong>04</strong>
                    <span>Launch</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className="advantages-grid" aria-label="Academy advantages accordion">
              {[
                { title: 'Virtual Labs Environment', desc: 'Access real sandbox servers, virtual networks, and live attack simulations directly inside your browser. No local configuration required.' },
                { title: 'Global Certifications', desc: 'Our curriculum strictly aligns with leading industry standards, preparing you for Cisco, CompTIA, AWS, EC-Council, and Microsoft exams.' },
                { title: 'CTF Competitions', desc: 'Participate in regular Capture The Flag events and hackathons. Compete with peers globally to sharpen your practical defensive skills.' },
                { title: 'Career Acceleration', desc: 'Benefit from dedicated mock interviews, CV optimization, and direct profile targeting for our network of global enterprise recruiters.' },
              ].map((f, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div
                    className={`feature-card${activeAdvantage === i ? ' feature-card--active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={activeAdvantage === i}
                    onMouseEnter={() => setActiveAdvantage(i)}
                    onFocus={() => setActiveAdvantage(i)}
                    onClick={() => setActiveAdvantage(i)}
                  >
                    <span className="feature-card__step">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="feature-card__title">{f.title}</h3>
                      <p className="feature-card__desc">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="labs-section">
        <div className="container">
          <ScrollReveal>
            <div className="labs-header">
              <div>
                <span className="labs-label">Virtual Labs Sandbox</span>
                <h2 className="labs-title">Fully Immersive In-Browser Labs</h2>
                <p className="labs-subtitle">Practice real-world scenarios in sandboxed environments. No installations, no configuration — just launch and learn.</p>
              </div>
              <Link to="/cyber-labs" className="btn btn-white btn-lg">Launch Sandbox Labs <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-4">
            {[
              { title: 'SOC Dashboard', desc: 'Simulated security operations center for real-time log audits, alert triage, and incident response.', tag: 'SOC Operations' },
              { title: 'Network Simulator', desc: 'Configure RIP, OSPF routers, VLANs, and packet filters in a live virtual topology.', tag: 'Network Defense' },
              { title: 'Linux Security Lab', desc: 'Server hardening, iptables firewall setups, SSH key management, and privilege audits.', tag: 'Linux Hardening' },
              { title: 'AI Security Sandbox', desc: 'Test machine learning models against adversarial inputs and data poisoning attacks.', tag: 'AI Threat Testing' },
            ].map((lab, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="lab-card">
                  <div className="lab-card__header">
                    <span className="lab-card__tag">{lab.tag}</span>
                  </div>
                  <div className="lab-card__terminal">
                    <div className="lab-card__terminal-line"><span className="lab-term-green">$</span> initializing sandbox...</div>
                    <div className="lab-card__terminal-line"><span className="lab-term-blue">→</span> environment ready</div>
                    <div className="lab-card__terminal-line"><span className="lab-term-yellow">⚡</span> awaiting input_</div>
                  </div>
                  <h3 className="lab-card__title">{lab.title}</h3>
                  <p className="lab-card__desc">{lab.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt success-section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">People and outcomes</span>
              <h2 className="section-title">Skills that make a difference.</h2>
              <p className="section-subtitle">Hear from professionals who have grown their capabilities with Cyberpro.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="testimonial-container">
              {TESTIMONIALS.map((t, i) => (
                <div className={`testimonial-card ${i === currentSlide ? 'testimonial-card--active' : ''}`} key={i}>
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#f4b63f" color="#f4b63f" />)}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="testimonial-controls">
              <button className="testimonial-arrow" aria-label="Previous testimonial" onClick={() => setCurrentSlide(s => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}><ChevronLeft size={18} /></button>
              <div className="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === currentSlide ? 'true' : undefined}
                />
              ))}
              </div>
              <button className="testimonial-arrow" aria-label="Next testimonial" onClick={() => setCurrentSlide(s => (s + 1) % TESTIMONIALS.length)}><ArrowRight size={18} /></button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="cta-section">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="hero__globe-values cta-values" aria-label="Technology, Security, Resilience">
            <span className="hero__globe-values-word hero__globe-values-word--tech">Technology</span>
            <i aria-hidden="true" />
            <span className="hero__globe-values-word hero__globe-values-word--sec">Security</span>
            <i aria-hidden="true" />
            <span className="hero__globe-values-word hero__globe-values-word--res">Resilience</span>
          </div>
          <span className="cta-kicker">Start a conversation</span>
          <h2 className="cta-title">
            <span>Let’s build a more</span>
            <span>capable, connected,</span>
            <span>and secure future.</span>
          </h2>
          <p className="cta-desc">Tell us what you’re working toward. We’ll help you find the right place to start.</p>
          <div className="flex-center gap-4">
            <Link to="/contact" className="btn btn-white btn-lg">Contact Cyberpro</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Learn about us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

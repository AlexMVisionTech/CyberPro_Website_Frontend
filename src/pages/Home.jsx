import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Brain, Cloud, Server,
  ArrowRight, ChevronRight, Star, Check, Building2, GraduationCap, CalendarDays,
  BriefcaseBusiness, ChevronLeft, Landmark
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Partners from '../components/sections/Partners';
import { useModal } from '../hooks/useModal.jsx';
import usePrograms from '../hooks/usePrograms';
import useApiCollection from '../hooks/useApiCollection';
import './Home.css';

const CAT_LABELS = {
  foundation: "Foundations",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const TABS = [
  { key: "all", label: "All Courses" },
  { key: "foundation", label: "Foundations" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "expert", label: "Expert" },
];

const HERO_FAST_PATHS = [
  { icon: Shield, title: 'Cybersecurity', text: 'SOC, ethical hacking, forensics, and risk.', to: '/programs' },
  { icon: Brain, title: 'AI & Data', text: 'AI, machine learning, automation, and analytics.', to: '/programs' },
  { icon: Cloud, title: 'Cloud & DevOps', text: 'Cloud platforms, networks, CI/CD, and containers.', to: '/programs' },
  { icon: Server, title: 'Virtual Labs', text: 'Practice real scenarios in guided sandboxes.', to: '/cyber-labs' },
];

const AUDIENCE_PATHS = [
  { icon: GraduationCap, title: 'Individuals', focus: 'LEARNING PATHWAYS', text: 'Develop practical skills for the next step in your technology career.', link: 'Explore learning', to: '/programs' },
  { icon: Building2, title: 'Industry', focus: 'WORKFORCE PARTNERSHIPS', text: 'Build digital capability across your teams and organization.', link: 'Explore solutions', to: '/corporate' },
  { icon: BriefcaseBusiness, title: 'Government', focus: 'PUBLIC RESILIENCE', text: 'Advance cyber readiness and technology skills across public services.', link: 'Start a conversation', to: '/contact' },
];

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
  { initials: 'KO', name: 'Kevin Omondi', role: 'SOC Analyst at Safaricom', quote: 'The hands-on sandbox labs at CyberPro Global were a game-changer. I transitioned from IT helpdesk to a SOC Analyst role within 6 months.' },
  { initials: 'AM', name: 'Amina M.', role: 'AI Engineer at Microsoft', quote: 'The curriculum offered the perfect balance of statistical theory and model deployment pipelines. Exactly what I needed to upskill.' },
  { initials: 'JN', name: 'Joseph Njuguna', role: 'Cloud Specialist at KCB Bank', quote: 'The AWS certification preparation sessions helped me pass on my first attempt. The lab simulation was extremely close to real-world production.' },
];

const TERMINAL_LINES = [
  { text: '[ALERT] Scanning 10.0.0.5...', color: 'alert' },
  { text: '[BLOCK] SQL injection attempt blocked at 14:18:01', color: 'block' },
  { text: '[SCAN] Port 22/tcp open - SSH brute force detected', color: 'alert' },
  { text: '[DEFEND] Firewall rule #1042 updated', color: 'defend' },
  { text: '[ALERT] XSS payload intercepted on /login', color: 'alert' },
  { text: '[OK] SSL certificate valid for cyberpro.global', color: 'ok' },
  { text: '[BLOCK] IP 192.168.1.45 banned - 3 failed attempts', color: 'block' },
  { text: '[DEFEND] IDS signature updated - 1,247 rules active', color: 'defend' },
  { text: '[ALERT] DDoS traffic spike detected - 15k req/s', color: 'alert' },
  { text: '[MITIGATE] Rate limiting enabled on gateway', color: 'defend' },
  { text: '[OK] Intrusion prevention system armed', color: 'ok' },
  { text: '[ALERT] Malware hash matched: Trojan.Win32.Emotet', color: 'alert' },
  { text: '[DEFEND] Endpoint isolated and quarantined', color: 'defend' },
  { text: '[BLOCK] Suspicious outbound connection to 45.33.x.x', color: 'block' },
  { text: '[OK] Security audit passed - 0 critical findings', color: 'ok' },
];

const GLOBE_LATITUDES = Array.from({ length: 9 }, (_, index) => -64 + index * 16);
const GLOBE_LONGITUDES = Array.from({ length: 12 }, (_, index) => index * 15);
const SECTOR_ROUTES = [
  { longitude: -34, latitude: 22, label: 'ACADEMIA' },
  { longitude: 24, latitude: -8, label: 'INDUSTRY' },
  { longitude: 152, latitude: -24, label: 'GOVERNMENT' },
];
const NETWORK_SECTORS = [
  { icon: GraduationCap, title: 'Academia', focus: 'Learning & research', to: '/programs' },
  { icon: Building2, title: 'Industry', focus: 'Workforce capability', to: '/corporate' },
  { icon: Landmark, title: 'Government', focus: 'Public resilience', to: '/contact' },
];

function GlobeMatrix({ rotation }) {
  const longitude = `rotateY(${rotation}deg)`;
  return (
    <div className="hero__globe-scene" aria-label="Rotating three-dimensional CyberPro network globe">
      <div className="hero__globe-halo" />
      <div className="hero__globe-shell">
        <div className="hero__globe-sphere">
          <div className="hero__globe-surface" />
          <div className="hero__globe-continents" />
          <div className="hero__globe-grid" style={{ transform: longitude }}>
            {GLOBE_LATITUDES.map(latitude => <span className="hero__globe-latitude" key={latitude} style={{ '--latitude': `${latitude}deg` }} />)}
            {GLOBE_LONGITUDES.map(degree => <span className="hero__globe-longitude" key={degree} style={{ transform: `rotateY(${degree}deg)` }} />)}
          </div>
          <div className="hero__globe-network" aria-label="Academia, industry, and government connected through CyberPro">
              <svg className="hero__globe-network-map" viewBox="0 0 300 300" aria-hidden="true">
                <defs><linearGradient id="networkFlow" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ff4568" /><stop offset=".52" stopColor="#9a91ff" /><stop offset="1" stopColor="#45e6f3" /></linearGradient></defs>
                <path className="hero__globe-network-arc hero__globe-network-arc--academia" d="M52 78 Q112 77 150 150" />
                <path className="hero__globe-network-arc hero__globe-network-arc--industry" d="M248 78 Q188 77 150 150" />
                <path className="hero__globe-network-arc hero__globe-network-arc--government" d="M150 264 Q122 205 150 150" />
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--academia" cx="52" cy="78" r="4" />
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--industry" cx="248" cy="78" r="4" />
                <circle className="hero__globe-network-endpoint hero__globe-network-endpoint--government" cx="150" cy="264" r="4" />
              </svg>
              <span className="hero__globe-network-name hero__globe-network-name--academia">ACADEMIA</span>
              <span className="hero__globe-network-name hero__globe-network-name--industry">INDUSTRY</span>
              <span className="hero__globe-network-name hero__globe-network-name--government">GOVERNMENT</span>
              <span className="hero__globe-network-brand"><img src="/logo%20blue.jpg" alt="CyberPro" /></span>
          </div>
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

function AutoTypingTerminal() {
  const [lines, setLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const current = TERMINAL_LINES[lineIndex];
    if (!current) return;

    const timeout = setTimeout(() => {
      setLines(prev => {
        const next = [...prev, current];
        if (next.length > 8) next.shift();
        return next;
      });
      setLineIndex((lineIndex + 1) % TERMINAL_LINES.length);
    }, 300 + Math.random() * 400);

    return () => clearTimeout(timeout);
  }, [lineIndex]);

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className={`hero__terminal-line hero__terminal-line--${line.color}`}>
          <span className="hero__terminal-prompt">{line.text}</span>
        </div>
      ))}
    </>
  );
}

function FeaturedEventCard() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const eventDate = new Date('2026-10-27T08:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const codeLines = [
    { text: '$ initialize --event="cyberweek-africa"', color: 'ok' },
    { text: '>> Loading threat_intelligence_modules...', color: 'defend' },
    { text: '>> Connecting to KICC-Nairobi servers...', color: 'alert' },
    { text: '>> 4800 delegates authenticated ✓', color: 'ok' },
    { text: '>> AI.Security.Ethics summit armed', color: 'defend' },
    { text: '>> Hackathon challenge deployed ✓', color: 'ok' },
    { text: '$ register --delegate --early-bird', color: 'alert' },
    { text: '>> Redirecting to cyberweekafrica.com...', color: 'defend' },
  ];

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCharIndex(0);
      }, 3000);
      return;
    }

    const line = codeLines[currentLine];
    if (charIndex < line.text.length) {
      const timeout = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(currentLine + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, charIndex]);

  return (
    <a href="https://www.cyberweekafrica.com/register/" target="_blank" rel="noopener noreferrer" className="cyberweek-card">
      <div className="cyberweek-card__scanline" />
      <div className="cyberweek-card__header">
        <div className="cyberweek-card__dots">
          <span /><span /><span />
        </div>
        <span className="cyberweek-card__filename">cyberweek-africa.exe</span>
        <div className="cyberweek-card__status">
          <span className="cyberweek-card__status-dot" />
          LIVE
        </div>
      </div>
      <div className="cyberweek-card__terminal">
        {displayedLines.map((line, i) => (
          <div key={i} className={`cyberweek-card__line cyberweek-card__line--${line.color}`}>
            {line.text}
          </div>
        ))}
        {currentLine < codeLines.length && (
          <div className={`cyberweek-card__line cyberweek-card__line--${codeLines[currentLine].color}`}>
            {codeLines[currentLine].text.slice(0, charIndex)}
            <span className="cyberweek-card__cursor">_</span>
          </div>
        )}
      </div>
      <div className="cyberweek-card__info">
        <div className="cyberweek-card__title-row">
          <span className="cyberweek-card__event-badge">FEATURED EVENT</span>
          <span className="cyberweek-card__date">Oct 27-31, 2026</span>
        </div>
        <h3 className="cyberweek-card__title">Cyberweek Africa</h3>
        <p className="cyberweek-card__venue">KICC, Nairobi • Cyber Threat Intelligence</p>
        <div className="cyberweek-card__countdown">
          <div className="cyberweek-card__countdown-item">
            <span className="cyberweek-card__countdown-value">{timeLeft.days}</span>
            <span className="cyberweek-card__countdown-label">Days</span>
          </div>
          <span className="cyberweek-card__countdown-sep">:</span>
          <div className="cyberweek-card__countdown-item">
            <span className="cyberweek-card__countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="cyberweek-card__countdown-label">Hrs</span>
          </div>
          <span className="cyberweek-card__countdown-sep">:</span>
          <div className="cyberweek-card__countdown-item">
            <span className="cyberweek-card__countdown-value">{String(timeLeft.mins).padStart(2, '0')}</span>
            <span className="cyberweek-card__countdown-label">Min</span>
          </div>
          <span className="cyberweek-card__countdown-sep">:</span>
          <div className="cyberweek-card__countdown-item">
            <span className="cyberweek-card__countdown-value">{String(timeLeft.secs).padStart(2, '0')}</span>
            <span className="cyberweek-card__countdown-label">Sec</span>
          </div>
        </div>
        <div className="cyberweek-card__cta">
          <span>Join 4800+ Delegates</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSector, setActiveSector] = useState('academia');
  const [globeRotation, setGlobeRotation] = useState(0);
  const globeRotationRef = useRef(0);
  const globeDragX = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAdvantage, setActiveAdvantage] = useState(1);
  const { openModal } = useModal();
  const { programs, loading: programsLoading, error: programsError } = usePrograms();
  const { items: events } = useApiCollection('/events');
  const filtered = (activeTab === 'all' ? programs : programs.filter(p => p.cat === activeTab)).slice(0, 6);
  const featuredEvent = events.find(event => event.title === 'Cyberweek Africa 2026')
    || [...events].filter(event => eventTimestamp(event) >= Date.now()).sort((a, b) => eventTimestamp(a) - eventTimestamp(b))[0];
  const featuredProgram = programs[0];
  const featuredEventImage = featuredEvent?.title === 'Cyberweek Africa 2026'
    ? '/images/events/cyberweek.png'
    : featuredEvent?.img;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
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

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid-overlay" />
        
        <div className="container hero__academy">
          <div className="hero__stage hero__stage--globe">
            <div className="hero__content hero__content--globe">
              <div className="hero__announcement" aria-label="Technology. Security. Resilience.">
                <span className="hero__announcement-dot" aria-hidden="true" />
                <span>Technology</span><b aria-hidden="true" />
                <span>Security</span><b aria-hidden="true" />
                <span>Resilience</span>
              </div>
              <h1 className="hero__title">Engineering <span className="hero__title-accent">Sovereign AI, Data Integrity <i aria-hidden="true">&amp;</i> Global Cyber Defense.</span></h1>
              <p className="hero__desc">CYBERPRO unites academia, enterprise, and government to build breach-resilient digital infrastructure across Africa and beyond.</p>
              <div className="hero__actions">
                <Link to="/about" className="btn btn-primary btn-lg">Discover Cyberpro <ArrowRight size={17} /></Link>
                <Link to="/contact" className="btn btn-outline btn-lg"><Building2 size={17} /> Talk to our team</Link>
              </div>
              <div className="hero__featured" aria-label="Featured at CyberPro">
                <div className="hero__featured-grid">
                  <Link to="/events" className="hero-feature-card hero-feature-card--event">
                    {featuredEventImage && <img className="hero-feature-card__image" src={featuredEventImage} alt="" />}
                    <span className="hero-feature-card__copy"><small>Featured event {featuredEvent?.date ? `· ${featuredEvent.date}` : ''}</small><strong>{featuredEvent?.title || 'Events & community'}</strong><span>{featuredEvent?.type || 'Workshops, webinars and meetups'}</span></span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link to={featuredProgram ? `/programs/${featuredProgram.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${featuredProgram.id}` : '/programs'} className="hero-feature-card hero-feature-card--course">
                    {featuredProgram?.img && <img className="hero-feature-card__image" src={featuredProgram.img} alt="" />}
                    <span className="hero-feature-card__copy"><small>Featured course</small><strong>{featuredProgram?.title || (programsLoading ? 'Explore our programs' : 'Professional learning')}</strong><span>{featuredProgram?.dur || 'Practical, career-focused pathways'}</span></span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link to="/cyber-labs" className="hero-feature-card hero-feature-card--lab">
                    <span className="hero-feature-card__icon"><Server size={18} /></span>
                    <span className="hero-feature-card__copy"><small>Featured lab</small><strong>Virtual Cyber Labs</strong><span>Practice in guided environments</span></span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="hero__globe-panel">
              <div className="hero__globe-hud">
                <span className="hero__globe-hud-brand"><Shield size={15} /><span><small>CYBERPRO / NETWORK 01</small><strong>GLOBAL DIGITAL NETWORK</strong></span></span>
                <span className="hero__globe-hud-live"><i /><span><small>NETWORK STATUS</small><strong>LIVE CONNECTIONS <b>WORLDWIDE</b></strong></span></span>
              </div>
              <div className="hero__globe-wrap" onPointerDown={event => { globeDragX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (globeDragX.current !== null) { globeRotationRef.current = (globeRotationRef.current + (event.clientX - globeDragX.current) * 0.35) % 360; setGlobeRotation(globeRotationRef.current); globeDragX.current = event.clientX; } }} onPointerUp={() => { globeDragX.current = null; }} onPointerCancel={() => { globeDragX.current = null; }}>
                <GlobeMatrix rotation={globeRotation} />
              </div>
              <div className="hero__globe-caption"><span>Cybersecurity <b>·</b> Artificial Intelligence</span></div>
            </div>
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
              <p className="section-subtitle">Explore practical pathways in cybersecurity, cloud, AI, and software development.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex-center" style={{ marginBottom: '32px' }}>
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
            </div>
          </ScrollReveal>

          <div className="grid grid-3">
            {programsLoading && <p>Loading courses…</p>}
            {programsError && <p role="alert">{programsError}</p>}
            {filtered.map((prog, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="program-card">
                  <div className="program-card__image">
                    <img src={prog.img} alt={prog.title} loading="lazy" />
                    <span className="program-card__category">{CAT_LABELS[prog.cat]}</span>
                  </div>
                  <div className="program-card__body">
                    <h3 className="program-card__title">{prog.title}</h3>
                    <p className="program-card__desc">{prog.desc}</p>
                    <div className="program-card__meta">
                      <span className="badge badge-navy">{prog.dur}</span>
                      <span className="badge badge-blue">{prog.fee}</span>
                      <span className="badge badge-green">{prog.lvl}</span>
                    </div>
                    <Link to="/programs" className="card-link">
                      View Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/programs" className="btn btn-outline btn-lg">View All {programs.length} Courses <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
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
                    <strong>4</strong>
                    <span>Career pillars</span>
                  </div>
                  <div>
                    <strong>13</strong>
                    <span>Programs</span>
                  </div>
                  <div>
                  <strong>4</strong>
                  <span>Learning advantages</span>
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

      <section className="section section-alt success-section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">People and outcomes</span>
              <h2 className="section-title">Skills that make a difference.</h2>
              <p className="section-subtitle">Hear from professionals who have grown their capabilities with CyberPro.</p>
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
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#5d9fbe" color="#5d9fbe" />)}
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
        <div className="container cta-inner">
          <span className="cta-kicker">Start a conversation</span>
          <h2 className="cta-title">
            <span>Let’s build a more</span>
            <span>capable, connected,</span>
            <span>and secure future.</span>
          </h2>
          <p className="cta-desc">Tell us what you’re working toward. We’ll help you find the right place to start.</p>
          <div className="flex-center gap-4">
            <Link to="/contact" className="btn btn-white btn-lg">Contact CyberPro</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Learn about us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

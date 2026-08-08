import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Lock, Brain, Cloud, BarChart3, Code2, Server,
  Users, Award, CheckCircle2, Monitor, Zap, ArrowRight,
  Terminal, Globe, ChevronRight, Star, Clock, Calendar
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Partners from '../components/sections/Partners';
import './Home.css';

const PROGRAMS = [
  { icon: Lock, title: 'Cybersecurity', desc: 'Defensive security, SOC operations, and risk management.', cat: 'security', dur: '6 Months', mode: 'Hybrid', lvl: 'Intermediate' },
  { icon: Shield, title: 'Ethical Hacking', desc: 'Penetration testing, vulnerability scanning, and wireless security.', cat: 'security', dur: '4 Months', mode: 'Remote', lvl: 'Advanced' },
  { icon: Brain, title: 'Artificial Intelligence', desc: 'Neural networks, computer vision, NLP, and generative AI.', cat: 'ai-data', dur: '6 Months', mode: 'Hybrid', lvl: 'Advanced' },
  { icon: Cloud, title: 'Cloud Computing', desc: 'AWS, Azure, GCP architecture and container orchestration.', cat: 'infra', dur: '5 Months', mode: 'Hybrid', lvl: 'Intermediate' },
  { icon: BarChart3, title: 'Data Science', desc: 'Statistical modeling, Python, Pandas, and Tableau visualization.', cat: 'ai-data', dur: '6 Months', mode: 'Remote', lvl: 'Beginner' },
  { icon: Code2, title: 'DevOps & Automation', desc: 'CI/CD pipelines, Docker, Kubernetes, and infrastructure as code.', cat: 'devops', dur: '4 Months', mode: 'Hybrid', lvl: 'Intermediate' },
];

const TABS = [
  { key: 'all', label: 'All Disciplines' },
  { key: 'security', label: 'Security' },
  { key: 'ai-data', label: 'AI & Data' },
  { key: 'infra', label: 'Cloud' },
  { key: 'devops', label: 'DevOps' },
];

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const filtered = activeTab === 'all' ? PROGRAMS : PROGRAMS.filter(p => p.cat === activeTab);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Admissions Open for 2026
            </div>
            <h1 className="hero__title">
              Master the Art of <span className="text-gradient">Digital Defense.</span>
            </h1>
            <p className="hero__desc">
              CyberPro Global equips future technology leaders with practical, certification-aligned training through hands-on virtual labs and expert mentorship.
            </p>
            <div className="hero__actions">
              <Link to="/programs" className="btn btn-primary btn-lg">Explore Programs <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Book a Consultation</Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__terminal">
              <div className="hero__terminal-header">
                <div className="hero__terminal-dots">
                  <span /><span /><span />
                </div>
                <span className="hero__terminal-title">security-lab@cyberpro:~</span>
              </div>
              <div className="hero__terminal-body">
                <AutoTypingTerminal />
              </div>
            </div>
            <img src="/images/hero_illustration.jpg" alt="Cybersecurity illustration" className="hero__illustration" />
            <div className="hero__float hero__float--1">
              <Shield size={16} /> 95% Practical
            </div>
            <div className="hero__float hero__float--2">
              <Award size={16} /> Certified
            </div>
            <div className="hero__float hero__float--3">
              <Terminal size={16} /> Live Labs
            </div>
          </div>
        </div>
      </section>

      <Partners />

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Academy Programs</span>
              <h2 className="section-title">Launch a High-Impact Tech Career</h2>
              <p className="section-subtitle">Select from expert-designed programs mapped to globally recognized certifications.</p>
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
            {filtered.map((prog, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="card">
                  <div className="program-icon">
                    <prog.icon size={22} />
                  </div>
                  <h3 className="card-title">{prog.title}</h3>
                  <p className="card-desc">{prog.desc}</p>
                  <div className="card-meta">
                    <span className="badge badge-navy">{prog.dur}</span>
                    <span className="badge badge-primary">{prog.mode}</span>
                    <span className="badge badge-green">{prog.lvl}</span>
                  </div>
                  <Link to="/programs" className="card-link">
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link to="/programs" className="btn btn-outline btn-lg">View All 13 Programs <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Academy Advantages</span>
              <h2 className="section-title">Designed for Careers, Guided by Experts</h2>
              <p className="section-subtitle">What sets CyberPro Global apart in producing high-caliber technology professionals.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-4">
            {[
              { icon: Terminal, title: 'Virtual Labs', desc: 'Real sandbox servers, virtual networks, and attack labs inside your browser.' },
              { icon: Award, title: 'Global Certs', desc: 'Prepare for Cisco, CompTIA, AWS, EC-Council, and Microsoft exams.' },
              { icon: Zap, title: 'CTF Competitions', desc: 'Regular Capture The Flag events and hackathons to sharpen skills.' },
              { icon: Users, title: 'Career Coaching', desc: 'Mock interviews, CV optimization, and profile targeting for global recruiters.' },
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="card">
                  <div className="program-icon"><f.icon size={22} /></div>
                  <h3 className="card-title">{f.title}</h3>
                  <p className="card-desc">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '24px', marginBottom: '36px' }}>
              <div>
                <span className="section-label">Virtual Labs Sandbox</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Fully Immersive In-Browser Labs</h2>
              </div>
              <Link to="/cyber-labs" className="btn btn-primary">Launch Sandbox Labs <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-4">
            {[
              { title: 'SOC Dashboard', desc: 'Simulated security operations center for log audits and alerts.', color: 'var(--primary)' },
              { title: 'Network Simulator', desc: 'Configure RIP, OSPF routers, and packet filters live.', color: 'var(--navy)' },
              { title: 'Linux Security Lab', desc: 'Server hardening, firewall setups, and privilege audits.', color: 'var(--crimson)' },
              { title: 'AI Security Sandbox', desc: 'Test assessment models on adversarial input sets.', color: 'var(--teal)' },
            ].map((lab, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="card lab-card">
                  <div className="lab-visual">
                    <div className="lab-bar lab-bar--accent" style={{ width: '60%' }} />
                    <div className="lab-bar" style={{ width: '40%' }} />
                    <div className="lab-bar lab-bar--accent" style={{ width: '80%' }} />
                  </div>
                  <h3 className="card-title">{lab.title}</h3>
                  <p className="card-desc">{lab.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <StatItem target={1500} suffix="+" label="Students Trained" />
            <StatItem target={13} suffix="" label="Academy Programs" />
            <StatItem target={45} suffix="+" label="Enterprise Partners" />
            <StatItem target={94} suffix="%" label="Alumni Placement Rate" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Student Success</span>
              <h2 className="section-title">Trusted by Alumni at Top Companies</h2>
              <p className="section-subtitle">Hear from CyberPro Global graduates who transitioned into technical roles.</p>
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
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="cta-title">Start Your Journey Toward Becoming a World-Class Technology Professional.</h2>
          <p className="cta-desc">Join hundreds of active students shaping the digital future at CyberPro Global.</p>
          <div className="flex-center gap-4">
            <Link to="/admissions" className="btn btn-white btn-lg">Apply Now</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

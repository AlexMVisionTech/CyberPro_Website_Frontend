import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Lock, Brain, Cloud, BarChart3, Code2, Server,
  Users, Award, CheckCircle2, Monitor, Zap, ArrowRight,
  Terminal, Globe, ChevronRight, Star, Clock, Calendar, Database
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Partners from '../components/sections/Partners';
import './Home.css';

const CAT_LABELS = {
  security: 'Security',
  'ai-data': 'AI & Data',
  infra: 'Infrastructure',
  devops: 'Development',
};

const PROGRAMS = [
  { icon: Lock, title: 'Cybersecurity', desc: 'Defensive security, SOC operations, and risk management.', cat: 'security', dur: '6 Months', mode: 'Hybrid', lvl: 'Intermediate', img: '/images/programs/cybersecurity.png' },
  { icon: Shield, title: 'Ethical Hacking', desc: 'Penetration testing, vulnerability scanning, and wireless security.', cat: 'security', dur: '4 Months', mode: 'Remote', lvl: 'Advanced', img: '/images/programs/ethical_hacking.png' },
  { icon: Brain, title: 'Artificial Intelligence', desc: 'Neural networks, computer vision, NLP, and generative AI.', cat: 'ai-data', dur: '6 Months', mode: 'Hybrid', lvl: 'Advanced', img: '/images/programs/ai_ml.png' },
  { icon: Cloud, title: 'Cloud Computing', desc: 'AWS, Azure, GCP architecture and container orchestration.', cat: 'infra', dur: '5 Months', mode: 'Hybrid', lvl: 'Intermediate', img: '/images/programs/cloud_computing.png' },
  { icon: BarChart3, title: 'Data Science', desc: 'Statistical modeling, Python, Pandas, and Tableau visualization.', cat: 'ai-data', dur: '6 Months', mode: 'Remote', lvl: 'Beginner', img: '/images/programs/data_science.png' },
  { icon: Code2, title: 'DevOps & Automation', desc: 'CI/CD pipelines, Docker, Kubernetes, and infrastructure as code.', cat: 'devops', dur: '4 Months', mode: 'Hybrid', lvl: 'Intermediate', img: '/images/programs/devops.png' },
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
        <div className="hero__grid-overlay" />
        
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-line"></span>
              <span className="hero__badge-text">Admissions Open 2026</span>
            </div>
            <h1 className="hero__title">
              Master the Art of <span className="text-gradient">Digital Defense.</span>
            </h1>
            <p className="hero__desc">
              CyberPro Global equips future technology leaders with rigorous, certification-aligned training through hands-on virtual sandbox environments.
            </p>
            <div className="hero__actions">
              <Link to="/programs" className="btn btn-primary btn-lg">Explore Programs</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Talk to Admissions</Link>
            </div>
            
            <div className="hero__trusted">
              <span className="hero__trusted-label">Trusted by alumni at top organizations globally</span>
              <div className="hero__trusted-logos">
                <Shield size={20} color="rgba(255,255,255,0.4)" />
                <Cloud size={20} color="rgba(255,255,255,0.4)" />
                <Server size={20} color="rgba(255,255,255,0.4)" />
                <Database size={20} color="rgba(255,255,255,0.4)" />
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__terminal-wrapper">
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
                <div className="program-card">
                  <div className="program-card__image">
                    <img src={prog.img} alt={prog.title} loading="lazy" />
                    <span className="program-card__category">{CAT_LABELS[prog.cat]}</span>
                  </div>
                  <div className="program-card__body">
                    <div className="program-card__icon">
                      <prog.icon size={20} />
                    </div>
                    <h3 className="program-card__title">{prog.title}</h3>
                    <p className="program-card__desc">{prog.desc}</p>
                    <div className="program-card__meta">
                      <span className="badge badge-navy">{prog.dur}</span>
                      <span className="badge badge-blue">{prog.mode}</span>
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
          <div className="grid grid-2">
            {[
              { icon: Terminal, title: 'Virtual Labs Environment', desc: 'Access real sandbox servers, virtual networks, and live attack simulations directly inside your browser. No local configuration required.' },
              { icon: Award, title: 'Global Certifications', desc: 'Our curriculum strictly aligns with leading industry standards, preparing you for Cisco, CompTIA, AWS, EC-Council, and Microsoft exams.' },
              { icon: Zap, title: 'CTF Competitions', desc: 'Participate in regular Capture The Flag events and hackathons. Compete with peers globally to sharpen your practical defensive skills.' },
              { icon: Users, title: 'Career Acceleration', desc: 'Benefit from dedicated mock interviews, CV optimization, and direct profile targeting for our network of global enterprise recruiters.' },
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="feature-card">
                  <div className="feature-card__icon"><f.icon size={24} /></div>
                  <div>
                    <h3 className="feature-card__title">{f.title}</h3>
                    <p className="feature-card__desc">{f.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
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
              { icon: Monitor, title: 'SOC Dashboard', desc: 'Simulated security operations center for real-time log audits, alert triage, and incident response.', tag: 'Security Ops' },
              { icon: Globe, title: 'Network Simulator', desc: 'Configure RIP, OSPF routers, VLANs, and packet filters in a live virtual topology.', tag: 'Networking' },
              { icon: Terminal, title: 'Linux Security Lab', desc: 'Server hardening, iptables firewall setups, SSH key management, and privilege audits.', tag: 'System Admin' },
              { icon: Brain, title: 'AI Security Sandbox', desc: 'Test machine learning models against adversarial inputs and data poisoning attacks.', tag: 'AI / ML' },
            ].map((lab, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="lab-card">
                  <div className="lab-card__header">
                    <div className="lab-card__icon">
                      <lab.icon size={22} />
                    </div>
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
            <StatItem target={1500} suffix="+" label="Students Trained" />
            <div className="impact-divider" />
            <StatItem target={13} suffix="" label="Academy Programs" />
            <div className="impact-divider" />
            <StatItem target={45} suffix="+" label="Enterprise Partners" />
            <div className="impact-divider" />
            <StatItem target={94} suffix="%" label="Alumni Placement" />
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

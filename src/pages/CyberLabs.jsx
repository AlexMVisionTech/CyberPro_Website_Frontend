import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Monitor, Wifi, Shield, Server, Database, Cpu, Lock, ArrowRight, PlayCircle } from 'lucide-react';
import './CyberLabs.css';

const LABS = [
  { icon: Monitor, title: 'SOC Dashboard', desc: 'Simulated security operations center for real-time log auditing and incident alerts.' },
  { icon: Wifi, title: 'Network Simulator', desc: 'Configure RIP, OSPF, BGP routers and manage packet filtering live.' },
  { icon: Terminal, title: 'Linux Security Lab', desc: 'Server hardening, iptables firewall setup, and user privilege audits.' },
  { icon: Shield, title: 'Penetration Testing', desc: 'Kali Linux environment for vulnerability scanning and exploitation practice.' },
  { icon: Server, title: 'Cloud Infrastructure', desc: 'AWS/Azure sandbox for VPC configuration, IAM policies, and S3 security.' },
  { icon: Database, title: 'Digital Forensics', desc: 'Disk imaging, memory analysis, and evidence chain management tools.' },
  { icon: Cpu, title: 'AI Security Sandbox', desc: 'Test ML models against adversarial inputs and poisoning attacks.' },
  { icon: Lock, title: 'Cryptography Lab', desc: 'Implement and break encryption algorithms, hashing, and PKI systems.' },
];

const COMMANDS = {
  help: 'Available commands:\n  scan     — Run a vulnerability scan on target network\n  harden   — Apply security hardening to server configuration\n  status   — Check system security status\n  whoami   — Display current user context\n  clear    — Clear terminal output',
  scan: '⟫ Initiating vulnerability scan...\n  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%\n  Port 22 (SSH) — OPEN — Key auth enforced\n  Port 80 (HTTP) — OPEN — Redirecting to HTTPS\n  Port 443 (HTTPS) — OPEN — TLS 1.3 active\n  Port 3306 (MySQL) — OPEN — WARNING: Public access\n  Port 8080 (Proxy) — OPEN — WARNING: No auth\n  Scan complete. 2 vulnerabilities detected.',
  harden: '⟫ Applying hardening procedures...\n  [1/4] Disabling root SSH login...          DONE\n  [2/4] Configuring UFW firewall rules...     DONE\n  [3/4] Enabling audit logging (auditd)...    DONE\n  [4/4] Patching MySQL public access...       DONE\n  All critical patches applied successfully.',
  status: '⟫ System Security Status:\n  OS:        Ubuntu 22.04 LTS (Hardened)\n  Firewall:  UFW Active (3 rules)\n  SSH:       Key-only, Port 2222\n  Updates:   All packages current\n  Threats:   0 active | 2 mitigated\n  Status:    SECURE',
  whoami: '  user@cyberpro-lab:~$ uid=1000(analyst) gid=1000(security)\n  Role: SOC Analyst L2 | Lab Environment',
};

export default function CyberLabs() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'CyberPro Global — Virtual Security Lab v2.0\nType "help" for available commands.\n' }
  ]);
  const [input, setInput] = useState('');
  const terminalBody = useRef(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (terminalBody.current) {
      terminalBody.current.scrollTop = terminalBody.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: `analyst@lab:~$ ${cmd}` }];

    if (cmd === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.\n' }]);
    } else {
      const response = COMMANDS[cmd] || `Command not found: "${cmd}". Type "help" for available commands.`;
      newHistory.push({ type: 'output', text: response });
      setHistory(newHistory);
    }
    setInput('');
  };

  return (
    <div>
      <section className="cyber-hero-premium">
        <div className="container cyber-hero__inner">
          <div className="cyber-hero__copy">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Cyber Labs</span>
            </div>
            <h1 className="page-hero__title">Virtual Cyber Labs</h1>
            <p className="page-hero__desc">Practice security operations, penetration testing, cloud defense, and forensics inside isolated browser-based sandboxes.</p>
            <div className="cyber-hero__actions">
              <a href="#lab-terminal" className="btn btn-primary btn-lg">Try Terminal <PlayCircle size={18} /></a>
              <Link to="/programs" className="btn btn-outline btn-lg">Explore Programs <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section cyber-labs-grid-section">
        <div className="container">
          <div className="cyber-section-heading">
            <span className="section-label">Lab Environments</span>
            <h2 className="section-title">8 Immersive Training Sandboxes</h2>
            <p className="section-subtitle">Each lab runs isolated virtual machines accessible directly from your browser.</p>
          </div>
          <div className="cyber-labs-grid">
            {LABS.map((lab, i) => (
              <div className="lab-card" key={i}>
                <div className="lab-card__icon"><lab.icon size={22} /></div>
                <h3 className="lab-card__title">{lab.title}</h3>
                <p className="lab-card__desc">{lab.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cyber-terminal-section" id="lab-terminal">
        <div className="terminal-glow"></div>
        <div className="container">
          <div className="cyber-section-heading cyber-section-heading--terminal">
            <span className="section-label">Live Demo</span>
            <h2 className="section-title">Interactive Security Terminal</h2>
            <p className="section-subtitle">Try our simulated CLI environment. Type <strong>help</strong>, <strong>scan</strong>, <strong>harden</strong>, or <strong>status</strong>.</p>
          </div>

          <div className="terminal">
            <div className="terminal__bar">
              <div className="terminal__dots">
                <span className="terminal__dot terminal__dot--red" />
                <span className="terminal__dot terminal__dot--yellow" />
                <span className="terminal__dot terminal__dot--green" />
              </div>
              <span className="terminal__title">analyst@cyberpro-lab ~ zsh</span>
            </div>
            <div className="terminal__body" ref={terminalBody}>
              {history.map((entry, i) => (
                <div key={i} className={`terminal__line terminal__line--${entry.type}`}>
                  {entry.text}
                </div>
              ))}
            </div>
            <form className="terminal__input-row" onSubmit={handleCommand}>
              <span className="terminal__prompt">analyst@lab:~$</span>
              <input
                className="terminal__input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a command..."
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ClipboardCheck, GraduationCap, Landmark, LockKeyhole, Network, ShieldCheck, Users } from 'lucide-react';
import './Government.css';

const CAPABILITIES = [
  { icon: Users, title: 'A cyber-aware workforce', text: 'Role-based learning for technical teams, leadership, frontline staff, and public service professionals.' },
  { icon: ShieldCheck, title: 'Operational readiness', text: 'Practical preparation for incident handling, threat awareness, secure operations, and recovery.' },
  { icon: Network, title: 'Secure digital services', text: 'Build understanding of cloud, data, identity, and connected systems as public services modernize.' },
];

const PRIORITIES = [
  { icon: GraduationCap, title: 'Assess current skills', text: 'Map roles, essential services, and capability gaps before choosing a training pathway.' },
  { icon: ClipboardCheck, title: 'Train by role', text: 'Combine foundational awareness with deeper technical or leadership development.' },
  { icon: LockKeyhole, title: 'Practice and improve', text: 'Use guided labs, scenarios, and follow-up learning to strengthen readiness over time.' },
];

export default function Government() {
  return (
    <div className="government-page">
      <section className="government-hero">
        <div className="government-hero__glow" />
        <div className="container government-hero__inner">
          <div>
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Government</span></div>
            <span className="section-label">Public Sector & Civic Services</span>
            <h1 className="page-hero__title">Build the capability behind trusted digital services.</h1>
            <p className="page-hero__desc">CyberPro works with public institutions to strengthen cybersecurity skills, support resilient operations, and help teams meet the demands of a changing digital environment.</p>
            <div className="government-hero__actions">
              <a className="btn btn-primary btn-lg" href="#engage">Plan a conversation <ArrowRight size={18} /></a>
              <Link className="btn btn-outline btn-lg" to="/programs">Explore learning programs</Link>
            </div>
          </div>
          <div className="government-hero__card">
            <div className="government-hero__card-icon"><Landmark size={28} /></div>
            <span>PUBLIC SECTOR CAPABILITY</span>
            <h2>People. Practice. Resilience.</h2>
            <p>Connect workforce development with the services and systems communities rely on.</p>
            <div className="government-hero__card-line"><Building2 size={17} /> Government agencies & institutions</div>
          </div>
        </div>
      </section>

      <section className="section" id="capability">
        <div className="container">
          <div className="government-heading"><span className="section-label">Capability Building</span><h2 className="section-title">Practical support for public sector teams</h2><p className="section-subtitle">Start with your institution’s mandate and context, then shape learning around the people responsible for delivering secure, dependable services.</p></div>
          <div className="government-card-grid">
            {CAPABILITIES.map(({ icon: Icon, title, text }) => <article className="government-card" key={title}><div className="government-card__icon"><Icon size={23} /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section government-priorities" id="priorities">
        <div className="container government-priorities__inner">
          <div><span className="section-label">A Clear Starting Point</span><h2 className="section-title">Readiness that grows with your institution</h2><p className="section-subtitle">Cyber readiness is ongoing work. A useful program connects learning to institutional priorities, gives teams a chance to practise, and creates a way to review progress.</p><Link to="/research" className="government-text-link">Explore our research areas <ArrowRight size={16} /></Link></div>
          <div className="government-steps">{PRIORITIES.map(({ icon: Icon, title, text }, i) => <article className="government-step" key={title}><div className="government-step__number">0{i + 1}</div><div className="government-step__icon"><Icon size={20} /></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section" id="engage">
        <div className="container"><div className="government-cta"><div><span className="section-label">Start a Conversation</span><h2>Let’s shape a pathway around your public service needs.</h2><p>Tell us about your teams, priorities, and preferred delivery approach. We’ll help identify a useful next step.</p></div><Link to="/contact" className="btn btn-primary btn-lg">Talk to our team <ArrowRight size={18} /></Link></div></div>
      </section>
    </div>
  );
}

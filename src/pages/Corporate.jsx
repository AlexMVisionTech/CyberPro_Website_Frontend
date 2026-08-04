import { Link } from 'react-router-dom';
import { Building2, Users, BarChart3, Shield, Target, Briefcase, ArrowRight } from 'lucide-react';
import './Programs.css';

const SERVICES = [
  { icon: Shield, title: 'Cybersecurity Awareness Training', desc: 'Equip your workforce with security best practices, phishing recognition, and incident response protocols.' },
  { icon: Building2, title: 'Enterprise Cloud Migration', desc: 'Hands-on cloud architecture workshops for IT teams transitioning to AWS, Azure, or GCP environments.' },
  { icon: Users, title: 'Leadership Tech Bootcamps', desc: 'Executive-level programs on AI strategy, digital transformation, and technology risk governance.' },
  { icon: BarChart3, title: 'Data Analytics Upskilling', desc: 'Train analysts and managers on Python, SQL, BI tools, and data-driven decision frameworks.' },
];

const METRICS = [
  { value: '45+', label: 'Corporate Partners' },
  { value: '3,200+', label: 'Employees Trained' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '12', label: 'Industry Sectors' },
];

export default function Corporate() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Corporate Training</span></div>
          <h1 className="page-hero__title">Corporate Training Solutions</h1>
          <p className="page-hero__desc">Custom technology training programs designed for enterprises, government agencies, and growing organizations.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Training Services</span>
            <h2 className="section-title">Tailored Programs for Your Organization</h2>
            <p className="section-subtitle">From cybersecurity awareness to advanced cloud migration — we design training that delivers measurable impact.</p>
          </div>
          <div className="grid grid-2" style={{ marginTop: '48px' }}>
            {SERVICES.map((s, i) => (
              <div className="card" key={i}>
                <div className="program-icon"><s.icon size={22} /></div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Impact</span>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
          </div>
          <div className="corporate-metrics">
            {METRICS.map((m, i) => (
              <div className="metric-card" key={i}>
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <span className="section-label">Get Started</span>
          <h2 className="section-title">Schedule a Training Consultation</h2>
          <p className="section-subtitle">Our enterprise team will assess your organization's needs and design a custom training roadmap.</p>
          <form onSubmit={e => { e.preventDefault(); alert('Thank you! Our enterprise team will contact you within 24 hours.'); e.target.reset(); }} style={{ textAlign: 'left', marginTop: '40px' }}>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-input" required placeholder="e.g. Safaricom PLC" />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input className="form-input" required placeholder="Full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input type="email" className="form-input" required placeholder="name@company.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Team Size</label>
              <select className="form-select" required>
                <option value="">Select team size</option>
                <option>5–20 employees</option>
                <option>20–50 employees</option>
                <option>50–200 employees</option>
                <option>200+ employees</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
              Request Custom Proposal <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

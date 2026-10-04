import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, BarChart3, Shield, ArrowRight, ClipboardCheck, Laptop, MapPin } from 'lucide-react';
import useApiCollection from '../hooks/useApiCollection';
import './Programs.css';

const SERVICE_ICONS = { Building2, Users, BarChart3, Shield };

export default function Corporate() {
  const { items: services, loading: servicesLoading, error: servicesError } = useApiCollection('/corporate/services');
  const { items: metrics, loading: metricsLoading, error: metricsError } = useApiCollection('/corporate/metrics');
  const [form, setForm] = useState({ company: '', contact_name: '', email: '', team_size: '', priority: '', delivery: '', details: '' });
  const [formMessage, setFormMessage] = useState('');

  const submitInquiry = (event) => {
    event.preventDefault();
    setFormMessage('');
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Corporate training inquiry: ${values.get('company')}`);
    const body = encodeURIComponent([
      `Organization: ${values.get('company')}`,
      `Contact: ${values.get('contact_name')}`,
      `Email: ${values.get('email')}`,
      `Estimated learners: ${values.get('team_size')}`,
      `Learning priority: ${values.get('priority')}`,
      `Preferred delivery: ${values.get('delivery')}`,
      '',
      values.get('details'),
    ].join('\n'));
    window.location.href = `mailto:corporate@cyberproglobal.com?subject=${subject}&body=${body}`;
    setFormMessage('Your email app should open with this consultation request prepared. If it does not, email corporate@cyberproglobal.com directly.');
  };

  return (
    <div>
      <section className="page-hero section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero__bg"></div>
        <div className="hero__grid-overlay" style={{ opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'white' }}>Corporate Training</span>
          </div>
          <h1 className="page-hero__title" style={{ color: 'white' }}>Corporate Training Solutions</h1>
          <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Custom technology training programs designed for enterprises, government agencies, and growing organizations.</p>
        </div>
      </section>

      <section className="section" id="training">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Training Services</span>
            <h2 className="section-title">Tailored Programs for Your Organization</h2>
            <p className="section-subtitle">From essential security awareness to specialized technical development, we shape learning around your roles, priorities, and starting point.</p>
          </div>
          {servicesLoading && <p>Loading corporate services…</p>}
          {servicesError && <p role="alert">{servicesError}</p>}
          <div className="grid grid-2" style={{ marginTop: '48px' }}>
            {services.map((s) => {
              const Icon = SERVICE_ICONS[s.icon] || Building2;
              return <div className="service-card" key={s.id}>
                <div className="service-card__icon"><Icon size={26} /></div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="delivery">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">How We Deliver</span>
            <h2 className="section-title">A practical path from skills gap to capability</h2>
            <p className="section-subtitle">Agree the outcomes first, then choose the format that works for your people and operations.</p>
          </div>
          <div className="grid grid-3" style={{ marginTop: '42px' }}>
            {[
              { icon: ClipboardCheck, title: 'Scope the need', text: 'Align on learner roles, current capability, business priorities, and useful measures of progress.' },
              { icon: Laptop, title: 'Choose a format', text: 'Plan instructor-led, remote, blended, or focused workshop delivery to fit your schedule.' },
              { icon: MapPin, title: 'Apply the learning', text: 'Use practical exercises and team-relevant scenarios, then identify sensible next steps.' },
            ].map(({ icon: Icon, title, text }) => <article className="service-card" key={title}>
              <div className="service-card__icon"><Icon size={25} /></div><h3 className="service-card__title">{title}</h3><p className="service-card__desc">{text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="outcomes" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero__bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Our Approach</span>
            <h2 className="section-title" style={{ color: 'white' }}>Designed for organizational needs</h2>
          </div>
          {metricsLoading && <p>Loading impact metrics…</p>}
          {metricsError && <p role="alert">{metricsError}</p>}
          <div className="corporate-metrics">
            {metrics.map((m) => (
              <div className="metric-card-dark" key={m.id}>
                <div className="metric-value-neon">{m.value}</div>
                <div className="metric-label-dark">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="corporate-form-card" id="inquiry">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-label" style={{ justifyContent: 'center' }}>Get Started</span>
              <h2 className="section-title">Schedule a Training Consultation</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Share your team’s roles, learning priorities, preferred format, and timing so we can have a useful first conversation.</p>
            </div>
            <form onSubmit={submitInquiry}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input className="form-input" required placeholder="e.g. Safaricom PLC" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input className="form-input" required placeholder="Full name" value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Work Email</label>
                  <input type="email" className="form-input" required placeholder="name@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Learners</label>
                    <select className="form-select" required value={form.team_size} onChange={e => setForm({ ...form, team_size: e.target.value })}>
                    <option value="">Select team size</option>
                    <option>Under 20 learners</option>
                    <option>20–50 learners</option>
                    <option>51–200 learners</option>
                    <option>More than 200 learners</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Main Learning Priority</label>
                  <select className="form-select" required value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                    <option value="">Choose a priority</option><option>Cybersecurity awareness</option><option>Technical security skills</option><option>Cloud and DevOps</option><option>Data and AI</option><option>Custom learning pathway</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Delivery</label>
                  <select className="form-select" required value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })}>
                    <option value="">Choose a format</option><option>In person</option><option>Remote</option><option>Blended</option><option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">What should the training help your team do?</label>
                <textarea className="form-textarea" required placeholder="Share your goals, roles, timing, or any requirements we should consider." value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
              </div>
              {formMessage && <p role="status" className="corporate-form-message">{formMessage}</p>}
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                Email Consultation Request <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

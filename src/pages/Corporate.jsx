import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, BarChart3, Shield, ArrowRight } from 'lucide-react';
import useApiCollection from '../hooks/useApiCollection';
import './Programs.css';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;
const SERVICE_ICONS = { Building2, Users, BarChart3, Shield };

export default function Corporate() {
  const { items: services, loading: servicesLoading, error: servicesError } = useApiCollection('/corporate/services');
  const { items: metrics, loading: metricsLoading, error: metricsError } = useApiCollection('/corporate/metrics');
  const [form, setForm] = useState({ company: '', contact_name: '', email: '', team_size: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const submitInquiry = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');
    setFormMessage('');
    try {
      const response = await fetch(`${API_BASE}/corporate/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || 'Unable to send your request. Please try again.');
      setForm({ company: '', contact_name: '', email: '', team_size: '' });
      setFormMessage('Thank you. Our corporate team will be in touch soon.');
    } catch (error) {
      setFormError(error.message || 'Unable to send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Training Services</span>
            <h2 className="section-title">Tailored Programs for Your Organization</h2>
            <p className="section-subtitle">From cybersecurity awareness to advanced cloud migration — we design training that delivers measurable impact.</p>
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

      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero__bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Impact</span>
            <h2 className="section-title" style={{ color: 'white' }}>Trusted by Industry Leaders</h2>
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
          <div className="corporate-form-card">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-label" style={{ justifyContent: 'center' }}>Get Started</span>
              <h2 className="section-title">Schedule a Training Consultation</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Our enterprise team will assess your organization's needs and design a custom training roadmap.</p>
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
                  <label className="form-label">Team Size</label>
                    <select className="form-select" required value={form.team_size} onChange={e => setForm({ ...form, team_size: e.target.value })}>
                    <option value="">Select team size</option>
                    <option>5–20 employees</option>
                    <option>20–50 employees</option>
                    <option>50–200 employees</option>
                    <option>200+ employees</option>
                  </select>
                </div>
              </div>
              {formError && <p role="alert" className="corporate-form-message corporate-form-message--error">{formError}</p>}
              {formMessage && <p role="status" className="corporate-form-message">{formMessage}</p>}
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }} disabled={submitting}>
                {submitting ? 'Sending request…' : 'Request Custom Proposal'} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

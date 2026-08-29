import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, User, BookOpen, Settings2, CheckCircle2 } from 'lucide-react';
import './ApplicationModal.css';

const PROGRAMS = [
  'Cybersecurity Specialist',
  'Ethical Hacking & Penetration Testing',
  'Artificial Intelligence & Machine Learning',
  'Cloud Computing & Architecture',
  'Data Science & Analytics',
  'DevOps & Automation',
  'Digital Forensics & Incident Response',
  'Network Engineering',
  'Full-Stack Software Development',
  'Database Administration',
  'IoT & Embedded Systems Security',
  'Blockchain & Web3 Security',
  'Emerging Technologies',
];

const STEPS = [
  { label: 'Personal Info', icon: User },
  { label: 'Program', icon: BookOpen },
  { label: 'Preferences', icon: Settings2 },
  { label: 'Review', icon: CheckCircle2 },
];

export default function ApplicationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', program: '',
    studyMode: '', paymentPlan: '', startDate: '', notes: '',
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! Our admissions team will contact you within 24 hours.');
    onClose();
    setStep(0);
    setForm({ fullName: '', email: '', phone: '', program: '', studyMode: '', paymentPlan: '', startDate: '', notes: '' });
  };

  const canNext = () => {
    if (step === 0) return form.fullName && form.email && form.phone;
    if (step === 1) return form.program;
    if (step === 2) return form.studyMode && form.paymentPlan;
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Dark Header */}
        <div className="modal-hero">
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
          <h2 className="modal-hero__title">Start Your Application</h2>
          <p className="modal-hero__desc">Join Africa's premier cybersecurity and technology academy.</p>

          {/* Step Indicator */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <div key={i} className={`stepper__step ${i === step ? 'stepper__step--active' : ''} ${i < step ? 'stepper__step--done' : ''}`}>
                <div className="stepper__circle">
                  {i < step ? <CheckCircle2 size={16} /> : <s.icon size={16} />}
                </div>
                <span className="stepper__label">{s.label}</span>
              </div>
            ))}
            <div className="stepper__track">
              <div className="stepper__progress" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form className="modal-form" onSubmit={handleSubmit}>

          {/* Step 1: Personal Info */}
          {step === 0 && (
            <div className="step-content">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-input" required placeholder="e.g. John Doe" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" required placeholder="name@domain.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" className="form-input" required placeholder="+254 700 000 000" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2: Program Selection */}
          {step === 1 && (
            <div className="step-content">
              <label className="form-label" style={{ marginBottom: '16px', display: 'block' }}>Select Your Program *</label>
              <div className="program-picker">
                {PROGRAMS.map((p, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`program-picker__item ${form.program === p ? 'program-picker__item--active' : ''}`}
                    onClick={() => update('program', p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 2 && (
            <div className="step-content">
              <div className="preference-group">
                <label className="form-label">Preferred Mode of Study *</label>
                <div className="option-grid">
                  {['Physical', 'Hybrid', 'Remote'].map(mode => (
                    <button type="button" key={mode}
                      className={`option-card ${form.studyMode === mode ? 'option-card--active' : ''}`}
                      onClick={() => update('studyMode', mode)}
                    >
                      <span className="option-card__radio"></span>
                      <span className="option-card__label">{mode}</span>
                      <span className="option-card__desc">
                        {mode === 'Physical' && 'In-person at our Westlands campus'}
                        {mode === 'Hybrid' && 'Mix of on-campus and online sessions'}
                        {mode === 'Remote' && 'Fully online, self-paced + live sessions'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="preference-group">
                <label className="form-label">Payment Plan *</label>
                <div className="option-grid option-grid--2">
                  {[
                    { key: 'Full Payment', desc: 'Pay once and save 10% on total fees' },
                    { key: 'Installments', desc: 'Split into 3 monthly payments' },
                  ].map(plan => (
                    <button type="button" key={plan.key}
                      className={`option-card ${form.paymentPlan === plan.key ? 'option-card--active' : ''}`}
                      onClick={() => update('paymentPlan', plan.key)}
                    >
                      <span className="option-card__radio"></span>
                      <span className="option-card__label">{plan.key}</span>
                      <span className="option-card__desc">{plan.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Start Date</label>
                  <input type="month" className="form-input" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <input type="text" className="form-input" placeholder="Anything else we should know?" value={form.notes} onChange={e => update('notes', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div className="step-content">
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Please review your application details below before submitting.
              </p>

              <div className="review-card">
                <h4 className="review-card__section">Personal Information</h4>
                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-item__label">Full Name</span>
                    <span className="review-item__value">{form.fullName || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Email Address</span>
                    <span className="review-item__value">{form.email || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Phone Number</span>
                    <span className="review-item__value">{form.phone || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <h4 className="review-card__section">Program Selection</h4>
                <div className="review-grid">
                  <div className="review-item review-item--full">
                    <span className="review-item__label">Selected Program</span>
                    <span className="review-item__value review-item__value--highlight">{form.program || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="review-card">
                <h4 className="review-card__section">Study Preferences</h4>
                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-item__label">Mode of Study</span>
                    <span className="review-item__value">{form.studyMode || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Payment Plan</span>
                    <span className="review-item__value">{form.paymentPlan || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Preferred Start Date</span>
                    <span className="review-item__value">{form.startDate || 'Not specified'}</span>
                  </div>
                  {form.notes && (
                    <div className="review-item review-item--full">
                      <span className="review-item__label">Additional Notes</span>
                      <span className="review-item__value">{form.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="modal-actions">
            {step > 0 && (
              <button type="button" className="btn btn-outline btn-md" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <div style={{ flex: 1 }}></div>
            {step < 3 ? (
              <button type="button" className="btn btn-primary btn-md" disabled={!canNext()} onClick={() => setStep(step + 1)}>
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Application <ArrowRight size={16} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

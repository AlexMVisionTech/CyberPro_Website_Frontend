import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, ArrowLeft, User, BookOpen, Settings2, CheckCircle2 } from 'lucide-react';
import './ApplicationModal.css';

const PROGRAMS = [
  { name: 'Cybersecurity Specialist', img: '/images/programs/cybersecurity.png' },
  { name: 'Ethical Hacking & Penetration Testing', img: '/images/programs/ethical_hacking.png' },
  { name: 'Artificial Intelligence & Machine Learning', img: '/images/programs/ai_ml.png' },
  { name: 'Cloud Computing & Architecture', img: '/images/programs/cloud_computing.png' },
  { name: 'Data Science & Analytics', img: '/images/programs/data_science.png' },
  { name: 'DevOps & Automation', img: '/images/programs/devops.png' },
  { name: 'Digital Forensics & Incident Response', img: '/images/programs/digital_forensics.png' },
  { name: 'Network Engineering', img: '/images/programs/network_engineering.jpg' },
  { name: 'Full-Stack Software Development', img: '/images/programs/fullstack_dev.jpg' },
  { name: 'Database Administration', img: '/images/programs/database_admin.jpg' },
  { name: 'IoT & Embedded Systems Security', img: '/images/programs/iot_security.jpg' },
  { name: 'Blockchain & Web3 Security', img: '/images/programs/blockchain.jpg' },
  { name: 'Emerging Technologies', img: '/images/programs/emerging_tech.jpg' },
];

const STEPS = [
  { label: 'Personal Info', icon: User },
  { label: 'Program', icon: BookOpen },
  { label: 'Preferences', icon: Settings2 },
  { label: 'Review', icon: CheckCircle2 },
];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  program: '',
  classFormat: '',
  studyMode: '',
  paymentPlan: '',
  startDate: '',
  experienceLevel: '',
  notes: '',
};

export default function ApplicationModal({ isOpen, onClose, selectedProgram = '' }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    program: selectedProgram,
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const resetForm = () => {
    setStep(0);
    setSubmitted(false);
    setForm({ ...INITIAL_FORM, program: selectedProgram || '' });
  };

  const handleClose = () => {
    onClose();
    setStep(0);
    setSubmitted(false);
  };

  useEffect(() => {
    if (selectedProgram) {
      setForm(prev => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setStep(3);
  };

  const canNext = () => {
    if (step === 0) return form.fullName && form.email && form.phone && form.location;
    if (step === 1) return form.program;
    if (step === 2) return form.classFormat && form.studyMode && form.paymentPlan && form.experienceLevel;
    return true;
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Dark Header */}
        <div className="modal-hero">
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">
            <X size={20} />
          </button>
          <h2 className="modal-hero__title">{submitted ? 'Application Received' : 'Start Your Application'}</h2>
          <p className="modal-hero__desc">
            {submitted
              ? 'Your application summary is shown below. Our admissions team will contact you within 24 hours.'
              : "Join Africa's premier cybersecurity and technology academy."}
          </p>

          {/* Step Indicator */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <div key={i} className={`stepper__step ${i === step ? 'stepper__step--active' : ''} ${i < step ? 'stepper__step--done' : ''}`}>
                <div className="stepper__circle">
                  {i < step ? <CheckCircle2 size={16} /> : <s.icon size={16} />}
                </div>
                <span className="stepper__meta">Step {i + 1}</span>
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
          {submitted ? (
            <div className="step-content">
              <div className="submission-panel">
                <div className="submission-panel__icon">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="submission-panel__title">Thank you, {form.fullName || 'Applicant'}.</h3>
                  <p className="submission-panel__desc">Your application has been captured successfully. Review the details below before closing.</p>
                </div>
              </div>

              <div className="review-card">
                <h4 className="review-card__section">Application Summary</h4>
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
                  <div className="review-item">
                    <span className="review-item__label">City / Country</span>
                    <span className="review-item__value">{form.location || '—'}</span>
                  </div>
                  <div className="review-item review-item--full">
                    <span className="review-item__label">Selected Program</span>
                    <span className="review-item__value review-item__value--highlight">{form.program || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Class Format</span>
                    <span className="review-item__value">{form.classFormat || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Learning Mode</span>
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
                  <div className="review-item">
                    <span className="review-item__label">Experience Level</span>
                    <span className="review-item__value">{form.experienceLevel || '—'}</span>
                  </div>
                  <div className="review-item review-item--full">
                    <span className="review-item__label">Career Goals / Notes</span>
                    <span className="review-item__value">{form.notes || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline btn-md" onClick={resetForm}>
                  Start New Application
                </button>
                <div style={{ flex: 1 }}></div>
                <button type="button" className="btn btn-primary btn-md" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>

          {/* Step 1: Personal Info */}
          {step === 0 && (
            <div className="step-content">
              <div className="form-section-heading">
                <span className="form-section-heading__eyebrow">Applicant Details</span>
                <h3 className="form-section-heading__title">Tell us who is applying</h3>
                <p className="form-section-heading__desc">Use the contact details our admissions team should use for your application follow-up.</p>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-input" required placeholder="e.g. John Doe" autoComplete="name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" required placeholder="name@domain.com" autoComplete="email" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" className="form-input" required placeholder="+254 700 000 000" autoComplete="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">City / Country *</label>
                  <input type="text" className="form-input" required placeholder="e.g. Nairobi, Kenya" autoComplete="address-level2" value={form.location} onChange={e => update('location', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Program Selection */}
          {step === 1 && (
            <div className="step-content">
              <div className="form-section-heading">
                <span className="form-section-heading__eyebrow">Program Selection</span>
                <h3 className="form-section-heading__title">Choose your training path</h3>
                <p className="form-section-heading__desc">Select the program you want the admissions team to discuss with you.</p>
              </div>
              <div className="program-picker">
                 {PROGRAMS.map((p, i) => (
                   <button
                     type="button"
                     key={i}
                     className={`program-picker__item ${form.program === p.name ? 'program-picker__item--active' : ''}`}
                     onClick={() => update('program', p.name)}
                   >
                     {p.name}
                   </button>
                 ))}
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 2 && (
            <div className="step-content">
              <div className="form-section-heading">
                <span className="form-section-heading__eyebrow">Study Preferences</span>
                <h3 className="form-section-heading__title">Set your preferred learning plan</h3>
                <p className="form-section-heading__desc">These details help us recommend the right schedule and onboarding route.</p>
              </div>
              <div className="preference-group">
                <label className="form-label">Class Format *</label>
                <div className="option-grid option-grid--2">
                  {[
                    { key: 'Full-time Classes', desc: 'A focused schedule for faster completion.' },
                    { key: 'Part-time Classes', desc: 'Flexible sessions for working professionals.' },
                  ].map(format => (
                    <button type="button" key={format.key}
                      className={`option-card ${form.classFormat === format.key ? 'option-card--active' : ''}`}
                      onClick={() => update('classFormat', format.key)}
                    >
                      <span className="option-card__radio"></span>
                      <span className="option-card__label">{format.key}</span>
                      <span className="option-card__desc">{format.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="preference-group">
                <label className="form-label">Learning Mode *</label>
                <div className="option-grid option-grid--2">
                  {[
                    { key: 'In-person Learning', desc: 'Attend guided classes at our academy.' },
                    { key: 'Remote Learning', desc: 'Join online classes and virtual labs.' },
                  ].map(mode => (
                    <button type="button" key={mode.key}
                      className={`option-card ${form.studyMode === mode.key ? 'option-card--active' : ''}`}
                      onClick={() => update('studyMode', mode.key)}
                    >
                      <span className="option-card__radio"></span>
                      <span className="option-card__label">{mode.key}</span>
                      <span className="option-card__desc">{mode.desc}</span>
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
                  <label className="form-label">Experience Level *</label>
                  <select className="form-input" required value={form.experienceLevel} onChange={e => update('experienceLevel', e.target.value)}>
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Career Switcher">Career Switcher</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Career Goals / Notes</label>
                <textarea className="form-input form-textarea" placeholder="Tell us about your goals, schedule needs, or questions." value={form.notes} onChange={e => update('notes', e.target.value)} />
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
                  <div className="review-item">
                    <span className="review-item__label">City / Country</span>
                    <span className="review-item__value">{form.location || '—'}</span>
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
                  {form.program && (() => {
                    const prog = PROGRAMS.find(p => p.name === form.program);
                    return prog ? (
                      <div className="review-item review-item--full">
                        <span className="review-item__label">Program Image</span>
                        <img src={prog.img} alt={form.program} style={{ width: '120px', height: 'auto', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>

              <div className="review-card">
                <h4 className="review-card__section">Study Preferences</h4>
                <div className="review-grid">
                  <div className="review-item">
                    <span className="review-item__label">Class Format</span>
                    <span className="review-item__value">{form.classFormat || '—'}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-item__label">Learning Mode</span>
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
                  <div className="review-item">
                    <span className="review-item__label">Experience Level</span>
                    <span className="review-item__value">{form.experienceLevel || '—'}</span>
                  </div>
                  {form.notes && (
                    <div className="review-item review-item--full">
                      <span className="review-item__label">Additional Notes</span>
                      <span className="review-item__value">{form.notes}</span>
                    </div>
                  )}
                  {!form.notes && (
                    <div className="review-item review-item--full">
                      <span className="review-item__label">Additional Notes</span>
                      <span className="review-item__value">Not specified</span>
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
            </>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
}

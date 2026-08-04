import { useState } from 'react';
import { X } from 'lucide-react';
import './ApplicationModal.css';

export default function ApplicationModal({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! Our admissions team will contact you within 24 hours.');
    onClose();
    e.target.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Start Your Application</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" required placeholder="e.g. John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" className="form-input" required placeholder="name@domain.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="tel" className="form-input" required placeholder="+254 700 000 000" />
            </div>
            <div className="form-group">
              <label className="form-label">Program of Interest *</label>
              <select className="form-select" required>
                <option value="">Select a program...</option>
                <option>Cybersecurity</option>
                <option>Ethical Hacking</option>
                <option>Artificial Intelligence</option>
                <option>Cloud Computing</option>
                <option>Data Science</option>
                <option>DevOps & Automation</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-textarea" placeholder="Tell us about your background and goals..." rows="4" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

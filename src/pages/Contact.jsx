import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Programs.css';

export default function Contact() {
  const [formMessage, setFormMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`CyberPro inquiry: ${values.get('subject')}`);
    const body = encodeURIComponent(`Name: ${values.get('name')}\nEmail: ${values.get('email')}\n\n${values.get('message')}`);
    window.location.href = `mailto:admissions@cyberproglobal.com?subject=${subject}&body=${body}`;
    setFormMessage('Your email app should open with this inquiry prepared. If it does not, email admissions@cyberproglobal.com directly.');
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
            <span style={{ color: 'white' }}>Contact</span>
          </div>
          <h1 className="page-hero__title" style={{ color: 'white' }}>Connect with CyberPro</h1>
          <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Have questions about enrollment, team training, or partnerships? Contact our Nairobi team and we’ll point you in the right direction.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '36px' }}>Main Office Campus Address</h2>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon"><MapPin size={20} /></div>
                  <div>
                     <h3>Main office</h3>
                      <a href="https://maps.app.goo.gl/V3BhMaRFrdq4aHc67" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>APA Arcade, 1st Floor Argwings Kodhek Rd,<br />Nairobi, Kenya</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><Phone size={20} /></div>
                  <div>
                    <h3>Registry Inquiries</h3>
                    <p><a href="tel:+254700123456">+254 700 123 456</a><br /><a href="tel:+254733987654">+254 733 987 654</a></p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><Mail size={20} /></div>
                  <div>
                    <h3>Email Addresses</h3>
                    <p><a href="mailto:admissions@cyberproglobal.com">admissions@cyberproglobal.com</a><br /><a href="mailto:corporate@cyberproglobal.com">corporate@cyberproglobal.com</a></p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><Clock size={20} /></div>
                  <div>
                    <h3>Office Hours</h3>
                    <p>Monday – Friday: 8:00 AM – 6:00 PM<br />Saturday: 9:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="contact-map">
                <MapPin size={32} style={{ color: 'rgba(254, 1, 28, 0.4)' }} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>APA Arcade, Nairobi</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Interactive map integration pending</span>
              </div>
            </div>

            <div className="contact-form-card">
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '28px' }}>Send a Direct Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Full Name</label>
                  <input id="contact-name" name="name" type="text" className="form-input" autoComplete="name" required placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" name="email" type="email" className="form-input" autoComplete="email" required placeholder="name@domain.com" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Inquiry Subject</label>
                  <select id="contact-subject" name="subject" className="form-select" required>
                    <option value="">Choose subject...</option>
                    <option>Admission Deadlines & Eligibility</option>
                    <option>Corporate Group Training</option>
                    <option>Research Collaboration</option>
                    <option>General Inquiries</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Inquiry Details</label>
                  <textarea id="contact-message" name="message" className="form-textarea" required placeholder="How can we assist you today?" style={{ height: '120px', resize: 'vertical' }} />
                </div>
                {formMessage && <p role="status" className="corporate-form-message">{formMessage}</p>}
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

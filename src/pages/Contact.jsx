import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Contact.css';

export default function Contact() {
  const [formMessage, setFormMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Cyberpro inquiry: ${values.get('subject')}`);
    const body = encodeURIComponent(`Name: ${values.get('name')}\nEmail: ${values.get('email')}\n\n${values.get('message')}`);
    window.location.href = `mailto:admissions@cyberproglobal.com?subject=${subject}&body=${body}`;
    setFormMessage('Your email app should open with this inquiry prepared. If it does not, email admissions@cyberproglobal.com directly.');
  };

  return (
    <div>
      {/* Hero */}
      <section className="contact-hero">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Contact</span>
          </div>
          <h1 className="page-hero__title">Connect with <span className="hero-nova__title-accent">Cyberpro.</span></h1>
          <p className="page-hero__desc">Have questions about enrollment, team training, or partnerships? Contact our Nairobi team and we&rsquo;ll point you in the right direction.</p>
          <div className="contact-hero__chips">
            <span className="contact-chip"><Phone size={14} aria-hidden="true" />+254 700 123 456</span>
            <span className="contact-chip"><Mail size={14} aria-hidden="true" />admissions@cyberproglobal.com</span>
            <span className="contact-chip"><MapPin size={14} aria-hidden="true" />APA Arcade, Nairobi</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <ScrollReveal>
              <div className="contact-info-panel">
                <span className="contact-info__label">Reach us directly</span>
                <h2 className="contact-info__title">Main Office, Nairobi</h2>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><MapPin size={19} aria-hidden="true" /></div>
                    <div>
                      <h3>Main office</h3>
                      <a href="https://maps.app.goo.gl/V3BhMaRFrdq4aHc67" target="_blank" rel="noopener noreferrer">
                        APA Arcade, 1st Floor Argwings Kodhek Rd,<br />Nairobi, Kenya
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><Phone size={19} aria-hidden="true" /></div>
                    <div>
                      <h3>Registry inquiries</h3>
                      <p><a href="tel:+254700123456">+254 700 123 456</a><br /><a href="tel:+254733987654">+254 733 987 654</a></p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><Mail size={19} aria-hidden="true" /></div>
                    <div>
                      <h3>Email</h3>
                      <p><a href="mailto:admissions@cyberproglobal.com">admissions@cyberproglobal.com</a><br /><a href="mailto:corporate@cyberproglobal.com">corporate@cyberproglobal.com</a></p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><Clock size={19} aria-hidden="true" /></div>
                    <div>
                      <h3>Office hours</h3>
                      <p>Monday – Friday: 8:00 AM – 6:00 PM<br />Saturday: 9:00 AM – 1:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="contact-map">
                  <MapPin size={28} aria-hidden="true" />
                  <span className="contact-map__place">APA Arcade, Nairobi</span>
                  <span className="contact-map__note">Interactive map integration pending</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="contact-form-card">
                <span className="contact-form-card__label">Send a message</span>
                <h2 className="contact-form-card__title">Tell us what you need</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Your full name</label>
                      <input id="contact-name" name="name" type="text" className="form-input" autoComplete="name" required placeholder="e.g. John Doe" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email address</label>
                      <input id="contact-email" name="email" type="email" className="form-input" autoComplete="email" required placeholder="name@domain.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Inquiry subject</label>
                    <select id="contact-subject" name="subject" className="form-select" required>
                      <option value="">Choose subject…</option>
                      <option>Admission Deadlines &amp; Eligibility</option>
                      <option>Corporate Group Training</option>
                      <option>Research Collaboration</option>
                      <option>General Inquiries</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Inquiry details</label>
                    <textarea id="contact-message" name="message" className="form-textarea" required placeholder="How can we assist you today?" />
                  </div>
                  {formMessage && <p role="status" className="contact-form-message">{formMessage}</p>}
                  <button type="submit" className="btn btn-primary btn-lg contact-form-submit">
                    Send Message <Send size={17} aria-hidden="true" />
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

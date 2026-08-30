import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Programs.css';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully. A coordinator will respond shortly.');
    e.target.reset();
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
          <p className="page-hero__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Have questions about enrollment, team training, or partnerships? Our Westlands team is ready to help.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '36px' }}>Main Office Campus Address</h2>
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
                    <p>+254 700 123 456<br />+254 733 987 654</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><Mail size={20} /></div>
                  <div>
                    <h3>Email Addresses</h3>
                    <p>admissions@cyberproglobal.com<br />corporate@cyberproglobal.com</p>
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
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Landmark Plaza, Westlands</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Interactive map integration pending</span>
              </div>
            </div>

            <div className="contact-form-card">
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '28px' }}>Send a Direct Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name</label>
                  <input type="text" className="form-input" required placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" required placeholder="name@domain.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Inquiry Subject</label>
                  <select className="form-select" required>
                    <option value="">Choose subject...</option>
                    <option>Admission Deadlines & Eligibility</option>
                    <option>Corporate Group Training</option>
                    <option>Research Collaboration</option>
                    <option>General Inquiries</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Inquiry Details</label>
                  <textarea className="form-textarea" required placeholder="How can we assist you today?" style={{ height: '120px', resize: 'vertical' }} />
                </div>
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

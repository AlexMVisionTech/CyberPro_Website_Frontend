import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin, Phone, ArrowRight, Camera } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand-col">
            <Link to="/" className="footer__brand">
              <img src="/logo.jpg" alt="CyberPro Global" className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              Africa's Premier Technology Academy. Building world-class cybersecurity, AI, and cloud professionals.
            </p>
             <div className="footer__contact-items">
               <div className="footer__contact-item">
                 <MapPin size={14} />
                 <a href="https://maps.app.goo.gl/V3BhMaRFrdq4aHc67" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>APA Arcade, Argwings Kodhek Rd, Nairobi</a>
               </div>
               <div className="footer__contact-item">
                 <Phone size={14} />
                 <span>+254 700 123 456</span>
               </div>
               <div className="footer__contact-item">
                 <Mail size={14} />
                 <span>admissions@cyberproglobal.com</span>
               </div>
                <div className="footer__contact-item">
                  <span style={{ fontSize: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <a href="https://www.linkedin.com/company/cyberpro-company/posts/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                    </a>
                    <a href="https://www.instagram.com/cyberproglobal/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Camera size={14} /> Instagram
                    </a>
                  </span>
                </div>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">Academy</h4>
            <ul className="footer__links">
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/cyber-labs">Cyber Labs</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/corporate">Corporate Training</Link></li>
              <li><Link to="/blog">Blog & Insights</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer__heading">Stay Updated</h4>
            <p className="footer__newsletter-desc">
              Get monthly insights on cybersecurity trends, new programs, and career opportunities.
            </p>
            <form className="footer__newsletter" onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
              <input type="email" placeholder="Your email" required />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} CyberPro Global. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

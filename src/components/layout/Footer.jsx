import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
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
                <span>Landmark Plaza, Westlands, Nairobi</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={14} />
                <span>+254 700 123 456</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={14} />
                <span>admissions@cyberproglobal.com</span>
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

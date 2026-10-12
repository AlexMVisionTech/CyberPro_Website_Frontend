import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowUpRight, ChevronDown, Menu, X,
  GraduationCap, Building2, Landmark, FlaskConical,
  Users, Layers, Target, MessageSquare,
} from 'lucide-react';
import ApplicationModal from './ApplicationModal.jsx';
import { useModal } from '../../hooks/useModal.jsx';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { label: 'Academia', accent: '#5ec1ff', intro: { eyebrow: 'Academia', text: 'Programs, pathways, and research for students, faculty, and institutions.' }, children: [
    { path: '/programs#academia', label: 'Academic Programs', description: 'Certification-aligned courses for students and faculty', icon: GraduationCap },
    { path: '/admissions#institutional', label: 'Institutional Pathways', description: 'Plan a cohort or campus partnership', icon: Building2 },
    { path: '/research#collaborate', label: 'Research Collaboration', description: 'Explore joint research opportunities', icon: FlaskConical },
  ], action: { path: '/programs', label: 'View all programs' } },
  { label: 'Industry', accent: '#b18cff', intro: { eyebrow: 'Industry', text: 'Practical workforce capability for teams and enterprises.' }, children: [
    { path: '/corporate#training', label: 'Workforce Training', description: 'Build practical skills across your teams', icon: Users },
    { path: '/corporate#delivery', label: 'How We Deliver', description: 'Flexible formats and learning pathways', icon: Layers },
    { path: '/research#collaborate', label: 'Research & Innovation', description: 'Collaborate on applied research', icon: FlaskConical },
  ], action: { path: '/corporate', label: 'View industry solutions' } },
  { label: 'Government', align: 'right', accent: '#ff5f6f', intro: { eyebrow: 'Government', text: 'Cyber readiness and skills for secure public services.' }, children: [
    { path: '/government#capability', label: 'Public Sector Capability', description: 'Build skills for secure digital services', icon: Landmark },
    { path: '/government#priorities', label: 'Readiness Priorities', description: 'Address people, process, and technology', icon: Target },
    { path: '/government#engage', label: 'Work With Cyberpro', description: 'Plan a government engagement', icon: MessageSquare },
  ], action: { path: '/government', label: 'Government solutions' } },
  { path: '/events', label: 'Events' },
  { path: '/blog', label: 'Blogs' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState('');
  const [desktopExpanded, setDesktopExpanded] = useState('');
  const { modalOpen, selectedProgram, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded('');
    setDesktopExpanded('');
  }, [location.pathname]);

  useEffect(() => {
    const closeMenus = (event) => {
      if (event.key === 'Escape') {
        setDesktopExpanded('');
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHome ? 'navbar--home' : ''}`}>
      <a href="#main-content" className="navbar__skip-link">Skip to content</a>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" aria-label="Cyberpro Global — home">
          <img src="/logo.jpg" alt="Cyberpro Global" className="navbar__logo" />
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_ITEMS.map(item => item.children ? (
            <div
              className="navbar__dropdown"
              key={item.label}
              style={{ '--menu-accent': item.accent }}
              onMouseEnter={() => setDesktopExpanded(item.label)}
              onMouseLeave={() => setDesktopExpanded('')}
            >
              <button
                className={`navbar__link navbar__dropdown-trigger ${item.children.some(link => location.pathname.startsWith(link.path.split('#')[0])) ? 'navbar__link--active' : ''}`}
                aria-haspopup="true"
                aria-expanded={desktopExpanded === item.label}
                onClick={() => setDesktopExpanded(desktopExpanded === item.label ? '' : item.label)}
              >
                {item.label}<ChevronDown className={desktopExpanded === item.label ? 'navbar__chevron--open' : ''} size={14} aria-hidden="true" />
              </button>
              <div className={`navbar__dropdown-menu ${desktopExpanded === item.label ? 'navbar__dropdown-menu--open' : ''} ${item.align === 'right' ? 'navbar__dropdown-menu--right' : ''}`}>
                {item.intro && (
                  <div className="navbar__dropdown-intro">
                    <span className="navbar__dropdown-eyebrow">{item.intro.eyebrow}</span>
                    <p>{item.intro.text}</p>
                  </div>
                )}
                <div className="navbar__dropdown-items">
                  {item.children.map(link => (
                    <NavLink
                      key={`${item.label}-${link.label}`}
                      to={link.path}
                      onClick={() => setDesktopExpanded('')}
                      className={({ isActive }) => `navbar__dropdown-link ${isActive ? 'active' : ''}`}
                    >
                      {link.icon && <span className="navbar__dropdown-icon"><link.icon size={16} aria-hidden="true" /></span>}
                      <span>{link.label}<small>{link.description}</small></span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </NavLink>
                  ))}
                </div>
                <NavLink to={item.action.path} onClick={() => setDesktopExpanded('')} className="navbar__dropdown-action">{item.action.label}<ArrowUpRight size={15} aria-hidden="true" /></NavLink>
              </div>
            </div>
          ) : (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button onClick={() => openModal()} className="btn btn-primary btn-sm navbar__cta">
            Apply Now
          </button>
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} id="mobile-navigation" inert={!mobileOpen}>
        <div className="navbar__mobile-head">
          <span className="navbar__mobile-head-label">Menu</span>
          <button className="navbar__mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="navbar__mobile-links" aria-label="Mobile navigation">
          {NAV_ITEMS.map(item => item.children ? (
            <div className="navbar__mobile-group" key={item.label}>
              <button className="navbar__mobile-group-trigger" aria-expanded={mobileExpanded === item.label} onClick={() => setMobileExpanded(mobileExpanded === item.label ? '' : item.label)}>
                <span>{item.label}</span><ChevronDown className={mobileExpanded === item.label ? 'navbar__chevron--open' : ''} size={16} />
              </button>
              {mobileExpanded === item.label && <div className="navbar__mobile-submenu">{item.children.map(link => <NavLink key={`${item.label}-${link.label}`} to={link.path} onClick={() => setMobileOpen(false)} className={({ isActive }) => `navbar__mobile-link navbar__mobile-sublink ${isActive ? 'navbar__mobile-link--active' : ''}`}><span>{link.label}<small>{link.description}</small></span></NavLink>)}<NavLink to={item.action.path} onClick={() => setMobileOpen(false)} className="navbar__mobile-cta">{item.action.label}<ArrowUpRight size={15} /></NavLink></div>}
            </div>
          ) : (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setMobileOpen(false)} className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
          <button onClick={() => openModal()} className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
            Apply Now
          </button>
        </nav>
        <div className="navbar__mobile-footer">
          <span className="navbar__mobile-footer-label">Talk to us</span>
          <a href="tel:+254700123456">+254 700 123 456</a>
          <a href="mailto:admissions@cyberproglobal.com">admissions@cyberproglobal.com</a>
        </div>
      </div>

      {mobileOpen && (
        <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />
      )}

      <ApplicationModal isOpen={modalOpen} onClose={closeModal} selectedProgram={selectedProgram} />
    </header>
  );
}

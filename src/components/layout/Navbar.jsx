import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import ApplicationModal from './ApplicationModal.jsx';
import { useModal } from '../../hooks/useModal.jsx';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { label: 'Academia', children: [
    { path: '/programs#academia', label: 'Academic Programs', description: 'Courses for students and faculty' },
    { path: '/admissions#institutional', label: 'Institutional Pathways', description: 'Plan a cohort or campus partnership' },
    { path: '/research#collaborate', label: 'Research Collaboration', description: 'Explore joint research opportunities' },
  ], action: { path: '/programs', label: 'View all programs' } },
  { label: 'Industry', children: [
    { path: '/corporate#training', label: 'Workforce Training', description: 'Build practical skills across your teams' },
    { path: '/corporate#delivery', label: 'How We Deliver', description: 'Flexible formats and learning pathways' },
    { path: '/research#collaborate', label: 'Research & Innovation', description: 'Collaborate on applied research' },
  ], action: { path: '/corporate', label: 'View industry solutions' } },
  { label: 'Government', children: [
    { path: '/government#capability', label: 'Public Sector Capability', description: 'Build skills for secure digital services' },
    { path: '/government#priorities', label: 'Readiness Priorities', description: 'Address people, process, and technology' },
    { path: '/government#engage', label: 'Work With CyberPro', description: 'Plan a government engagement' },
  ], action: { path: '/government', label: 'Government solutions' } },
  { path: '/events', label: 'Events' },
  { path: '/blog', label: 'Blogs' },
  { path: '/about', label: 'About' },
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
      if (event.key === 'Escape') setDesktopExpanded('');
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHome ? 'navbar--home' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <img src="/logo.jpg" alt="CyberPro Global" className="navbar__logo" />
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_ITEMS.map(item => item.children ? (
            <div className="navbar__dropdown" key={item.label}>
              <button className={`navbar__link navbar__dropdown-trigger ${item.children.some(link => location.pathname.startsWith(link.path.split('#')[0])) ? 'navbar__link--active' : ''}`} aria-haspopup="true" aria-expanded={desktopExpanded === item.label} onClick={() => setDesktopExpanded(desktopExpanded === item.label ? '' : item.label)}>
                {item.label}<ChevronDown className={desktopExpanded === item.label ? 'navbar__chevron--open' : ''} size={14} aria-hidden="true" />
              </button>
              <div className={`navbar__dropdown-menu ${desktopExpanded === item.label ? 'navbar__dropdown-menu--open' : ''}`}>
                <div className="navbar__dropdown-items">
                  {item.children.map(link => <NavLink key={`${item.label}-${link.label}`} to={link.path} onClick={() => setDesktopExpanded('')} className="navbar__dropdown-link"><span>{link.label}<small>{link.description}</small></span><ArrowUpRight size={16} /></NavLink>)}
                </div>
                <NavLink to={item.action.path} onClick={() => setDesktopExpanded('')} className="navbar__dropdown-action">{item.action.label}<ArrowUpRight size={15} /></NavLink>
              </div>
            </div>
          ) : (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button onClick={() => openModal()} className="btn btn-primary btn-sm">
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
        <nav className="navbar__mobile-links" aria-label="Mobile navigation">
          {NAV_ITEMS.map(item => item.children ? (
            <div className="navbar__mobile-group" key={item.label}>
              <button className="navbar__mobile-group-trigger" aria-expanded={mobileExpanded === item.label} onClick={() => setMobileExpanded(mobileExpanded === item.label ? '' : item.label)}>
                <span>{item.label}</span><ChevronDown className={mobileExpanded === item.label ? 'navbar__chevron--open' : ''} size={16} />
              </button>
              {mobileExpanded === item.label && <div className="navbar__mobile-submenu">{item.children.map(link => <NavLink key={`${item.label}-${link.label}`} to={link.path} className={({ isActive }) => `navbar__mobile-link navbar__mobile-sublink ${isActive ? 'navbar__mobile-link--active' : ''}`}><span>{link.label}<small>{link.description}</small></span></NavLink>)}<NavLink to={item.action.path} className="navbar__mobile-cta">{item.action.label}<ArrowUpRight size={15} /></NavLink></div>}
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
      </div>

      {mobileOpen && (
        <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />
      )}

      <ApplicationModal isOpen={modalOpen} onClose={closeModal} selectedProgram={selectedProgram} />
    </header>
  );
}

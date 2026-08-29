import ScrollReveal from '../ScrollReveal';
import './Partners.css';

const PARTNER_LOGOS = [
  { src: '/partners/ictalogo.png', alt: 'ICTA Logo' },
  { src: '/partners/ksglogo.jpg', alt: 'KSG Logo' },
  { src: '/partners/art_032814_side01.jpg', alt: 'ART Partner' },
  { src: '/partners/logo.png', alt: 'Partner Logo' },
  { src: '/partners/mmulogo1.png', alt: 'MMU Logo' },
  { src: '/partners/UoN_Logo.png', alt: 'University of Nairobi' },
  { src: '/partners/fd2b085c-c21b-408d-9439-e2531bb5e66a.png', alt: 'Partner Organization' },
];

export default function Partners() {
  return (
    <section className="partners-section">
      <div className="container">
        <ScrollReveal>
          <div className="partners-header">
            <span className="section-label">Our Partners</span>
            <h2 className="partners-title">Trusted by Leading Institutions</h2>
            <p className="partners-subtitle">
              Collaborating with top universities, government agencies, and industry leaders to deliver world-class technology education.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="partners-marquee-container">
          <div className="partners-marquee">
            {/* Double the array for seamless infinite scroll */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
              <div className="partner-card" key={index}>
                <div className="partner-logo-wrapper">
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="partner-logo"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

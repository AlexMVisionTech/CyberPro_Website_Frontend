import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle2, Banknote, FileText, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Admissions.css';

const STEPS = [
  { num: '01', title: 'Choose Your Program', desc: 'Explore our 13 disciplines and select the track that aligns with your career goals.' },
  { num: '02', title: 'Submit Application', desc: 'Complete the online application form with your academic background and professional interests.' },
  { num: '03', title: 'Assessment & Interview', desc: 'Complete a brief aptitude evaluation and a one-on-one consultation with our admissions team.' },
  { num: '04', title: 'Enrollment & Onboarding', desc: 'Receive your acceptance, complete payment, and access your personalized learning dashboard.' },
];

const FAQS = [
  { q: 'What are the entry requirements?', a: 'We accept candidates with a high school diploma or equivalent. For advanced programs (Ethical Hacking, AI), we recommend basic programming knowledge or prior IT experience.' },
  { q: 'Are classes conducted online or in-person?', a: 'We offer hybrid and fully remote options. Most programs include live virtual sessions, self-paced labs, and optional on-campus workshops at our Nairobi campus.' },
  { q: 'What payment plans are available?', a: 'We offer monthly installment plans, upfront discounts (15% off), and scholarship opportunities for qualifying students. Corporate-sponsored enrollments also receive volume discounts.' },
  { q: 'How long are the programs?', a: 'All programs are 3 months long. Each includes a capstone project and certification exam preparation.' },
  { q: 'Do you offer job placement support?', a: 'Yes. All graduates receive career coaching, CV reviews, mock interviews, and direct introductions to our 45+ hiring partners across East Africa and globally.' },
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="admissions-hero">
        <div className="container">
          <div className="admissions-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Admissions</span></div>
            <h1 className="admissions-hero__title">Your Pathway to a World-Class Career</h1>
            <p className="admissions-hero__desc">Join Africa's premier technology academy. Our streamlined enrollment process gets you from application to learning in days, not months.</p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Application Process</span>
              <h2 className="section-title">Four Steps to Enrollment</h2>
              <p className="section-subtitle">Our admissions process is designed to be straightforward and supportive.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="process-steps">
              {STEPS.map((step, i) => (
                <div className="step-card" key={i}>
                  <div className="step-number">{step.num}</div>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tuition */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Investment</span>
              <h2 className="section-title">Tuition & Fee Structure</h2>
              <p className="section-subtitle">Transparent pricing with flexible payment options for every learner.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="fee-grid">
              {/* Tier 1 */}
              <div className="fee-card">
                <div className="fee-icon"><Banknote size={24} /></div>
                <h3 className="fee-amount">KES 25,000</h3>
                <p className="fee-duration">3-Month Programs</p>
                <p className="fee-note">Emerging Tech, Database Admin</p>
                <ul className="fee-features">
                  <li><CheckCircle2 size={16} /> Full lab access</li>
                  <li><CheckCircle2 size={16} /> Certificate of completion</li>
                  <li><CheckCircle2 size={16} /> Installment plan available</li>
                </ul>
              </div>

              {/* Tier 2 — Featured */}
              <div className="fee-card fee-card--featured">
                <div className="badge badge-blue" style={{ margin: '0 auto 20px' }}>Most Popular</div>
                <div className="fee-icon"><Banknote size={24} /></div>
                <h3 className="fee-amount">KES 25,000</h3>
                <p className="fee-duration">3-Month Programs</p>
                <p className="fee-note">Ethical Hacking, DevOps, Cloud</p>
                <ul className="fee-features">
                  <li><CheckCircle2 size={16} /> Full lab access</li>
                  <li><CheckCircle2 size={16} /> Certification exam prep</li>
                  <li><CheckCircle2 size={16} /> Career coaching included</li>
                  <li><CheckCircle2 size={16} /> 15% upfront discount</li>
                </ul>
              </div>

              {/* Tier 3 */}
              <div className="fee-card">
                <div className="fee-icon"><Banknote size={24} /></div>
                <h3 className="fee-amount">KES 25,000</h3>
                <p className="fee-duration">3-Month Programs</p>
                <p className="fee-note">Cybersecurity, AI/ML, Data Science</p>
                <ul className="fee-features">
                  <li><CheckCircle2 size={16} /> Full lab + CTF access</li>
                  <li><CheckCircle2 size={16} /> Advanced certification prep</li>
                  <li><CheckCircle2 size={16} /> Career coaching included</li>
                  <li><CheckCircle2 size={16} /> Capstone project review</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="faq-item">
                  <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <h4>{faq.q}</h4>
                    <ChevronDown size={18} style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: 'var(--text-muted)' }} />
                  </div>
                  {openFaq === i && (
                    <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="admissions-cta">
        <div className="container">
          <ScrollReveal>
            <h2>Ready to Begin?</h2>
            <p>Start your application today and join the next cohort of technology leaders shaping Africa's digital future.</p>
            <div className="flex-center gap-4">
              <Link to="/contact" className="btn btn-white btn-lg">Start Application <ArrowRight size={18} /></Link>
              <Link to="/programs" className="btn btn-outline btn-lg">View Programs</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle2, Clock, DollarSign, Users, FileText } from 'lucide-react';
import './Programs.css';

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
  { q: 'How long are the programs?', a: 'Programs range from 3 to 6 months depending on the discipline. Each includes a capstone project and certification exam preparation.' },
  { q: 'Do you offer job placement support?', a: 'Yes. All graduates receive career coaching, CV reviews, mock interviews, and direct introductions to our 45+ hiring partners across East Africa and globally.' },
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Admissions</span></div>
          <h1 className="page-hero__title">Admissions Portal</h1>
          <p className="page-hero__desc">Your pathway to a world-class technology education starts here. Follow our streamlined application process.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Application Process</span>
            <h2 className="section-title">Four Steps to Enrollment</h2>
            <p className="section-subtitle">Our admissions process is designed to be straightforward and supportive.</p>
          </div>
          <div className="process-steps">
            {STEPS.map((step, i) => (
              <div className="card step-card" key={i}>
                <div className="step-number">{step.num}</div>
                <h3 className="card-title" style={{ fontSize: '18px' }}>{step.title}</h3>
                <p className="card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Investment</span>
            <h2 className="section-title">Tuition & Fee Structure</h2>
            <p className="section-subtitle">Transparent pricing with flexible payment options for every learner.</p>
          </div>
          <div className="fee-grid">
            <div className="card fee-card">
              <DollarSign size={28} style={{ color: 'var(--blue)', marginBottom: '16px' }} />
              <h3 className="fee-amount">KES 45,000</h3>
              <p className="fee-duration">3-Month Programs</p>
              <p className="fee-note">Emerging Tech, Database Admin</p>
            </div>
            <div className="card fee-card fee-card--featured">
              <div className="badge badge-blue" style={{ margin: '0 auto 16px' }}>Most Popular</div>
              <DollarSign size={28} style={{ color: 'var(--blue)', marginBottom: '16px' }} />
              <h3 className="fee-amount">KES 75,000</h3>
              <p className="fee-duration">4–5 Month Programs</p>
              <p className="fee-note">Ethical Hacking, DevOps, Cloud</p>
            </div>
            <div className="card fee-card">
              <DollarSign size={28} style={{ color: 'var(--blue)', marginBottom: '16px' }} />
              <h3 className="fee-amount">KES 95,000</h3>
              <p className="fee-duration">6-Month Programs</p>
              <p className="fee-note">Cybersecurity, AI/ML, Data Science</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <h4>{faq.q}</h4>
                  <ChevronDown size={18} style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: 'var(--text-muted)' }} />
                </div>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Ready to Begin?</h2>
          <p className="section-subtitle">Start your application today and join the next cohort of technology leaders.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Start Application <FileText size={18} /></Link>
        </div>
      </section>
    </div>
  );
}

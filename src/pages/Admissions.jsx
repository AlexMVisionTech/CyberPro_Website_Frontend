import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, CheckCircle2, ArrowRight, GraduationCap, BookOpen,
  Users, Server, Landmark, Building2, Award, ClipboardList, BarChart3,
  BadgeCheck, Handshake, MonitorSmartphone, FileCheck2
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Admissions.css';

const PATHWAYS = [
  {
    icon: GraduationCap,
    title: 'Student Cohorts',
    desc: 'Run structured cohorts of your students through certification-aligned programs, scheduled around your academic calendar.',
    points: ['Cohort scheduling per intake', 'Progress tracking for coordinators', 'Volume pricing for groups'],
    to: '/contact',
    link: 'Plan a cohort',
  },
  {
    icon: BookOpen,
    title: 'Curriculum Integration',
    desc: 'Embed Cyberpro courses into your degree or diploma programs with credit-mapped modules and shared assessment frameworks.',
    points: ['Credit-mapped modules', 'Shared assessment framework', 'Accreditation review support'],
    to: '/contact',
    link: 'Discuss integration',
  },
  {
    icon: Users,
    title: 'Faculty Development',
    desc: 'Train-the-trainer programs that equip your faculty to deliver cybersecurity, cloud, and AI curriculum with confidence.',
    points: ['Instructor bootcamps', 'Co-teaching in first cohorts', 'Teaching materials & lab guides'],
    to: '/contact',
    link: 'Develop your faculty',
  },
  {
    icon: Server,
    title: 'Lab Access for Institutions',
    desc: 'Reserved seats in our virtual cyber labs — SOC, network, forensics, and AI security environments with no campus infrastructure required.',
    points: ['Reserved virtual lab seats', 'Browser-based access', 'Guided scenarios & CTF arenas'],
    to: '/cyber-labs',
    link: 'Explore the labs',
  },
];

const ENGAGEMENT_STEPS = [
  { num: '01', title: 'Discovery Consultation', desc: 'A structured conversation about your institution\u2019s goals, existing programs, and learner population.' },
  { num: '02', title: 'Proposal & Agreement', desc: 'A tailored partnership proposal covering pathways, cohort size, scheduling, and commercial terms.' },
  { num: '03', title: 'Pilot Cohort', desc: 'A first cohort runs end-to-end with full reporting — proving outcomes before you scale.' },
  { num: '04', title: 'Scale & Review', desc: 'Expand across departments and intakes with quarterly reviews and continued support.' },
];

const BENEFITS = [
  { icon: Award, title: 'Volume cohort pricing', desc: 'Group rates that scale with intake size and multi-cohort agreements.' },
  { icon: Handshake, title: 'Dedicated coordinator', desc: 'A named program manager as your single point of contact.' },
  { icon: BarChart3, title: 'Cohort dashboards', desc: 'Enrollment, completion, and certification-readiness reporting each term.' },
  { icon: BadgeCheck, title: 'Certification-aligned curriculum', desc: 'Courses mapped to industry certifications your students can earn.' },
  { icon: Server, title: 'Reserved lab seats', desc: 'Guaranteed virtual lab capacity for your cohort\u2019s practical work.' },
  { icon: FileCheck2, title: 'Accreditation documentation', desc: 'Course outlines and outcomes material for your academic review.' },
];

const WHO_FOR = [
  { icon: Landmark, label: 'Public & private universities' },
  { icon: Building2, label: 'TVET colleges & polytechnics' },
  { icon: GraduationCap, label: 'Government training academies' },
  { icon: Users, label: 'Professional bodies & associations' },
];

const REQUIREMENTS = [
  { icon: ClipboardList, title: 'An institutional coordinator', desc: 'A named staff member as the point of contact for scheduling, enrollment, and reporting.' },
  { icon: Users, title: 'A cohort of 10+ learners', desc: 'Pathways are built for groups — cohorts start from ten learners per intake.' },
  { icon: MonitorSmartphone, title: 'Devices & connectivity', desc: 'Students need a laptop with a modern browser and reliable internet. All labs run in our cloud.' },
  { icon: FileCheck2, title: 'An accreditation review', desc: 'Credit-mapped integration requires a review with your academic office before launch.' },
];

const FAQS = [
  { q: 'What is the minimum cohort size?', a: 'Institutional pathways are built for groups — cohorts start from 10 learners per intake. Larger cohorts qualify for volume pricing and greater scheduling flexibility.' },
  { q: 'How is pricing structured for institutions?', a: 'Partnerships are priced per cohort rather than per learner, with volume discounts, multi-intake agreements, and options for institutions to sponsor individual learners.' },
  { q: 'Can Cyberpro courses count toward our qualifications?', a: 'Yes — curriculum integration maps Cyberpro modules to your credit framework after an accreditation review with your academic office. We provide course outlines and outcome documentation for that review.' },
  { q: 'How do we track learner progress?', a: 'Institutional coordinators receive cohort dashboards with enrollment, completion, and certification-readiness reporting delivered each term, plus direct access to the program coordinator.' },
  { q: 'What do students need to participate?', a: 'A laptop with a modern browser and reliable internet. All labs — SOC, network, forensics, and AI security — run in our cloud environments, so no campus lab infrastructure is required.' },
  { q: 'Do you train our instructors?', a: 'Faculty development is a core pathway. It includes instructor bootcamps, teaching materials, lab guides, and co-teaching support during your first cohorts.' },
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="admissions-hero">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <div className="admissions-hero__content">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Institutional Pathways</span></div>
            <h1 className="admissions-hero__title">Institutional Pathways</h1>
            <p className="admissions-hero__desc">
              Partner with Cyberpro Global to run student cohorts, embed certification-aligned
              curriculum, develop faculty, and give your institution reserved access to
              virtual cyber labs.
            </p>
            <div className="admissions-hero__actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Start a Conversation <ArrowRight size={18} /></Link>
              <Link to="/programs" className="btn admissions-ghost btn-lg">Explore Programs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section" id="institutional">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Partnership Pathways</span>
              <h2 className="section-title">Four ways institutions work with Cyberpro</h2>
              <p className="section-subtitle">Choose a pathway — or combine them into a campus-wide learning partnership.</p>
            </div>
          </ScrollReveal>
          <div className="pathway-grid">
            {PATHWAYS.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.07}>
                <article className="pathway-card">
                  <div className="pathway-card__icon"><p.icon size={22} aria-hidden="true" /></div>
                  <h3 className="pathway-card__title">{p.title}</h3>
                  <p className="pathway-card__desc">{p.desc}</p>
                  <ul className="pathway-card__points">
                    {p.points.map(point => <li key={point}><CheckCircle2 size={15} aria-hidden="true" />{point}</li>)}
                  </ul>
                  <Link to={p.to} className="pathway-card__link">{p.link} <ArrowRight size={15} aria-hidden="true" /></Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement process */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">Engagement Process</span>
              <h2 className="section-title">From first conversation to campus-wide scale</h2>
              <p className="section-subtitle">A structured, four-stage partnership — piloted before it scales.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="process-steps">
              {ENGAGEMENT_STEPS.map((step, i) => (
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

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">What Institutions Receive</span>
              <h2 className="section-title">Built for academic partnership</h2>
              <p className="section-subtitle">Everything a coordinator needs to run a successful program on campus.</p>
            </div>
          </ScrollReveal>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.05}>
                <div className="benefit-card">
                  <div className="benefit-card__icon"><b.icon size={19} aria-hidden="true" /></div>
                  <div>
                    <h3 className="benefit-card__title">{b.title}</h3>
                    <p className="benefit-card__desc">{b.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & requirements */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-label">Eligibility & Requirements</span>
              <h2 className="section-title">Who pathways are for, and what they need</h2>
            </div>
          </ScrollReveal>
          <div className="requirements-split">
            <ScrollReveal>
              <div className="requirements-panel">
                <h3 className="requirements-panel__title">Who this is for</h3>
                <ul className="who-list">
                  {WHO_FOR.map(w => (
                    <li key={w.label}>
                      <span className="who-list__icon"><w.icon size={17} aria-hidden="true" /></span>
                      {w.label}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="requirements-panel">
                <h3 className="requirements-panel__title">What we need from your institution</h3>
                <ul className="req-list">
                  {REQUIREMENTS.map(r => (
                    <li key={r.title}>
                      <strong>{r.title}</strong>
                      <span>{r.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">FAQ</span>
              <h2 className="section-title">Institutional Questions</h2>
            </div>
          </ScrollReveal>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="faq-item">
                  <button type="button" className="faq-question" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <h4>{faq.q}</h4>
                    <ChevronDown size={18} style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: 'var(--text-muted)' }} />
                  </button>
                  {openFaq === i && (
                    <div className="faq-answer" id={`faq-answer-${i}`}>{faq.a}</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="admissions-cta">
        <span className="hero-nova__grain" aria-hidden="true" />
        <div className="container">
          <ScrollReveal>
            <span className="admissions-cta__kicker">Institutional partnerships</span>
            <h2>Start the Conversation</h2>
            <p>Tell us about your institution — your goals, your programs, and your learners. We&rsquo;ll design a pathway around them.</p>
            <div className="flex-center gap-4">
              <Link to="/contact" className="btn btn-primary btn-lg">Contact Cyberpro <ArrowRight size={18} /></Link>
              <Link to="/research#collaborate" className="btn admissions-cta__ghost btn-lg">Research Collaboration</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Public site content used while the backend is unavailable.
export const programs = [
  { id: 1, title: 'Cloud Computing & Security', cat: 'foundation', desc: 'An introduction to cloud computing concepts and security fundamentals.', img: '/images/programs/cloud_computing.png', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cloud Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 2, title: 'Cyber Law, Legislation, Policies and Ethics', cat: 'foundation', desc: 'A 45-hour introduction to legal and ethical principles in cybersecurity, designed for law students.', img: '/images/programs/cybersecurity.png', dur: '45 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cyber Law & Ethics', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 3, title: 'Cybersecurity Foundational Skills', cat: 'foundation', desc: 'COP 400: develop core foundational skills in cybersecurity.', img: '/images/programs/cybersecurity.png', dur: 'Weeks', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybersecurity Foundations', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 4, title: 'Digital Art and Intellectual Property', cat: 'foundation', desc: 'A 35-hour course on the intersection of digital art and intellectual property.', img: '/images/programs/emerging_tech.jpg', dur: '35 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Digital IP', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 5, title: 'Financial Data Protection and Cybersecurity', cat: 'foundation', desc: 'A 50-hour exploration of cybersecurity strategies for protecting financial data.', img: '/images/programs/data_science.png', dur: '50 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Financial Data Protection', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 6, title: 'Cybersecurity Awareness for Social Sciences', cat: 'foundation', desc: 'A 40-hour introduction to the role of cybersecurity for social science students.', img: '/images/programs/cybersecurity.png', dur: '40 hours', lvl: 'Foundations', fee: 'KES 25,000', certs: 'Cybersecurity Awareness', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 7, title: 'Cybersecurity for Agriculture and Smart Farming', cat: 'foundation', desc: 'A 45-hour course on protecting agricultural systems and smart farming technology.', img: '/images/programs/iot_security.jpg', dur: '45 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Agriculture Cybersecurity', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 8, title: 'Security Essentials: Networks and Endpoints', cat: 'foundation', desc: 'A 45-hour introduction to fundamental network and endpoint security concepts.', img: '/images/programs/network_engineering.jpg', dur: '45 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Security Essentials', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 9, title: 'Cybersecurity, Blockchain, and FinTech', cat: 'foundation', desc: 'A 60-hour introduction to cybersecurity applications in blockchain and financial technology.', img: '/images/programs/blockchain.jpg', dur: '60 hours', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Blockchain & FinTech Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 19, title: 'Python for Cybersecurity & AI-Powered Defense', cat: 'foundation', desc: 'A practical foundation in Python for cybersecurity tasks and AI-assisted defense.', img: '/images/programs/fullstack_dev.jpg', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Python for Cybersecurity', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 20, title: 'Network Security & AI-Powered Threat Detection', cat: 'foundation', desc: 'Explore network security concepts alongside AI-powered threat detection.', img: '/images/programs/network_engineering.jpg', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Network Security', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 21, title: 'Cybersecurity, AI & Cybercrime Laws', cat: 'foundation', desc: 'An introduction to cybersecurity, artificial intelligence, and cybercrime law.', img: '/images/programs/cybersecurity.png', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybercrime Law', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 22, title: 'Cybersecurity & AI in Business Management', cat: 'foundation', desc: 'Learn how cybersecurity and AI relate to business management.', img: '/images/programs/emerging_tech.jpg', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybersecurity & AI for Business', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 23, title: 'Cybersecurity & AI Fundamentals', cat: 'foundation', desc: 'A foundation in cybersecurity concepts and artificial intelligence.', img: '/images/programs/ai_ml.png', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Cybersecurity & AI', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 24, title: 'Data Analytics, Cybersecurity & AI', cat: 'foundation', desc: 'An introduction to the intersection of data analytics, cybersecurity, and AI.', img: '/images/programs/data_science.png', dur: 'Topics', lvl: 'Foundations', fee: 'KES 35,000', certs: 'Data Analytics, Cybersecurity & AI', sourceUrl: 'https://cyberpro.global/course/index.php?categoryid=2' },
  { id: 10, title: 'Cyber-Economics and Business Policy', cat: 'intermediate', desc: 'A 45-hour course on cybersecurity and economic policy. The source lists Cybersecurity for Business as a prerequisite.', img: '/images/programs/data_science.png', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Cyber Economics & Policy', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 11, title: 'Endpoint Protection and Response', cat: 'intermediate', desc: 'A 45-hour course in endpoint protection and response. The source lists Security Essentials: Networks and Endpoints as a prerequisite.', img: '/images/programs/cybersecurity.png', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Endpoint Protection & Response', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 12, title: 'Cyber Threat Intelligence and Analysis', cat: 'intermediate', desc: 'A 45-hour course in cyber threat intelligence and analysis. The source lists Security Essentials: Networks and Endpoints as a prerequisite.', img: '/images/programs/digital_forensics.png', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Cyber Threat Intelligence', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 13, title: 'Cybersecurity in E-commerce and Digital Markets', cat: 'intermediate', desc: 'Cybersecurity concepts for e-commerce platforms and digital markets.', img: '/images/programs/fullstack_dev.jpg', dur: 'Topics', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'E-commerce Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 14, title: 'Cybersecurity and Digital Marketing', cat: 'intermediate', desc: 'Cybersecurity considerations for digital marketing work and platforms.', img: '/images/programs/emerging_tech.jpg', dur: 'Topics', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Digital Marketing Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 15, title: 'Data Security and Privacy in Business Operations', cat: 'intermediate', desc: 'A 40-hour course focused on data security and privacy in business operations.', img: '/images/programs/database_admin.jpg', dur: '40 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Data Security & Privacy', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 16, title: 'Advanced Endpoint Security for IoT Devices', cat: 'intermediate', desc: 'A 45-hour course on endpoint security for Internet of Things devices.', img: '/images/programs/iot_security.jpg', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'IoT Endpoint Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 17, title: 'Mobile Device Security', cat: 'intermediate', desc: 'A 45-hour course covering security for mobile devices.', img: '/images/programs/iot_security.jpg', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Mobile Security', sourceUrl: 'https://cyberpro.global/index.php' },
  { id: 18, title: 'Cybersecurity Incident Response and Management', cat: 'intermediate', desc: 'A 45-hour course designed to equip learners with incident response and management skills.', img: '/images/programs/security_operations_incident_response.png', dur: '45 hours', lvl: 'Intermediate', fee: 'KES 35,000', certs: 'Incident Response', sourceUrl: 'https://cyberpro.global/index.php' },
];

export const events = [
  { id: 10, title: 'Cyberweek Africa 2026', cat: 'conference', type: 'Conference', color: 'badge-crimson', date: 'October 27–31, 2026', img: '/images/events/cyberweek.png', location: 'KICC, Nairobi', desc: 'Africa’s cybersecurity and digital resilience conference, bringing together practitioners, leaders, and innovators.' },
  { id: 1, title: 'CyberPro Capture the Flag', cat: 'ctf', type: 'Hackathon & CTF', color: 'badge-crimson', date: 'November 14, 2026', img: '/images/events/ctf-cyber-defense.svg', location: 'Online', desc: 'A hands-on team challenge across web, forensics, and defensive security.' },
  { id: 2, title: 'Cybersecurity Career Bootcamp', cat: 'bootcamp', type: 'Bootcamp', color: 'badge-navy', date: 'December 5, 2026', img: '/images/events/aws-bootcamp.svg', location: 'Nairobi, Kenya', desc: 'A practical day of guided labs and career preparation for aspiring defenders.' },
  { id: 3, title: 'Securing AI Systems', cat: 'webinar', type: 'Webinar', color: 'badge-navy', date: 'December 17, 2026', img: '/images/events/ai-security-webinar.svg', location: 'Online', desc: 'Join our researchers for an introduction to emerging AI security risks.' },
];

export const gallery = [
  { id: 1, title: 'CyberPro community in action', caption: 'Learning together through hands-on cybersecurity.', img: '/images/gallery_1.jpg' },
  { id: 2, title: 'Cybersecurity training', caption: 'Building practical skills for a safer digital future.', img: '/images/gallery_2.jpg' },
  { id: 3, title: 'Students at work', caption: 'Practice, collaboration, and real-world challenges.', img: '/images/gallery_3.jpg' },
  { id: 4, title: 'CyberPro events', caption: 'Connecting the cybersecurity community.', img: '/images/gallery_4.jpg' },
];

export const articles = [
  { id: 1, title: 'A Practical Guide to Building Your First SOC Skill Set', cat: 'career', catLabel: 'Career Guides', excerpt: 'The core skills, tools, and practice routines that help new analysts prepare for security operations work.', author: 'CyberPro Training Team', read: '6 min', date: 'October 2026', img: '/images/blog_1.jpg', featured: true },
  { id: 2, title: 'What Happens During a Security Incident?', cat: 'security', catLabel: 'Cybersecurity', excerpt: 'A clear look at incident response phases, from the first alert through recovery and lessons learned.', author: 'CyberPro Research Team', read: '5 min', date: 'September 2026', img: '/images/blog_2.jpg' },
  { id: 3, title: 'Understanding Adversarial Machine Learning', cat: 'ai', catLabel: 'AI & ML', excerpt: 'How small changes to model inputs can create outsized security consequences.', author: 'CyberPro Research Team', read: '7 min', date: 'August 2026', img: '/images/blog_3.jpg' },
];

export const researchClusters = [
  { id: 1, icon: 'FlaskConical', title: 'Applied Cyber Defense', desc: 'Practical methods for detecting, understanding, and responding to threats across modern environments.', lead: 'CyberPro Research Lab' },
  { id: 2, icon: 'Globe', title: 'AI Assurance & Safety', desc: 'Research into resilient machine learning systems, adversarial testing, and trustworthy AI deployment.', lead: 'AI Security Group' },
  { id: 3, icon: 'BookOpen', title: 'Critical Infrastructure Resilience', desc: 'Building security capacity and resilience for essential digital services and infrastructure.', lead: 'Infrastructure Security Group' },
];

export const publications = [
  { id: 1, title: 'Practical Approaches to Cyber Resilience in Emerging Digital Economies', authors: 'CyberPro Research Group', venue: 'CyberPro Research Brief', type: 'Journal', link: '' },
  { id: 2, title: 'Evaluating Adversarial Risks in Deployed Machine Learning Systems', authors: 'AI Security Group', venue: 'Applied AI Security Review', type: 'Conference', link: '' },
  { id: 3, title: 'Incident Response Readiness for Critical Service Providers', authors: 'Infrastructure Security Group', venue: 'CyberPro Technical Papers', type: 'Journal', link: '' },
];

export const corporateServices = [
  { id: 1, icon: 'Shield', title: 'Cybersecurity & Risk', desc: 'Role-based security training, awareness programs, and incident response readiness for your teams.' },
  { id: 2, icon: 'Cloud', title: 'Cloud & DevOps', desc: 'Practical cloud architecture, platform operations, and secure delivery training.' },
  { id: 3, icon: 'Brain', title: 'AI & Data', desc: 'Build applied data and AI skills with a focus on safe, responsible deployment.' },
  { id: 4, icon: 'Building2', title: 'Custom Programs', desc: 'Tailored learning pathways aligned to your organization’s goals and workforce.' },
];

export const corporateMetrics = [
  { id: 1, value: 'Practical', label: 'Hands-on learning' },
  { id: 2, value: 'Flexible', label: 'Delivery options' },
  { id: 3, value: 'Tailored', label: 'Organization-led pathways' },
];

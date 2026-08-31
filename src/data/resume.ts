import type { Resume } from '../types/resume';

/**
 * Single source of truth for all site content.
 * Edit values here; never hardcode copy inside components.
 */
export const resume: Resume = {
  profile: {
    name: 'Nikhil Jathar',
    role: 'Senior Full-Stack Developer',
    location: 'Mumbai, India',
    summary:
      'Full-Stack Developer with 3+ years of experience building, scaling, and shipping production-grade web and mobile applications. Proven track record of leading small engineering teams (2-3 developers) to deliver complex features, optimizing system performance (45% faster API response times), and designing offline-first architectures. Deeply proficient in the JavaScript/TypeScript ecosystem with an emphasis on creating enterprise-ready, scalable applications.',
    links: [
      {
        id: 'email',
        kind: 'email',
        label: 'Email',
        value: 'nikhiljathar06@gmail.com',
        href: 'mailto:nikhiljathar06@gmail.com',
      },
      {
        id: 'linkedin',
        kind: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/nikhil-jathar',
        href: 'https://linkedin.com/in/nikhil-jathar',
      },
      {
        id: 'phone',
        kind: 'phone',
        label: 'Phone',
        value: '+91 84335 85122',
        href: 'tel:+918433585122',
      },
      {
        id: 'location',
        kind: 'location',
        label: 'Location',
        value: 'Mumbai, India',
        href: '#',
      },
    ],
  },

  skills: [
    { id: 'languages', label: 'Languages', items: ['JavaScript', 'TypeScript'] },
    {
      id: 'frontend',
      label: 'Frontend',
      items: ['React', 'Angular', 'React Native', 'Expo'],
    },
    {
      id: 'backend',
      label: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Sequelize ORM'],
    },
    {
      id: 'database',
      label: 'Database',
      items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
    },
    {
      id: 'tools',
      label: 'Tools & Cloud',
      items: ['AWS Services', 'Git', 'GitHub', 'CI/CD'],
    },
  ],

  experience: [
    {
      id: 'elementree',
      role: 'Senior Full-Stack Developer',
      company: 'Elementree',
      location: 'Mumbai, Maharashtra, India',
      startDate: 'April 2023',
      endDate: 'Present',
      current: true,
      highlights: [
        {
          id: 'leadership',
          title: 'Technical Leadership',
          description:
            'Mentored and led a sub-team of 2-3 developers, coordinating sprint tasks, conducting rigorous code reviews, and establishing engineering best practices to ensure high-quality code delivery and zero-regression deployments.',
        },
        {
          id: 'keel',
          title: 'Offline-First Architecture (KEEL Platform)',
          description:
            'Spearheaded the development of a trainee onboarding and cross-platform mobile application using IndexedDB and SQLite; designed a robust sync engine with conflict-resolution strategies to automatically flush cached data and user attachments upon network restoration.',
        },
        {
          id: 'video-pipeline',
          title: 'Cloud Video Pipeline',
          description:
            'Architected an event-driven video processing pipeline utilizing AWS S3 and Lambda functions to asynchronously transcode source videos into multi-quality formats (1080p, 720p, 480p) and convert them to HLS streams for adaptive bitrate playback.',
        },
        {
          id: 'zenith',
          title: 'Enterprise Workflows (Zenith Payroll)',
          description:
            'Engineered an enterprise payroll and attendance tracking system; optimized complex relational database queries using Sequelize ORM and established a Redis caching layer for high-frequency endpoints, reducing average API response times by 45%.',
          metric: '45% faster APIs',
        },
        {
          id: 'api-security',
          title: 'API Engineering & Security',
          description:
            'Designed scalable RESTful APIs handling 50K+ daily requests, implementing JSON Web Tokens (JWT) and granular Role-Based Access Control (RBAC) to enforce secure, multi-tenant user management.',
          metric: '50K+ daily requests',
        },
        {
          id: 'cross-platform',
          title: 'Cross-Platform Delivery',
          description:
            'Oversaw the frontend architecture for cross-platform mobile applications utilizing React Native and Expo, leveraging modular components to achieve 95% code reuse across iOS and Android platforms.',
          metric: '95% code reuse',
        },
      ],
    },
    {
      id: 'idcle',
      role: 'Web Development Intern',
      company: 'IDCLE Tech LLP',
      location: 'Mumbai, Maharashtra, India',
      startDate: 'September 2022',
      endDate: 'March 2023',
      current: false,
      highlights: [
        {
          id: 'gov-scale',
          title: 'Government-Scale Applications',
          description:
            'Contributed to a high-traffic web application for the Maharashtra Government, serving 50K+ farmers for official document verification and certificate services.',
          metric: '50K+ farmers served',
        },
        {
          id: 'doc-verification',
          title: 'Secure Document Verification',
          description:
            'Implemented a secure QR-code-based verification system allowing citizens to upload documents for automated authentication and receive digitally signed authenticity certificates.',
        },
        {
          id: 'hrms',
          title: 'Enterprise HRMS Development',
          description:
            'Built core modules for an internal Human Resource Management System (HRMS), handling employee management and leave management workflows for 500+ users.',
          metric: '500+ users',
        },
        {
          id: 'accessibility',
          title: 'UI/UX Accessibility',
          description:
            'Developed responsive UI components using Angular and PrimeNG, ensuring strict adherence to modern web accessibility standards across desktop and mobile browsers.',
        },
      ],
    },
  ],

  education: [
    {
      id: 'mumbai-university',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Mumbai',
      location: 'Mumbai, Maharashtra, India',
      startDate: 'June 2017',
      endDate: 'November 2020',
    },
  ],

  sections: [
    { id: 'about', navLabel: 'About', heading: 'About', eyebrow: '01' },
    { id: 'skills', navLabel: 'Skills', heading: 'Technical Skills', eyebrow: '02' },
    {
      id: 'experience',
      navLabel: 'Experience',
      heading: 'Professional Experience',
      eyebrow: '03',
    },
    { id: 'education', navLabel: 'Education', heading: 'Education', eyebrow: '04' },
    { id: 'contact', navLabel: 'Contact', heading: 'Get In Touch', eyebrow: '05' },
  ],
};

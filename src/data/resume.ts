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
    {
      id: 'languages',
      label: 'Languages',
      items: ['JavaScript', 'TypeScript'],
      tunerStats: { topSpeed: 92, acceleration: 95, handling: 90, nitro: 88 },
    },
    {
      id: 'frontend',
      label: 'Frontend Engine',
      items: ['React', 'Angular', 'React Native', 'Expo'],
      tunerStats: { topSpeed: 96, acceleration: 94, handling: 98, nitro: 95 },
    },
    {
      id: 'backend',
      label: 'Backend Turbo',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Sequelize ORM'],
      tunerStats: { topSpeed: 95, acceleration: 98, handling: 92, nitro: 96 },
    },
    {
      id: 'database',
      label: 'Database Transmission',
      items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
      tunerStats: { topSpeed: 90, acceleration: 91, handling: 96, nitro: 92 },
    },
    {
      id: 'tools',
      label: 'Cloud & NOS Injectors',
      items: ['AWS Services', 'Git', 'GitHub', 'CI/CD'],
      tunerStats: { topSpeed: 94, acceleration: 96, handling: 89, nitro: 99 },
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
    { id: 'skills', navLabel: 'Garage Tuner', heading: 'Performance Specs & Skills', eyebrow: '02' },
    { id: 'projects', navLabel: 'Blacklist', heading: 'The Blacklist 15', eyebrow: '03' },
    {
      id: 'experience',
      navLabel: 'Experience',
      heading: 'Professional Rap Sheet',
      eyebrow: '04',
    },
    { id: 'education', navLabel: 'Education', heading: 'Driver Credentials', eyebrow: '05' },
    { id: 'contact', navLabel: 'Contact', heading: 'Comms Channel', eyebrow: '06' },
  ],

  blacklist: [
    {
      id: 'nikhil',
      rank: '01',
      alias: 'RAZOR NIKHIL',
      name: 'Nikhil Jathar',
      role: 'Senior Full-Stack Developer',
      ride: 'Full-Stack Architecture (Node / React Engine)',
      bounty: '$15,450,000',
      heat: 5,
      bio: 'Top of the Most Wanted list. Master of offline architectures, cloud video pipelines, and high-frequency Redis endpoints. Lead developer commanding full-stack deployments.',
      stats: { topSpeed: 98, acceleration: 96, handling: 94, nitro: 99 },
      techStack: ['React', 'Node.js', 'TypeScript', 'AWS Lambda', 'Redis'],
      projectImg: '/blacklist/project_nikhil_core.svg',
      carImg: '/blacklist/bmw_m3_gtr.png',
      characterImg: '/blacklist/watermarked_img_8019737843156667790-Photoroom.png',
      projectDetails: {
        overview:
          'The core architecture. Three years running production full-stack systems end to end — offline-first mobile platforms, event-driven cloud pipelines and high-frequency APIs — while leading small teams through delivery.',
        keyFeatures: [
          'Led 2-3 developer squads from architecture through release',
          'Offline-first sync engines that survive zero connectivity',
          'Event-driven AWS pipelines for heavy media workloads',
          'Multi-tenant Redis caching on hot relational endpoints',
        ],
        performanceMetric: '45% faster API response times',
        challengesSolved:
          'Shipping enterprise-grade features on small teams without trading away performance or maintainability.',
      },
    },
    {
      id: 'keel-platform',
      rank: '02',
      alias: 'BULL KEEL',
      name: 'KEEL Sync Engine',
      role: 'Offline-First Mobile Platform',
      ride: 'Offline-First Mobile Sync Engine (IndexedDB & SQLite)',
      bounty: '$12,800,000',
      heat: 5,
      bio: 'Built for zero-connectivity environments. Automatically caches binary attachments and flushes synced data upon network restoration without data collision.',
      stats: { topSpeed: 94, acceleration: 99, handling: 95, nitro: 90 },
      techStack: ['React Native', 'Expo', 'SQLite', 'IndexedDB'],
      projectImg: '/blacklist/project_keel_sync.svg',
      carImg: '/blacklist/slr_mclaren.jpg',
      projectDetails: {
        overview:
          'A mobile platform built for field crews working with no signal at all. Every write is queued locally and reconciled the moment the network returns, without losing or colliding edits.',
        keyFeatures: [
          'SQLite + IndexedDB dual-store persistence layer',
          'Binary attachment caching with deferred upload',
          'Conflict-aware flush on network restoration',
          'Expo build pipeline targeting iOS and Android',
        ],
        performanceMetric: 'Zero data loss across offline sessions',
        challengesSolved:
          'Reconciling concurrent offline edits from multiple devices without silently dropping a record.',
      },
    },
    {
      id: 'aws-pipeline',
      rank: '03',
      alias: 'RONNIE AWS',
      name: 'Cloud Video Transcoder',
      role: 'Event-Driven Video Pipeline',
      ride: 'Event-Driven Serverless Transcoder (AWS S3 & Lambda)',
      bounty: '$10,200,000',
      heat: 4,
      bio: 'Asynchronously converts high-res sources into adaptive HLS streams (1080p to 480p) using AWS Lambda and S3 event triggers.',
      stats: { topSpeed: 96, acceleration: 92, handling: 88, nitro: 97 },
      techStack: ['AWS S3', 'AWS Lambda', 'HLS Video', 'Node.js'],
      projectImg: '/blacklist/project_video_pipeline.svg',
      carImg: '/blacklist/db9.jpg',
      projectDetails: {
        overview:
          'An asynchronous transcoding pipeline: an S3 upload fires a Lambda, which fans a high-resolution source out into adaptive HLS renditions ready for streaming.',
        keyFeatures: [
          'S3 event triggers driving serverless transcode jobs',
          'Adaptive HLS ladder from 1080p down to 480p',
          'No always-on transcode servers to pay for',
          'Retry and dead-letter handling for failed jobs',
        ],
        performanceMetric: '1080p → 480p adaptive ladder',
        challengesSolved:
          'Serving smooth playback across unpredictable mobile bandwidth without over-provisioning compute.',
      },
    },
    {
      id: 'zenith-payroll',
      rank: '04',
      alias: 'MING ZENITH',
      name: 'Zenith Payroll System',
      role: 'High-Frequency Enterprise API',
      ride: 'High-Frequency Enterprise Relational Engine (Sequelize & Redis)',
      bounty: '$8,600,000',
      heat: 4,
      bio: 'Optimized complex relational queries and implemented multi-tenant Redis caching to slice API response latencies by 45%.',
      stats: { topSpeed: 92, acceleration: 95, handling: 96, nitro: 91 },
      techStack: ['Sequelize', 'PostgreSQL', 'Redis', 'Express'],
      projectImg: '/blacklist/project_zenith_payroll.svg',
      carImg: '/blacklist/gallardo.jpg',
      projectDetails: {
        overview:
          'A payroll engine under real load. Query plans were rewritten and a multi-tenant Redis layer added in front of the heaviest relational reads.',
        keyFeatures: [
          'Rewritten Sequelize queries on the hot paths',
          'Tenant-scoped Redis caching with targeted invalidation',
          'Indexed the joins that dominated request time',
          'Load-tested against production-shaped data',
        ],
        performanceMetric: '45% latency reduction',
        challengesSolved:
          'Caching per tenant without ever leaking one tenant’s payroll data into another’s response.',
      },
    },
    {
      id: 'mh-gov',
      rank: '05',
      alias: 'WEBSTER MH',
      name: 'Maharashtra Govt Portal',
      role: 'High-Traffic Citizen Verification',
      ride: 'Government Security & Verification Engine (QR Authenticator)',
      bounty: '$6,400,000',
      heat: 3,
      bio: 'Scale application delivering automated QR-code document authentication for 50,000+ citizens and farmers.',
      stats: { topSpeed: 89, acceleration: 91, handling: 94, nitro: 85 },
      techStack: ['Angular', 'PrimeNG', 'Node.js', 'QR Engine'],
      projectImg: '/blacklist/project_mh_gov.svg',
      carImg: '/blacklist/mustang_gt.jpg',
      projectDetails: {
        overview:
          'A public-facing government portal issuing tamper-evident QR credentials to citizens and farmers, built to stay up under bursty campaign traffic.',
        keyFeatures: [
          'Signed QR generation and offline verification',
          'Angular + PrimeNG accessible form flows',
          'Bulk issuance for scheduled campaigns',
          'Audit trail on every document issued',
        ],
        performanceMetric: '50,000+ citizens served',
        challengesSolved:
          'Making a credential verifiable offline by a field officer while keeping it impossible to forge.',
      },
    },
  ],
};

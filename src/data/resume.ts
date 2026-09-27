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
      id: 'razorpay-seat-sandbox',
      rank: '01',
      alias: 'RAZOR SEAT-SANDBOX',
      name: 'Razorpay Seat Sandbox',
      role: 'Offline-First Test Harness & Proration Simulator',
      ride: 'Node.js & Razorpay Billing Harness',
      bounty: '$15,450,000',
      heat: 5,
      bio: 'An offline-first test harness and simulation suite designed to test, verify, and audit subscription billing logic prior to production deployment. It enables accurate simulation of mid-cycle seat-count proration, guarantees webhook idempotency against out-of-order payloads, and ensures safe execution of Razorpay subscription quantity updates.',
      stats: { topSpeed: 98, acceleration: 96, handling: 95, nitro: 99 },
      techStack: ['JavaScript', 'Node.js', 'HTML5', 'npm'],
      projectImg: '/blacklist/project_nikhil_core.svg',
      carImg: '/blacklist/bmw_m3_gtr.png',
      characterImg: '/blacklist/watermarked_img_8019737843156667790-Photoroom.png',
      projectDetails: {
        overview:
          'An offline-first test harness and simulation suite designed to test, verify, and audit subscription billing logic prior to production deployment. It enables accurate simulation of mid-cycle seat-count proration, guarantees webhook idempotency against out-of-order payloads, and ensures safe execution of Razorpay subscription quantity updates.',
        keyFeatures: [
          'Accurate simulation of mid-cycle seat-count proration',
          'Guaranteed webhook idempotency against out-of-order payloads',
          'Safe execution and audit of Razorpay subscription quantity updates',
          'Offline-first test harness for zero-risk production deployment',
        ],
        performanceMetric: 'Webhook Idempotency & Proration Audit',
        challengesSolved:
          'Preventing billing discrepancies and out-of-order webhook payload race conditions in production subscription systems.',
        githubUrl: 'https://github.com/rapture99/razorpay-seat-sandbox',
      },
    },
    {
      id: 'function-visualiser',
      rank: '02',
      alias: 'BULL VISUALISER',
      name: 'Function Visualiser',
      role: 'Markdown-Driven 2D/3D Architectural Explorer',
      ride: '2D/3D Spatial Engine (React Three Fiber & Three.js)',
      bounty: '$13,800,000',
      heat: 5,
      bio: 'A Markdown-driven functionality explorer and architectural tool that parses structured documents or code repositories to render interactive 2D flowcharts and 3D spatial maps using React Three Fiber. It features full file:line provenance tracking, multi-step workflow stepping, playback capabilities, and real-time search/filtering across complex codebases.',
      stats: { topSpeed: 96, acceleration: 98, handling: 97, nitro: 95 },
      techStack: ['TypeScript', 'React', 'React Three Fiber', 'Three.js', 'Vite', 'Node.js', 'CSS3'],
      projectImg: '/blacklist/project_keel_sync.svg',
      carImg: '/blacklist/slr_mclaren.jpg',
      projectDetails: {
        overview:
          'A Markdown-driven functionality explorer and architectural tool that parses structured documents or code repositories to render interactive 2D flowcharts and 3D spatial maps using React Three Fiber. It features full file:line provenance tracking, multi-step workflow stepping, playback capabilities, and real-time search/filtering across complex codebases.',
        keyFeatures: [
          'Interactive 2D flowcharts & 3D spatial maps via React Three Fiber',
          'Full file:line provenance tracking for codebase navigation',
          'Multi-step workflow stepping and animated playback capabilities',
          'Real-time search & filtering across large complex codebases',
        ],
        performanceMetric: 'Interactive 3D Codebase Spatial Mapping',
        challengesSolved:
          'Parsing massive structured repos into smooth 60fps 3D spatial graphs with precise file provenance tracking.',
        githubUrl: 'https://github.com/rapture99/Function-visualiser',
      },
    },
    {
      id: 'scorm-builder',
      rank: '03',
      alias: 'RONNIE SCORM-BUILDER',
      name: 'SCORM Builder',
      role: 'Serverless Browser-Side Authoring Engine',
      ride: 'Serverless SCORM Compiler (WebCodecs & IndexedDB)',
      bounty: '$11,500,000',
      heat: 4,
      bio: 'A serverless, browser-side authoring tool that compiles multimedia assets and Excel-driven quizzes into fully compliant SCORM 1.2 and SCORM 2004 packages. It features a three-pane visual editor with dynamic content blocks (accordions, flashcards, hotspots), client-side H.264 video re-encoding via WebCodecs, IndexedDB storage, and a batch processor for automated multi-course packaging.',
      stats: { topSpeed: 94, acceleration: 95, handling: 96, nitro: 98 },
      techStack: ['TypeScript', 'React', 'Vite', 'SheetJS', 'JSZip', 'WebCodecs', 'IndexedDB', 'Vitest'],
      projectImg: '/blacklist/project_video_pipeline.svg',
      carImg: '/blacklist/db9.jpg',
      projectDetails: {
        overview:
          'A serverless, browser-side authoring tool that compiles multimedia assets and Excel-driven quizzes into fully compliant SCORM 1.2 and SCORM 2004 packages. It features a three-pane visual editor with dynamic content blocks (accordions, flashcards, hotspots), client-side H.264 video re-encoding via WebCodecs, IndexedDB storage, and a batch processor for automated multi-course packaging.',
        keyFeatures: [
          'Compliant SCORM 1.2 & SCORM 2004 package compilation',
          'Client-side H.264 video re-encoding via browser WebCodecs API',
          'Three-pane visual editor with accordions, flashcards & hotspots',
          'SheetJS Excel quiz parsing & IndexedDB local storage',
          'Batch processor for automated multi-course packaging',
        ],
        performanceMetric: 'Client-Side WebCodecs Video Re-encoding',
        challengesSolved:
          'Performing heavy video transcoding and ZIP compilation entirely in-browser without server backend compute.',
        githubUrl: 'https://github.com/rapture99/Scorm-Builder',
      },
    },
  ],
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TimelineItem, SkillGroup, Certification, Achievement, Service, Testimonial } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'ai-code-companion',
    title: 'Cognitive Engine: AI Code Companion',
    description: 'An intelligent coding agent that parses local workspace contexts and streams optimized code suggestions using state-of-the-art LLMs. Built with real-time SSE streaming and multi-file code editing capabilities.',
    category: 'AI',
    techStack: ['React', 'TypeScript', 'Node.js', 'Google Gemini API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    createdAt: '2026-05-10T12:00:00Z'
  },
  {
    id: 'synapse-notion',
    title: 'Synapse Collective Workspaces',
    description: 'A full-stack collaborative knowledge-base and documentation canvas featuring block editors, markdown imports, and live real-time multi-agent cursors powered by custom WebSocket aggregators.',
    category: 'Web Apps',
    techStack: ['React', 'Express', 'Tailwind v4', 'WebSockets', 'localStorage'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    createdAt: '2026-04-15T12:00:00Z'
  },
  {
    id: 'velocity-iso-racer',
    title: 'Velocity: Isometric Micro-Racer',
    description: 'An interactive 2.5D retro arcade racing simulation built using HTML5 Canvas, pathfinders, and simulated physics. Features high-framerate dynamic engine rendering, time trials, and ghost recordings.',
    category: 'Games',
    techStack: ['TypeScript', 'HTML5 Canvas', 'Framer Motion', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    createdAt: '2026-03-22T12:00:00Z'
  },
  {
    id: 'autonomous-indoor-mapper',
    title: 'SLAM LiDAR Indoor Quadcopter Navigator',
    description: 'A university senior-year capstone project. Designed and simulated autonomous drone flight trajectories integrating ROS, LiDAR SLAM mapping, and depth-sensing APIs for indoor navigation.',
    category: 'College Projects',
    techStack: ['Python', 'ROS (Robot Operating System)', 'C++', 'OpenCV', 'LiDAR'],
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    createdAt: '2026-02-05T12:00:00Z'
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'tl-1',
    year: '2024 - Present',
    role: 'B.Tech in Computer Science & Engineering',
    institution: 'State Institute of Technology',
    description: 'Specializing in Artificial Intelligence and Machine Learning. GPA: 9.4/10. Active member of Coding and Innovation Clubs.'
  },
  {
    id: 'tl-2',
    year: 'Summer 2025',
    role: 'Software Engineer Intern',
    institution: 'Hyperion AI Labs',
    description: 'Optimized serverless backend pipelines reducing token footprint by 24%. Built rich developer dashboard telemetry components using React & Tailwind.'
  },
  {
    id: 'tl-3',
    year: '2023 - 2024',
    role: 'Open Source Fellow',
    institution: 'The Octocat Collective',
    description: 'Contributed 30+ pull requests to core web application developer tools, focusing on CSS compilers and responsive navigation layout systems.'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend Development',
    icon: 'Layout',
    items: [
      { name: 'React / Next.js', percentage: 95 },
      { name: 'TypeScript', percentage: 90 },
      { name: 'Tailwind CSS v4', percentage: 98 },
      { name: 'Framer Motion (Animations)', percentage: 88 }
    ]
  },
  {
    category: 'Backend & Cloud',
    icon: 'Database',
    items: [
      { name: 'Node.js / Express', percentage: 87 },
      { name: 'Firebase / Firestore', percentage: 85 },
      { name: 'REST & GraphQL APIs', percentage: 90 },
      { name: 'PostgreSQL / NoSQL', percentage: 80 }
    ]
  },
  {
    category: 'AI & Engineering Tools',
    icon: 'Cpu',
    items: [
      { name: 'Google Gemini SDK', percentage: 92 },
      { name: 'LangChain & VectorDB', percentage: 83 },
      { name: 'Git / GitHub CI/CD', percentage: 94 },
      { name: 'Docker / Cloud Run', percentage: 78 }
    ]
  },
  {
    category: 'Programming Languages',
    icon: 'Code2',
    items: [
      { name: 'JavaScript / TS', percentage: 95 },
      { name: 'Python', percentage: 88 },
      { name: 'C++ / Java', percentage: 82 },
      { name: 'SQL', percentage: 85 }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Google Advanced Cloud Developer Specialization',
    issuer: 'Google Cloud Training',
    date: 'Dec 2025',
    link: 'https://google.com'
  },
  {
    id: 'cert-2',
    title: 'Deep Learning with TensorFlow Specialist',
    issuer: 'DeepLearning.AI',
    date: 'Aug 2025',
    link: 'https://coursera.org'
  },
  {
    id: 'cert-3',
    title: 'Full Stack App Security & Cryptography Practitioner',
    issuer: 'Udemy Academic Academy',
    date: 'Feb 2025',
    link: 'https://udemy.com'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Hackathon Champion',
    metric: '1st Place',
    description: 'Won regional Smart City Hackathon out of 120 teams for predictive traffic load balancing software.',
    icon: 'Trophy'
  },
  {
    id: 'ach-2',
    title: 'LeetCode Rating',
    metric: '2,142 Max',
    description: 'Ranked in the top 1.5% of programmers worldwide. Solved 750+ algorithmic challenges.',
    icon: 'Code'
  },
  {
    id: 'ach-3',
    title: 'Open Source Impact',
    metric: '15,000+ Downloads',
    description: 'Authored and published a custom lightweight Tailwind utility component package to npm.',
    icon: 'Github'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Modern Web Development',
    description: 'Transforming designs into lightning-fast, production-ready React applications with beautiful typography, high responsiveness, and pixel-perfect layouts.',
    icon: 'Monitor'
  },
  {
    id: 'srv-2',
    title: 'AI Engine & Agent Integration',
    description: 'Injecting smart generative capabilities, NLP search indices, and LLM text/voice summaries securely into server-side business applications.',
    icon: 'Sparkles'
  },
  {
    id: 'srv-3',
    title: 'Fluid Interactive UX-Design',
    description: 'Developing high-fidelity custom animations, smooth screen state transitions, and responsive fluid grids based on the minimalist Apple and Linear styles.',
    icon: 'AppWindow'
  },
  {
    id: 'srv-4',
    title: 'Consulting & Freelancing',
    description: 'Collaborating in agile sprints to scale MVPs, restructure security rules, set up Google Cloud Run deploy configs, and enhance site performance.',
    icon: 'Cpu'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'Engineering Lead',
    company: 'Nexus Software Studio',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'A rare engineering talent. Developed a fully customized, motion-driven interactive landing portal for our SaaS launch that absolutely blew our clients away.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Devon Carter',
    role: 'Founder',
    company: 'Linear Lab AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Extremely quick to turn abstract requirements into responsive, production-ready interfaces. The AI chatbot feature they built for us worked perfectly on first deployment.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Anjali Sharma',
    role: 'Incubator Program Lead',
    company: 'State Innovation hub',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Helped our college team integrate Firebase and robust rules in record time. Their architectural planning and UX execution is on-par with senior practitioners.',
    rating: 5
  }
];

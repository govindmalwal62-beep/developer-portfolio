/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'Web Apps' | 'Games' | 'College Projects';
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string | Date;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string | Date;
}

export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  institution: string;
  description: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

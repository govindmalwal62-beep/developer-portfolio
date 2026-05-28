/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType } from '../firebase';
import { Project, Message } from '../types';
import { INITIAL_PROJECTS } from '../data';

const PROJECTS_LOCAL_KEY = 'portfolio_projects_v1';
const MESSAGES_LOCAL_KEY = 'portfolio_messages_v1';

// Helpers for localStorage fallback
function getLocalProjects(): Project[] {
  const data = localStorage.getItem(PROJECTS_LOCAL_KEY);
  if (!data) {
    localStorage.setItem(PROJECTS_LOCAL_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  return JSON.parse(data);
}

function saveLocalProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_LOCAL_KEY, JSON.stringify(projects));
}

function getLocalMessages(): Message[] {
  const data = localStorage.getItem(MESSAGES_LOCAL_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocalMessages(messages: Message[]) {
  localStorage.setItem(MESSAGES_LOCAL_KEY, JSON.stringify(messages));
}

/**
 * Service to manage portfolio data (Projects & Contact Messages)
 */
export const portfolioService = {
  /**
   * Fetch all portfolio projects
   */
  async getProjects(): Promise<Project[]> {
    if (!isFirebaseConfigured || !db) {
      return getLocalProjects();
    }

    const path = 'projects';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const projects: Project[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        projects.push({
          id: docSnap.id,
          title: data.title,
          description: data.description,
          category: data.category,
          techStack: data.techStack || [],
          image: data.image,
          liveUrl: data.liveUrl || '',
          githubUrl: data.githubUrl || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        });
      });

      // If we got projects from Firestore, let's also cache them in localStorage fallback
      if (projects.length > 0) {
        saveLocalProjects(projects);
        return projects;
      }
      
      // If Firestore is empty, initialize it with defaults if isFirebaseConfigured is true!
      // But we will return default mock ones first.
      return getLocalProjects();
    } catch (error) {
      console.warn("Could not fetch projects from Firestore. Using cache.", error);
      // Fallback to cache/local
      return getLocalProjects();
    }
  },

  /**
   * Add a new project
   */
  async createProject(projectInput: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    const id = 'proj_' + Math.random().toString(36).substr(2, 9);
    
    if (!isFirebaseConfigured || !db) {
      const local = getLocalProjects();
      const newProj: Project = {
        ...projectInput,
        id,
        createdAt: new Date().toISOString()
      };
      saveLocalProjects([newProj, ...local]);
      return newProj;
    }

    const path = `projects/${id}`;
    try {
      const payload = {
        title: projectInput.title,
        description: projectInput.description,
        category: projectInput.category,
        techStack: projectInput.techStack,
        image: projectInput.image,
        liveUrl: projectInput.liveUrl || '',
        githubUrl: projectInput.githubUrl || '',
        createdAt: serverTimestamp(), // Match security rules check: incoming().createdAt == request.time
      };
      
      await setDoc(doc(db, 'projects', id), payload);
      
      return {
        ...projectInput,
        id,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  /**
   * Update an existing project
   */
  async updateProject(id: string, projectInput: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<void> {
    if (!isFirebaseConfigured || !db) {
      const local = getLocalProjects();
      const updated = local.map(p => p.id === id ? { ...p, ...projectInput } : p);
      saveLocalProjects(updated);
      return;
    }

    const path = `projects/${id}`;
    try {
      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, projectInput as any);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  /**
   * Delete an existing project
   */
  async deleteProject(id: string): Promise<void> {
    if (!isFirebaseConfigured || !db) {
      const local = getLocalProjects();
      const filtered = local.filter(p => p.id !== id);
      saveLocalProjects(filtered);
      return;
    }

    const path = `projects/${id}`;
    try {
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  /**
   * Submit contact form message
   */
  async submitMessage(messageInput: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
    const id = 'msg_' + Math.random().toString(36).substr(2, 9);
    const createdAtStr = new Date().toISOString();

    if (!isFirebaseConfigured || !db) {
      const messages = getLocalMessages();
      const newMessage: Message = {
        ...messageInput,
        id,
        createdAt: createdAtStr
      };
      saveLocalMessages([newMessage, ...messages]);
      return newMessage;
    }

    const path = `messages/${id}`;
    try {
      await setDoc(doc(db, 'messages', id), {
        name: messageInput.name,
        email: messageInput.email,
        subject: messageInput.subject,
        message: messageInput.message,
        createdAt: serverTimestamp() // Match security rules check: incoming().createdAt == request.time
      });

      return {
        ...messageInput,
        id,
        createdAt: createdAtStr
      };
    } catch (error) {
      return handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  /**
   * Fetch contact messages (Admins only logic)
   */
  async getMessages(): Promise<Message[]> {
    if (!isFirebaseConfigured || !db) {
      return getLocalMessages();
    }

    const path = 'messages';
    try {
      const querySnapshot = await getDocs(collection(db, path));
      const messages: Message[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        messages.push({
          id: docSnap.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        });
      });
      return messages;
    } catch (error) {
      // If we are getting missing permissions, it triggers rules logic correctly
      return handleFirestoreError(error, OperationType.LIST, path);
    }
  }
};

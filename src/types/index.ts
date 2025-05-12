// Project related types
export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  lead: string;
  statuses: Status[];
  createdAt: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
}

// Issue related types
export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  status: string;
  priority: Priority;
  projectId: string;
  assigneeId: string | null;
  reporterId: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export type IssueType = 'bug' | 'task' | 'feature' | 'improvement';

export type Priority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'member';
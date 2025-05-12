import { Project, Issue, User } from '../types';

export const initialData: {
  projects: Project[];
  issues: Issue[];
  users: User[];
} = {
  users: [
    {
      id: 'user-1',
      name: 'Alex Johnson',
      email: 'alex@bugSquash.com',
      avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'admin',
    },
    {
      id: 'user-2',
      name: 'Sarah Chen',
      email: 'sarah@bugSquash.com',
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'member',
    },
    {
      id: 'user-3',
      name: 'Mike Rodriguez',
      email: 'mike@bugSquash.com',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'member',
    },
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Web Application',
      key: 'WEB',
      description: 'Corporate website and customer portal',
      lead: 'user-1',
      statuses: [
        { id: 'status-1', name: 'Backlog', color: '#EEEEEE' },
        { id: 'status-2', name: 'To Do', color: '#E0E0FF' },
        { id: 'status-3', name: 'In Progress', color: '#FFF8E0' },
        { id: 'status-4', name: 'In Review', color: '#E0F8FF' },
        { id: 'status-5', name: 'Done', color: '#E0FFE0' },
      ],
      createdAt: '2023-01-15T09:00:00.000Z',
    },
    {
      id: 'project-2',
      name: 'Mobile App',
      key: 'MOB',
      description: 'iOS and Android applications',
      lead: 'user-2',
      statuses: [
        { id: 'status-1', name: 'Backlog', color: '#EEEEEE' },
        { id: 'status-2', name: 'To Do', color: '#E0E0FF' },
        { id: 'status-3', name: 'In Progress', color: '#FFF8E0' },
        { id: 'status-5', name: 'Done', color: '#E0FFE0' },
      ],
      createdAt: '2023-02-10T11:30:00.000Z',
    },
  ],
  issues: [
    {
      id: 'issue-1',
      title: 'Login page not working on Safari',
      description: 'Users are unable to log in using Safari browser. The login button does not respond to clicks.',
      type: 'bug',
      status: 'status-3',
      priority: 'high',
      projectId: 'project-1',
      assigneeId: 'user-3',
      reporterId: 'user-1',
      comments: [
        {
          id: 'comment-1',
          content: 'This is affecting multiple users. Needs immediate attention.',
          authorId: 'user-1',
          createdAt: '2023-04-15T14:35:00.000Z',
        },
      ],
      createdAt: '2023-04-15T13:30:00.000Z',
      updatedAt: '2023-04-16T09:15:00.000Z',
    },
    {
      id: 'issue-2',
      title: 'Implement user profile settings',
      description: 'Create a page for users to update their profile information, including photo, name, and email preferences.',
      type: 'feature',
      status: 'status-2',
      priority: 'medium',
      projectId: 'project-1',
      assigneeId: 'user-2',
      reporterId: 'user-1',
      comments: [],
      createdAt: '2023-04-10T10:45:00.000Z',
      updatedAt: '2023-04-10T10:45:00.000Z',
    },
    {
      id: 'issue-3',
      title: 'Improve loading performance',
      description: 'The dashboard takes too long to load. Optimize database queries and implement lazy loading for components.',
      type: 'improvement',
      status: 'status-4',
      priority: 'medium',
      projectId: 'project-1',
      assigneeId: 'user-1',
      reporterId: 'user-2',
      comments: [
        {
          id: 'comment-2',
          content: 'I\'ve identified some slow queries that can be optimized.',
          authorId: 'user-1',
          createdAt: '2023-04-12T16:20:00.000Z',
        },
      ],
      createdAt: '2023-04-11T09:30:00.000Z',
      updatedAt: '2023-04-12T16:20:00.000Z',
    },
    {
      id: 'issue-4',
      title: 'App crashes on Android 11',
      description: 'Multiple users reported app crashes when opening notifications on Android 11 devices.',
      type: 'bug',
      status: 'status-2',
      priority: 'highest',
      projectId: 'project-2',
      assigneeId: 'user-3',
      reporterId: 'user-2',
      comments: [],
      createdAt: '2023-04-18T15:20:00.000Z',
      updatedAt: '2023-04-18T15:20:00.000Z',
    },
  ],
};
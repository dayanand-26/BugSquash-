import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { initialData } from '../data/initialData';
import { Project, Issue, User } from '../types';

// State type
interface AppState {
  projects: Project[];
  currentProject: Project | null;
  issues: Issue[];
  users: User[];
  isLoading: boolean;
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_CURRENT_PROJECT'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_ISSUE'; payload: Issue }
  | { type: 'UPDATE_ISSUE'; payload: Issue }
  | { type: 'DELETE_ISSUE'; payload: string }
  | { type: 'MOVE_ISSUE'; payload: { issueId: string; status: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial state
const initialState: AppState = {
  projects: initialData.projects,
  currentProject: initialData.projects[0],
  issues: initialData.issues,
  users: initialData.users,
  isLoading: false,
  error: null,
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: state.projects.find(p => p.id === action.payload) || null,
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload 
          : state.currentProject,
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
        currentProject: state.currentProject?.id === action.payload 
          ? state.projects.find(p => p.id !== action.payload) || null
          : state.currentProject,
      };
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [...state.issues, action.payload],
      };
    case 'UPDATE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue => 
          issue.id === action.payload.id ? action.payload : issue
        ),
      };
    case 'DELETE_ISSUE':
      return {
        ...state,
        issues: state.issues.filter(issue => issue.id !== action.payload),
      };
    case 'MOVE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(issue =>
          issue.id === action.payload.issueId
            ? { ...issue, status: action.payload.status }
            : issue
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
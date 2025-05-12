import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, PlusCircle, Clock, AlertCircle } from 'lucide-react';
import { Issue } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const { state } = useAppContext();
  
  const project = state.projects.find(p => p.id === issue.projectId);
  const assignee = issue.assigneeId ? state.users.find(u => u.id === issue.assigneeId) : null;
  
  // Convert the priority to a color and icon
  const getPriorityInfo = () => {
    switch (issue.priority) {
      case 'highest':
        return { color: 'text-red-600', bgColor: 'bg-red-50', icon: <AlertCircle className="h-3 w-3" /> };
      case 'high':
        return { color: 'text-amber-600', bgColor: 'bg-amber-50', icon: <AlertCircle className="h-3 w-3" /> };
      case 'medium':
        return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: null };
      case 'low':
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: null };
      case 'lowest':
        return { color: 'text-gray-400', bgColor: 'bg-gray-50', icon: null };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: null };
    }
  };
  
  const { color, bgColor, icon } = getPriorityInfo();

  return (
    <Link 
      to={`/projects/${issue.projectId}/issues/${issue.id}`} 
      className="block bg-white p-3 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start">
          {issue.type === 'bug' ? (
            <Bug className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5 mr-2" />
          ) : issue.type === 'feature' ? (
            <PlusCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
          ) : (
            <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5 mr-2" />
          )}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{issue.title}</h3>
        </div>
        
        <div className={`${bgColor} ${color} flex items-center rounded-full px-2 py-0.5 text-xs`}>
          {icon && <span className="mr-1">{icon}</span>}
          <span>{issue.priority.charAt(0).toUpperCase()}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span>{project?.key}-{issue.id.split('-')[1]}</span>
        
        {assignee ? (
          <div className="flex items-center">
            <img 
              src={assignee.avatarUrl} 
              alt={assignee.name}
              className="h-5 w-5 rounded-full"
              title={assignee.name}
            />
          </div>
        ) : (
          <span className="text-xs text-gray-400">Unassigned</span>
        )}
      </div>
    </Link>
  );
};
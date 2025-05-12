import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, Filter, SortAsc, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { IssueCard } from '../issues/IssueCard';
import { CreateIssueModal } from '../modals/CreateIssueModal';

export const ProjectBoard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useAppContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Find the current project
  const project = state.projects.find(p => p.id === projectId);
  
  if (!project) {
    return <div className="p-4">Project not found</div>;
  }
  
  // Filter issues for this project
  const projectIssues = state.issues.filter(issue => issue.projectId === projectId);
  
  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, issueId: string) => {
    e.dataTransfer.setData('issueId', issueId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    const issueId = e.dataTransfer.getData('issueId');
    
    if (issueId) {
      dispatch({
        type: 'MOVE_ISSUE',
        payload: { issueId, status: statusId },
      });
    }
  };

  return (
    <div className="max-w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{project.name} Board</h1>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <Filter className="h-5 w-5 mr-1" />
            <span className="text-sm">Filter</span>
          </button>
          
          <button className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100">
            <SortAsc className="h-5 w-5 mr-1" />
            <span className="text-sm">Sort</span>
          </button>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Issue
          </button>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="flex space-x-4 overflow-x-auto pb-6">
        {project.statuses.map(status => {
          const statusIssues = projectIssues.filter(issue => issue.status === status.id);
          
          return (
            <div 
              key={status.id} 
              className="flex-shrink-0 w-80 bg-gray-100 rounded-md flex flex-col max-h-[calc(100vh-180px)]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status.id)}
            >
              <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white rounded-t-md">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <h3 className="font-medium text-gray-900">{status.name}</h3>
                  <span className="ml-2 text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
                    {statusIssues.length}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {statusIssues.map(issue => (
                  <div 
                    key={issue.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, issue.id)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <IssueCard issue={issue} />
                  </div>
                ))}
                
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full text-left p-2 text-gray-500 hover:text-gray-700 text-sm flex items-center hover:bg-gray-50 rounded-md"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add issue
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {isCreateModalOpen && (
        <CreateIssueModal
          onClose={() => setIsCreateModalOpen(false)}
          projectId={projectId}
        />
      )}
    </div>
  );
};
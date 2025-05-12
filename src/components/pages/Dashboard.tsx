import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bug, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { CreateProjectModal } from '../modals/CreateProjectModal';

export const Dashboard = () => {
  const { state } = useAppContext();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  
  // Filter issues for quick metrics
  const myIssues = state.issues.filter(issue => issue.assigneeId === state.users[0].id);
  const highPriorityIssues = state.issues.filter(issue => 
    issue.priority === 'highest' || issue.priority === 'high'
  );
  const recentlyUpdated = [...state.issues]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Bug className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Issues</h2>
              <p className="text-2xl font-semibold text-gray-900">{state.issues.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-50 text-amber-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">High Priority</h2>
              <p className="text-2xl font-semibold text-gray-900">{highPriorityIssues.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">My Issues</h2>
              <p className="text-2xl font-semibold text-gray-900">{myIssues.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Projects</h2>
          <button 
            onClick={() => setIsCreateProjectModalOpen(true)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.projects.map(project => {
            const projectIssues = state.issues.filter(i => i.projectId === project.id);
            const completedIssues = projectIssues.filter(i => 
              project.statuses.find(s => s.id === i.status)?.name === 'Done'
            );
            const progress = projectIssues.length 
              ? Math.round((completedIssues.length / projectIssues.length) * 100) 
              : 0;
              
            return (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {project.key}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-700 font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {projectIssues.length} issues
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {recentlyUpdated.map(issue => {
              const project = state.projects.find(p => p.id === issue.projectId);
              const statusObj = project?.statuses.find(s => s.id === issue.status);
              
              return (
                <li key={issue.id} className="p-4 hover:bg-gray-50">
                  <Link to={`/projects/${issue.projectId}/issues/${issue.id}`} className="block">
                    <div className="flex items-start">
                      {issue.type === 'bug' ? (
                        <Bug className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : issue.type === 'feature' ? (
                        <PlusCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{issue.title}</p>
                          {issue.priority === 'highest' && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                              Highest
                            </span>
                          )}
                          {issue.priority === 'high' && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                              High
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500 mr-2">
                            {project?.key}-
                            {issue.id.split('-')[1]}
                          </span>
                          
                          <span 
                            className="text-xs px-2 py-0.5 rounded-full" 
                            style={{ 
                              backgroundColor: statusObj?.color || '#E0E0E0',
                              color: '#333' 
                            }}
                          >
                            {statusObj?.name || 'Unknown'}
                          </span>
                          
                          <span className="text-xs text-gray-500 ml-auto">
                            Updated {new Date(issue.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {isCreateProjectModalOpen && (
        <CreateProjectModal
          onClose={() => setIsCreateProjectModalOpen(false)}
        />
      )}
    </div>
  );
};
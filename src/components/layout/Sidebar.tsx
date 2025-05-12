import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  List, 
  Settings, 
  Users, 
  Calendar, 
  BarChart2, 
  Layers,
  FolderKanban
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Sidebar = () => {
  const { state } = useAppContext();
  const { projectId } = useParams<{ projectId: string }>();
  
  const currentProject = projectId 
    ? state.projects.find(p => p.id === projectId) 
    : null;

  return (
    <aside className="hidden md:flex flex-col w-60 bg-gray-900 text-white overflow-y-auto">
      {/* Project Selection */}
      <div className="p-4 border-b border-gray-700">
        {currentProject ? (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold truncate">{currentProject.name}</h2>
            <p className="text-xs text-gray-400">{currentProject.key}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">BugSquash</h2>
            <p className="text-xs text-gray-400">All Projects</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <Link 
          to="/" 
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400" />
          Dashboard
        </Link>

        <div className="pt-4 pb-2">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Projects
          </h3>
          <div className="mt-2 space-y-1">
            {state.projects.map(project => (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  project.id === projectId
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <FolderKanban className="mr-3 h-5 w-5 text-gray-400" />
                {project.name}
              </Link>
            ))}
          </div>
        </div>

        {currentProject && (
          <>
            <Link 
              to={`/projects/${currentProject.id}`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <List className="mr-3 h-5 w-5 text-gray-400" />
              Board
            </Link>
            
            <Link 
              to={`/projects/${currentProject.id}/calendar`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Calendar className="mr-3 h-5 w-5 text-gray-400" />
              Calendar
            </Link>
            
            <Link 
              to={`/projects/${currentProject.id}/reports`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <BarChart2 className="mr-3 h-5 w-5 text-gray-400" />
              Reports
            </Link>
            
            <Link 
              to={`/projects/${currentProject.id}/components`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Layers className="mr-3 h-5 w-5 text-gray-400" />
              Components
            </Link>
            
            <Link 
              to={`/projects/${currentProject.id}/team`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400" />
              Team
            </Link>
            
            <Link 
              to={`/projects/${currentProject.id}/settings`} 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400" />
              Project Settings
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};
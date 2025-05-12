import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bug, Plus, Bell, Settings, Search, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { CreateProjectModal } from '../modals/CreateProjectModal';
import { CreateIssueModal } from '../modals/CreateIssueModal';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export const Header = () => {
  const { state } = useAppContext();
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="max-w-full mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 mr-10">
              <Bug className="h-7 w-7" />
              <span className="ml-2 text-xl font-bold">BugSquash</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-gray-900 font-medium">
                  Projects
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {state.projects.map(project => (
                    <Link 
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {project.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => setIsCreateProjectModalOpen(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    New Project
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* Center - Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search issues"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsCreateIssueModalOpen(true)}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create
            </button>
            
            <button className="ml-4 text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            
            <button className="ml-4 text-gray-500 hover:text-gray-700">
              <Settings className="h-6 w-6" />
            </button>
            
            <div className="ml-4 relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={state.users[0].avatarUrl}
                  alt="User"
                />
              </button>

              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isCreateIssueModalOpen && (
        <CreateIssueModal
          onClose={() => setIsCreateIssueModalOpen(false)}
        />
      )}

      {isCreateProjectModalOpen && (
        <CreateProjectModal
          onClose={() => setIsCreateProjectModalOpen(false)}
        />
      )}
    </header>
  );
};
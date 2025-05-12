import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

export const ProjectSettings = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useAppContext();
  
  const project = state.projects.find(p => p.id === projectId);
  const [name, setName] = useState(project?.name || '');
  const [key, setKey] = useState(project?.key || '');
  const [description, setDescription] = useState(project?.description || '');
  const [statuses, setStatuses] = useState(project?.statuses || []);
  const [newStatus, setNewStatus] = useState('');
  const [statusColor, setStatusColor] = useState('#E0E0E0');
  
  if (!project) {
    return <div className="p-4">Project not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && key) {
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: {
          ...project,
          name,
          key,
          description,
          statuses,
        },
      });
    }
  };
  
  const addStatus = () => {
    if (newStatus.trim()) {
      setStatuses([
        ...statuses,
        {
          id: `status-${Date.now()}`,
          name: newStatus.trim(),
          color: statusColor,
        },
      ]);
      setNewStatus('');
      setStatusColor('#E0E0E0');
    }
  };
  
  const removeStatus = (id: string) => {
    setStatuses(statuses.filter(status => status.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Project Settings</h1>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                Project Key
              </label>
              <input
                type="text"
                id="key"
                name="key"
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Used as a prefix for issue keys (e.g., {key}-123)
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Workflow Statuses
              </label>
            </div>
            
            <div className="mb-4 space-y-3">
              {statuses.map(status => (
                <div key={status.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{status.name}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeStatus(status.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <label htmlFor="newStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  New Status
                </label>
                <input
                  type="text"
                  id="newStatus"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="e.g., In Testing"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="statusColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  id="statusColor"
                  value={statusColor}
                  onChange={(e) => setStatusColor(e.target.value)}
                  className="h-[38px] w-full rounded-md border-gray-300 shadow-sm p-0"
                />
              </div>
              
              <button
                type="button"
                onClick={addStatus}
                className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!newStatus.trim()}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
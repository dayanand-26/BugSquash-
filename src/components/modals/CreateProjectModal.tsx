import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Project } from '../../types';
import toast from 'react-hot-toast';

interface CreateProjectModalProps {
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose }) => {
  const { dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; key?: string }>();

  const validateForm = () => {
    const newErrors: { name?: string; key?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!key.trim()) {
      newErrors.key = 'Project key is required';
    } else if (!/^[A-Z0-9]+$/.test(key)) {
      newErrors.key = 'Project key must contain only uppercase letters and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: name.trim(),
      key: key.trim().toUpperCase(),
      description: description.trim(),
      lead: 'user-1', // Current user
      statuses: [
        { id: 'status-1', name: 'Backlog', color: '#EEEEEE' },
        { id: 'status-2', name: 'To Do', color: '#E0E0FF' },
        { id: 'status-3', name: 'In Progress', color: '#FFF8E0' },
        { id: 'status-4', name: 'In Review', color: '#E0F8FF' },
        { id: 'status-5', name: 'Done', color: '#E0FFE0' },
      ],
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: 'ADD_PROJECT',
      payload: newProject,
    });

    toast.success('Project created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Create New Project
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors?.name
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter project name"
                />
                {errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Key
                </label>
                <input
                  type="text"
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors?.key
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="e.g., PROJ"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This key will be used as a prefix for all issues (e.g., PROJ-123)
                </p>
                {errors?.key && (
                  <p className="mt-1 text-sm text-red-600">{errors.key}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe your project"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../pages/Dashboard';
import { ProjectBoard } from '../pages/ProjectBoard';
import { IssueDetail } from '../pages/IssueDetail';
import { ProjectSettings } from '../pages/ProjectSettings';
import { NotFound } from '../pages/NotFound';

export const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:projectId" element={<ProjectBoard />} />
            <Route path="/projects/:projectId/issues/:issueId" element={<IssueDetail />} />
            <Route path="/projects/:projectId/settings" element={<ProjectSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
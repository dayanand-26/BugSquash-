import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <Bug className="h-20 w-20 text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-center text-gray-500 max-w-md mb-8">
          We couldn't find the page you're looking for. The bug may have scurried away or never existed.
        </p>
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
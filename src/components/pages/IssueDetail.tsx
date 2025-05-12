import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bug, 
  Clock, 
  PlusCircle, 
  Edit, 
  Trash2, 
  MessageSquare, 
  Link as LinkIcon,
  ArrowLeft
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/formatters';

export const IssueDetail = () => {
  const { projectId, issueId } = useParams<{ projectId: string; issueId: string }>();
  const { state, dispatch } = useAppContext();
  const [comment, setComment] = useState('');
  
  // Find issue and related data
  const issue = state.issues.find(i => i.id === issueId);
  const project = state.projects.find(p => p.id === projectId);
  const assignee = issue?.assigneeId ? state.users.find(u => u.id === issue.assigneeId) : null;
  const reporter = issue?.reporterId ? state.users.find(u => u.id === issue.reporterId) : null;
  const statusObj = project?.statuses.find(s => s.id === issue?.status);
  
  if (!issue || !project) {
    return <div className="p-4">Issue not found</div>;
  }
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_ISSUE',
      payload: { ...issue, status: e.target.value },
    });
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (comment.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        content: comment.trim(),
        authorId: state.users[0].id,
        createdAt: new Date().toISOString(),
      };
      
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: {
          ...issue,
          comments: [...issue.comments, newComment],
          updatedAt: new Date().toISOString(),
        },
      });
      
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <Link to={`/projects/${projectId}`} className="text-gray-500 hover:text-gray-700 mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">{project.key}-{issue.id.split('-')[1]}</span>
            <span className="mx-2">•</span>
            <span>Created {formatDate(issue.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              {issue.type === 'bug' ? (
                <Bug className="h-5 w-5 text-red-500 mr-2" />
              ) : issue.type === 'feature' ? (
                <PlusCircle className="h-5 w-5 text-blue-500 mr-2" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <h1 className="text-xl font-semibold text-gray-900">{issue.title}</h1>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {reporter && (
                <span>Reported by {reporter.name}</span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
              <LinkIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Description</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p>{issue.description}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Comments ({issue.comments.length})
              </h2>
            </div>
            
            <div className="space-y-4">
              {issue.comments.map(comment => {
                const author = state.users.find(u => u.id === comment.authorId);
                
                return (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {author && (
                        <img 
                          src={author.avatarUrl} 
                          alt={author.name}
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {author ? author.name : 'Unknown user'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={state.users[0].avatarUrl} 
                      alt={state.users[0].name}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                      <textarea
                        rows={3}
                        name="comment"
                        id="comment"
                        className="block w-full py-3 px-4 border-0 resize-none focus:outline-none focus:ring-0 sm:text-sm"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      
                      <div className="py-2 px-4 bg-gray-50 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={!comment.trim()}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 space-y-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={issue.status}
              onChange={handleStatusChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              style={{ backgroundColor: statusObj?.color || '#E0E0E0' }}
            >
              {project.statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <div className="flex items-center">
              {assignee ? (
                <>
                  <img 
                    src={assignee.avatarUrl} 
                    alt={assignee.name}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-900">{assignee.name}</span>
                </>
              ) : (
                <span className="text-sm text-gray-500">Unassigned</span>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                issue.priority === 'highest' 
                  ? 'bg-red-100 text-red-800' 
                  : issue.priority === 'high' 
                  ? 'bg-amber-100 text-amber-800'
                  : issue.priority === 'medium'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="mt-1 flex items-center">
              {issue.type === 'bug' ? (
                <>
                  <Bug className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-gray-900">Bug</span>
                </>
              ) : issue.type === 'feature' ? (
                <>
                  <PlusCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-900">Feature</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm text-gray-900">Improvement</span>
                </>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dates
            </label>
            <div className="text-sm text-gray-500 space-y-2">
              <div>
                <span className="font-medium">Created:</span> {formatDate(issue.createdAt)}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {formatDate(issue.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
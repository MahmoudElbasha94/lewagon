import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  size: number;
  uploadDate: string;
}

interface ResourceManagerProps {
  resources: Resource[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (resourceId: string) => Promise<void>;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

const ResourceManager: React.FC<ResourceManagerProps> = ({
  resources,
  onUpload,
  onDelete,
  maxFileSize = 50, // 50MB default max size
  acceptedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.zip', '.rar']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setErrorMessage(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${maxFileSize}MB limit.`);
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      await onUpload(file);

      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('completed');
      
      // Reset after success
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to upload file. Please try again.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length) {
      handleFileUpload(files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } transition-colors duration-200`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your files here, or{' '}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: {acceptedTypes.join(', ')} up to {maxFileSize}MB
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  uploadStatus === 'completed'
                    ? 'bg-green-500'
                    : uploadStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="font-medium">
                {uploadStatus === 'completed'
                  ? 'Upload complete!'
                  : uploadStatus === 'error'
                  ? 'Upload failed'
                  : `Uploading... ${uploadProgress}%`}
              </span>
              {uploadStatus === 'completed' && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {uploadStatus === 'error' && (
                <div className="flex items-center text-red-500">
                  <AlertCircle className="w-5 h-5 mr-1" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Course Resources</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(resource.size)} • {new Date(resource.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(resource.url, '_blank')}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(resource.id)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {resources.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No resources uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceManager; 
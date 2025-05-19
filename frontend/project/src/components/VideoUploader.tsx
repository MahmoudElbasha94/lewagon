import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  onUploadComplete,
  onUploadError,
  maxSize = 500, // 500MB default max size
  acceptedFormats = ['video/mp4', 'video/webm']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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
    if (!acceptedFormats.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload MP4 or WebM videos.');
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${maxSize}MB limit.`);
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    if (!validateFile(file)) {
      setUploadStatus('error');
      onUploadError(errorMessage);
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage('');

    // Simulate file upload with progress
    // Replace this with actual API call to your backend
    try {
      const formData = new FormData();
      formData.append('video', file);

      // Simulated upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 500);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/upload-video', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('completed');
      onUploadComplete('https://example.com/video-url'); // Replace with actual URL from API
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to upload video. Please try again.');
      onUploadError('Upload failed');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length) {
      uploadFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      uploadFile(files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
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
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your video here, or{' '}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              MP4 or WebM up to {maxSize}MB
            </p>
          </div>
        </div>

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
    </div>
  );
};

export default VideoUploader; 
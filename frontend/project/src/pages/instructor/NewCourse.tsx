import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, X, Save } from 'lucide-react';
import PageTransition from '../../components/common/PageTransition';

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: string;
  thumbnail: File | null;
  language: string;
  requirements: string[];
  outcomes: string[];
}

const NewCourse: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    thumbnail: null,
    language: 'english',
    requirements: [''],
    outcomes: ['']
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleArrayInputChange = (index: number, value: string, field: 'requirements' | 'outcomes') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field: 'requirements' | 'outcomes') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'requirements' | 'outcomes') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Navigate to the course edit page or course list
    navigate('/instructor/courses');
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="development">Development</option>
                    <option value="business">Business</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Course Thumbnail</h2>
            
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Course thumbnail"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-50 file:text-red-700
                    hover:file:bg-red-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended size: 1280x720 pixels
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Course Requirements</h2>
            
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'requirements')}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter a requirement"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'requirements')}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('requirements')}
              className="mt-2 flex items-center text-sm text-red-500 hover:text-red-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Requirement
            </button>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Learning Outcomes</h2>
            
            {formData.outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, 'outcomes')}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter a learning outcome"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'outcomes')}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('outcomes')}
              className="mt-2 flex items-center text-sm text-red-500 hover:text-red-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Learning Outcome
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/instructor/courses')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Course
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default NewCourse; 
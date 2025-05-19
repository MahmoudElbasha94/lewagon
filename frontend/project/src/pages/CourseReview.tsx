import React, { useState } from 'react';
import { useCourses } from '../contexts/CourseContext';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';

interface CourseReviewAction {
  courseId: string;
  action: 'approve' | 'reject';
  feedback?: string;
}

const CourseReview: React.FC = () => {
  const { courses, updateCourseStatus } = useCourses();
  const [feedback, setFeedback] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const pendingCourses = courses.filter(course => course.status === 'pending');

  const handleReviewAction = async (action: CourseReviewAction) => {
    try {
      await updateCourseStatus({
        courseId: action.courseId,
        status: action.action === 'approve' ? 'approved' : 'rejected',
        feedback: action.feedback
      });
      setSelectedCourse(null);
      setFeedback('');
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Course Review</h1>
        
        {/* TODO: في Django، سيتم استخدام:
        1. Django Admin بدلاً من Course Review
        2. Django Forms بدلاً من Review Forms
        3. Django ORM بدلاً من Review Data
        4. Django Permissions بدلاً من Review Access
        5. Django Signals بدلاً من Review Events */}
        
        {pendingCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">All Caught Up!</h2>
            <p className="text-gray-500">No pending courses to review.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">{course.instructor.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{course.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">${course.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{course.duration} hours</p>
                      </div>
                    </div>

                    {selectedCourse === course.id && (
                      <div className="mt-4">
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Enter feedback for instructor (optional)"
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        if (selectedCourse === course.id) {
                          handleReviewAction({
                            courseId: course.id,
                            action: 'approve',
                            feedback
                          });
                        } else {
                          setSelectedCourse(course.id);
                        }
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        if (selectedCourse === course.id) {
                          handleReviewAction({
                            courseId: course.id,
                            action: 'reject',
                            feedback
                          });
                        } else {
                          setSelectedCourse(course.id);
                        }
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CourseReview; 
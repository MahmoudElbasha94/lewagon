import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, FileText, Paperclip, 
  ThumbsUp, Send, Download, BookOpen,
  ChevronLeft, ChevronRight, File
} from 'lucide-react';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

const LessonViewPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses, loading } = useCourses();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'notes' | 'comments' | 'attachments'>('notes');
  const [newComment, setNewComment] = useState('');
  const [newNote, setNewNote] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Find current course and lesson
  const course = courses.find(c => String(c.id) === courseId);
  const section = course?.sections.find(s => 
    s.lessons.some(l => String(l.id) === lessonId)
  );
  const lesson = section?.lessons.find(l => String(l.id) === lessonId);

  // Get next and previous lessons
  const allLessons = course?.sections.flatMap(s => s.lessons) || [];
  const currentLessonIndex = allLessons.findIndex(l => String(l.id) === lessonId);
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;
  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newComment,
      timestamp: new Date(),
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    toast.success('Comment added successfully');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: new Date()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    toast.success('Note saved successfully');
  };

  const navigateToLesson = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  if (loading || !course || !lesson) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={lesson.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => previousLesson && navigateToLesson(previousLesson.id)}
            disabled={!previousLesson}
            className={`flex items-center px-4 py-2 rounded-lg ${
              previousLesson ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            <ChevronLeft className="mr-2" />
            Previous Lesson
          </button>
          <button
            onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
            disabled={!nextLesson}
            className={`flex items-center px-4 py-2 rounded-lg ${
              nextLesson ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
            }`}
          >
            Next Lesson
            <ChevronRight className="ml-2" />
          </button>
        </div>

        {/* Lesson Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-600">{lesson.description}</p>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-4 flex items-center ${
                  activeTab === 'notes'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <FileText className="mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`px-6 py-4 flex items-center ${
                  activeTab === 'comments'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <MessageCircle className="mr-2" />
                Comments
              </button>
              <button
                onClick={() => setActiveTab('attachments')}
                className={`px-6 py-4 flex items-center ${
                  activeTab === 'attachments'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <Paperclip className="mr-2" />
                Attachments
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'notes' && (
              <div>
                <div className="mb-6">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add your notes here..."
                    className="w-full p-4 border rounded-lg resize-none h-32"
                  />
                  <button
                    onClick={handleAddNote}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Note
                  </button>
                </div>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <p className="text-gray-800">{note.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(note.timestamp).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div>
                <div className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add your comment..."
                    className="w-full p-4 border rounded-lg resize-none h-32"
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Post Comment
                  </button>
                </div>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{comment.userName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-2 text-gray-700">{comment.content}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attachments' && (
              <div>
                <div className="space-y-4">
                  {lesson.attachments?.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <File className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                      <a
                        href={attachment.url}
                        download
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  ))}

                  {(!lesson.attachments || lesson.attachments.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No attachments available for this lesson
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewPage; 
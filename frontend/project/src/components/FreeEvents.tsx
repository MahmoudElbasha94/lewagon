import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
}

const FreeEvents: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Introduction to Web Development",
      date: "2024-04-15",
      time: "18:00 - 20:00",
      location: "Online (Zoom)",
      capacity: 100,
      description: "Learn the basics of HTML, CSS, and JavaScript in this interactive workshop."
    },
    {
      id: 2,
      title: "Data Science Career Path",
      date: "2024-04-20",
      time: "15:00 - 17:00",
      location: "Online (Zoom)",
      capacity: 75,
      description: "Discover how to start your career in data science and machine learning."
    },
    {
      id: 3,
      title: "Mobile App Development Workshop",
      date: "2024-04-25",
      time: "19:00 - 21:00",
      location: "Online (Zoom)",
      capacity: 50,
      description: "Build your first mobile app using React Native in this hands-on session."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Upcoming Free Events</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our free online events and workshops to learn new skills, meet other developers,
          and take your career to the next level.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
              <p className="text-gray-600 mb-6">{event.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span>{event.capacity} spots available</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Can't make it to these events? Don't worry!
        </p>
        <button className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors">
          Notify me of future events
        </button>
      </div>
    </div>
  );
};

export default FreeEvents; 
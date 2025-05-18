import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// Enable CORS for the frontend
app.use(cors());
app.use(express.json());

// Mock instructor data
const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    bio: "Full-stack developer with 10+ years of experience in web technologies and cloud computing. Passionate about teaching and mentoring new developers.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    expertise: ["Web Development", "Cloud Computing", "JavaScript"],
    rating: 4.9,
    totalStudents: 15000,
    totalCourses: 12,
    email: "sarah.johnson@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahjohnson",
      website: "https://sarahjohnson.dev"
    }
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    bio: "Data scientist and machine learning expert with a PhD in Computer Science. Specializes in AI applications and deep learning frameworks.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    expertise: ["Data Science", "Machine Learning", "Python"],
    rating: 4.8,
    totalStudents: 12000,
    totalCourses: 8,
    email: "michael.chen@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/michaelchen"
    }
  },
  {
    id: 3,
    name: "Emma Davis",
    bio: "UI/UX design specialist with a focus on user-centered design principles. Has worked with major tech companies on improving user experience.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    expertise: ["UI/UX Design", "Web Design", "Figma"],
    rating: 4.7,
    totalStudents: 8000,
    totalCourses: 6,
    email: "emma.davis@example.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/emmadavis",
      website: "https://emmadavis.design"
    }
  }
];

// GET all instructors
app.get('/api/instructors', (req, res) => {
  res.json(instructors);
});

// GET instructor by ID
app.get('/api/instructors/:id', (req, res) => {
  const instructor = instructors.find(i => i.id === parseInt(req.params.id));
  if (instructor) {
    res.json(instructor);
  } else {
    res.status(404).json({ message: 'Instructor not found' });
  }
});

// Search instructors
app.get('/api/instructors/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const filtered = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(query) ||
    instructor.bio.toLowerCase().includes(query) ||
    instructor.expertise.some(exp => exp.toLowerCase().includes(query))
  );
  res.json(filtered);
});

// Filter instructors by expertise
app.get('/api/instructors/filter', (req, res) => {
  const expertise = req.query.expertise.split(',');
  const filtered = instructors.filter(instructor =>
    instructor.expertise.some(exp => expertise.includes(exp))
  );
  res.json(filtered);
});

// Submit instructor application
app.post('/api/instructors/apply', (req, res) => {
  // In a real application, this would save to a database
  console.log('Received application:', req.body);
  res.json({ 
    success: true, 
    message: 'Application submitted successfully' 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
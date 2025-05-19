import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Example: Send a test notification every 10 seconds
  const interval = setInterval(() => {
    socket.emit('notification', {
      id: Math.random().toString(36).substring(2, 9),
      userId: socket.handshake.auth.userId,
      title: 'Test Notification',
      message: 'This is a test notification',
      type: 'info',
      createdAt: new Date().toISOString()
    });
  }, 10000);

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
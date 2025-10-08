import express from 'express';
import { app } from './app.js'
import dotenv from 'dotenv';
dotenv.config();

// --- SOCKET.IO SETUP ---
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Export io for use in controllers
export { io };

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a chat room
  socket.on('joinRoom', (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined room ${chatId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (data) => {
    // data: { chatId, text, senderId }
    try {
      // TODO: Save message to DB using your existing logic
      // Example: const savedMessage = await Message.create({ ... });
      // For now, just echo back the message
      const savedMessage = {
        id: Date.now(),
        chatId: data.chatId,
        text: data.text,
        userId: data.senderId,
        createdAt: new Date()
      };
      // Emit to all users in the room
      io.to(data.chatId).emit('newMessage', savedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on port ${PORT}`);
});
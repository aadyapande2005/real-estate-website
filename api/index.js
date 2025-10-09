import express from 'express';
import { app } from './app.js'
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

export { io };

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined room ${chatId}`);
  });

  socket.on('sendMessage', async (data) => {
    try {
      const savedMessage = {
        id: Date.now(),
        chatId: data.chatId,
        text: data.text,
        userId: data.senderId,
        createdAt: new Date()
      };
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
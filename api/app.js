import express, { json } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

import authroute from './routes/auth.route.js'
import userroute from './routes/user.route.js'
import postroute from './routes/posts.route.js'
import chatroute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'

app.use('/api/auth', authroute)
app.use('/api/user', userroute)
app.use('/api/posts', postroute)
app.use('/api/chats', chatroute)
app.use('/api/message', messageRoute)

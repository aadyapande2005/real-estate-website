import express, { json } from 'express';

export const app = express();

app.use(express.json())
app.use(cookieParser())

import authroute from './routes/auth.route.js'
import userroute from './routes/user.route.js'
import cookieParser from 'cookie-parser';


app.use('/api/auth', authroute)
app.use('/api/user', userroute)


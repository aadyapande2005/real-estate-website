import express, { json } from 'express';

export const app = express();

app.use(express.json())

import authroute from './routes/auth.route.js'
import userroute from './routes/user.route.js'


app.use('/api/auth', authroute)
app.use('/api/user', userroute)


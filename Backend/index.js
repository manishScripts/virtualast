import express from 'express';
import dotenv from 'dotenv';
import { default as connectdb } from './config/db.js';
import authRouter from './auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
dotenv.config();

const app=  express();
const port  = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
})

app.listen(port,() =>{
  connectdb();
  console.log(`Server is running on http://localhost:${port}`);
})
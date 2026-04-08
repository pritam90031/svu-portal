import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import route from './routes/index.js';
import connectDB from './config/mongoDB.js';

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/', route);
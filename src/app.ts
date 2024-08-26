import express, { Express } from 'express';
import cors from 'cors';
import { authRouter } from './routes';
import errorMiddleware from './middlewares/error.middleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/auth', authRouter);

app.use(errorMiddleware);

export { app };
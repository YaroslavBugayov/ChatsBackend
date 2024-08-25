import express, { Express } from 'express';
import cors from 'cors';
import { authRouter } from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

app.use(errorMiddleware);

export { app };
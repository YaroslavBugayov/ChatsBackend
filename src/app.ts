import express, { Express } from 'express';
import cors from 'cors';
import { authRouter } from './routes';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

export { app };
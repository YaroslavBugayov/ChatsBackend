import express, {Express} from 'express';
import cors from 'cors';
import { authRoutes } from './routes';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)

export { app };
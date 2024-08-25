import dotenv from 'dotenv';
import {server} from './server';
import { init } from './database/db';

dotenv.config();

const PORT: string = process.env.PORT || '3000';

init();

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
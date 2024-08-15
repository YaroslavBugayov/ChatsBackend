import dotenv from 'dotenv';
import {server} from './server';

dotenv.config();

const PORT: string = process.env.PORT || '3000';

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
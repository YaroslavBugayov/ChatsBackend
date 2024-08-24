import { BaseRepository } from './base.repository';
import { User } from '../database/db';

class UserRepository extends BaseRepository<typeof User> {
    constructor() {
        super(User);
    }
}

export const userRepository = new UserRepository();
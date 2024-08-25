import { BaseRepository } from './base.repository';
import { User } from '../database/models';

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }
}

export const userRepository = new UserRepository();
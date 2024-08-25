import { UserModel } from '../models';
import { userRepository } from '../repositories/user.repository';
import { User } from '../database/models';
import { ApiError } from '../errors/api.error';
import { tokenService } from './token.service';

export const userService = {
    async getById(id: number): Promise<UserModel> {
        const user: User | null = await userRepository.getById(id);

        if (!user) {
            throw ApiError.NotFoundError("Teacher not found");
        }
        return user.toJSON();
    },

    async create(data: { email: string, username: string, password: string }): Promise<UserModel> {
        const teacher: User = await userRepository.create({ ...data, refreshToken: '' });
        return teacher.toJSON();
    },

    async update(id: number, data: any): Promise<UserModel | null> {
        await userRepository.update(id, data);
        return this.getById(id);
    },

    async delete(id: number): Promise<number> {
        return userRepository.delete(id);
    }
}
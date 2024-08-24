import { UserModel } from '../models';
import { UserType } from '../database/models/user.model';
import { userRepository } from '../repositories/user.repository';
import { Error } from 'sequelize';

export const userService = {
    async getById(id: number): Promise<UserType> {
        const teacher: UserType | null = await userRepository.getById(id);
        if (!teacher) {
            // throw ApiError.NotFoundError("Teacher not found");
            throw Error('Teacher not found');
        }
        return teacher.toJSON();
    },

    async create(data: UserModel): Promise<UserType> {
        const teacher: UserType = await userRepository.create(data);
        return teacher.toJSON();
    },

    async update(id: number, data: any): Promise<UserType | null> {
        await userRepository.update(id, data);
        return this.getById(id);
    },

    async delete(id: number): Promise<number> {
        return userRepository.delete(id);
    }
}
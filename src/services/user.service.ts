import { UserModel, CredentialsModel } from '../models';
import { userRepository } from '../repositories/user.repository';
import { User } from '../database/models';
import { ApiError } from '../errors/api.error';
import { tokenService } from './token.service';
import { compareSync, hashSync } from 'bcrypt';
import { Attributes } from 'sequelize';

export const userService = {
    async getById(id: number): Promise<UserModel> {
        const user: User | null = await userRepository.getById(id);

        if (!user) {
            throw ApiError.NotFoundError("User not found");
        }
        return user.toJSON();
    },

    async create(data: { email: string, username: string, password: string }): Promise<UserModel> {
        const hashedPassword = hashSync(data.password, 10);

        const user: User = await userRepository.create({
            email: data.email,
            username: data.username,
            password: hashedPassword,
            refreshToken: ''
        });

        return generateAndSaveToken(user);
    },

    async update(id: number, data: Partial<Attributes<User>>): Promise<UserModel> {
        await userRepository.update(id, data);
        return this.getById(id);
    },

    async delete(id: number): Promise<number> {
        return userRepository.delete(id);
    },

    async login(data: CredentialsModel): Promise<UserModel> {
        const user: User | null = await userRepository.getByAttribute({ email: data.email });

        if (!user) {
            throw ApiError.NotFoundError("User not found");
        }

        if (!compareSync(data.password, user.password)) {
            throw ApiError.UnauthorizedError('Incorrect password');
        }

        return generateAndSaveToken(user);
    },

    async logout(refreshToken: string): Promise<UserModel> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userId = tokenService.validateRefreshToken(refreshToken);

        if (!userId) {
            throw ApiError.NotFoundError("User not found");
        }

        return await tokenService.removeToken(userId);
    },

    async refresh(refreshToken: string): Promise<UserModel> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userId = tokenService.validateRefreshToken(refreshToken);

        if (!userId) {
            throw ApiError.UnauthorizedError();
        }

        const user = await userRepository.getById(userId);

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        return generateAndSaveToken(user);
    }
}

const generateAndSaveToken = async (user: User): Promise<UserModel> => {
    const { accessToken, refreshToken } = tokenService.generateTokens(user.id);

    const userModel: UserModel = await userService.update(user.id, { refreshToken: refreshToken });

    return { ...userModel, accessToken };
}
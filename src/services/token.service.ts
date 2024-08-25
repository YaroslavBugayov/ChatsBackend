import jwt, { sign } from "jsonwebtoken";
import { JwtPayloadModel, UserModel } from '../models';
import { userService } from ".";

export const tokenService = {
    generateTokens(userId: number) : { accessToken: string, refreshToken: string } {
        const accessToken = sign(
            { userId: userId },
            process.env.JWT_ACCESS_SECRET as jwt.Secret,
            { expiresIn: '30m' }
        );

        const refreshToken = sign(
            { userId: userId },
            process.env.JWT_REFRESH_SECRET as jwt.Secret,
            { expiresIn: '30d' }
        );
        return { accessToken, refreshToken };
    },

    async saveToken(userId: number, refreshToken: string) : Promise<UserModel> {
        await userService.update(userId, { refreshToken: refreshToken });
        return userService.getById(userId);
    },

    async removeToken(userId: number) : Promise<UserModel | null> {
        await userService.update(userId, { refreshToken: null });
        return userService.getById(userId);
    },

    async getToken(userId: number) : Promise<string | null> {
        const user: UserModel | null = await userService.getById(userId);
        return user ? user.refreshToken : null;
    },

    validateAccessToken(token: string) : number | null {
        try {
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayloadModel;
            return user.userId;
        } catch (error) {
            return null;
        }
    },

    validateRefreshToken(token: string) : number | null {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayloadModel;
            return user.userId;
        } catch (error) {
            return null;
        }
    }
};
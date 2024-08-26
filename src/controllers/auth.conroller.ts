import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { CredentialsModel, UserModel } from '../models';

export const authController = {
    async signup(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { email, username, password }: UserModel = req.body;
            const userModel = await userService.create({ email, username, password });

            res.cookie('refreshToken', userModel.refreshToken, {
                maxAge: 30 * 24 * 360000,
                httpOnly: true
            });

            return res.status(200).json({
                user: {
                    email: userModel.email,
                    username: userModel.username,
                },
                tokens: {
                    accessToken: userModel.accessToken,
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const credentials: CredentialsModel = req.body;
            const userModel = await userService.login(credentials);

            res.cookie('refreshToken', userModel.refreshToken, {
                maxAge: 30 * 24 * 360000,
                httpOnly: true
            });

            return res.status(200).json({
                user: {
                    email: userModel.email,
                    username: userModel.username,
                },
                tokens: {
                    accessToken: userModel.accessToken,
                }
            })
        } catch (error) {
            next(error);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const refreshToken: string = req.cookies.refreshToken;

            const userModel = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.status(200).json({
                user: {
                    email: userModel.email,
                    username: userModel.username,
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { refreshToken } = req.cookies;

            const userModel = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userModel.refreshToken, {
                maxAge: 30 * 24 * 360000,
                httpOnly: true
            });

            return res.status(200).json({
                user: {
                    email: userModel.email,
                    username: userModel.username,
                },
                tokens: {
                    accessToken: userModel.accessToken,
                }
            })
        } catch (error) {
            next(error);
        }
    }
}
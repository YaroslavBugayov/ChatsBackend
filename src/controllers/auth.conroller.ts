import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { UserModel } from '../models';

export const authController = {
    async signup(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { email, username, password }: UserModel = req.body;
            const userModel = await userService.create({ email, username, password });

            return res.status(200).json({
                user: {
                    email: userModel.email,
                    username: userModel.username
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            return res.status(200);
        } catch (error) {
            next(error);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            return res.status(200);
        } catch (error) {
            next(error);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            return res.status(200);
        } catch (error) {
            next(error);
        }
    }
}
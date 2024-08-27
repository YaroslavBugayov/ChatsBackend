import { ApiError } from '../errors/api.error';
import { AuthenticatedRequest } from '../models';
import { Response, NextFunction } from 'express';
import { tokenService } from '../services';

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];
        const userId = tokenService.validateAccessToken(accessToken);

        if (!userId) {
            return next(ApiError.ForbiddenError());
        }

        req.userId = userId;
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}
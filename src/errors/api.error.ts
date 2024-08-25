import { Error } from 'sequelize';

export class ApiError extends Error {
    constructor(public status: number, message: string, public errors: Error[] = []) {
        super(message);
    }

    static BadRequest(message: string): ApiError {
        return new ApiError(400, message);
    }

    static UnauthorizedError() {
        return new ApiError(401, "User not authorized");
    }

    static ForbiddenError() {
        return new ApiError(403, "Forbidden");
    }

    static NotFoundError(message: string = "Not Found"): ApiError {
        return new ApiError(404, message);
    }
}
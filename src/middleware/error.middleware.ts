import { Request, Response } from 'express';

// Error handler middleware
export const errorHandler = (
    err: Error,
    _: Request,
    res: Response,
) => {
    console.error(`Error: ${err.message}`);

    res.status(500).json({
        status: 'error',
        message: 'Internal server error occurred. Please try again later.'
    });
};

// 404 Not Found middleware
export const notFoundHandler = (
    req: Request,
    res: Response,
) => {
    res.status(404).json({
        status: 'error',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
};
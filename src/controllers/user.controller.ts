import {Request, Response} from 'express';
import userService from '../service/user.service';
import { validateUserCreation, validateUserUpdate } from '../utils/validate';

class UserController {
    getAllUsers(_: Request, res: Response): void {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    }

    getUserById(req: Request, res: Response): void {
        const { userId } = req.params;
        const { user, error } = userService.getUserById(userId);

        if (error) {
            if (error.includes('Invalid user ID')) {
                res.status(400).json({ status: 'error', message: error });
            } else {
                res.status(404).json({ status: 'error', message: error });
            }
            return;
        }

        res.status(200).json(user);
    }

    createUser(req: Request, res: Response): void {
        const validation = validateUserCreation(req.body);

        if (!validation.valid) {
            res.status(400).json({
                status: 'error',
                message: 'Invalid user data',
                errors: validation.errors
            });
            return;
        }

        const newUser = userService.createUser(req.body);
        res.status(201).json(newUser);
    }

    updateUser(req: Request, res: Response): void {
        const { userId } = req.params;

        const validation = validateUserUpdate(req.body);
        if (!validation.valid) {
            res.status(400).json({
                status: 'error',
                message: 'Invalid user data',
                errors: validation.errors
            });
            return;
        }

        const { user, error } = userService.updateUser(userId, req.body);

        if (error) {
            if (error.includes('Invalid user ID')) {
                res.status(400).json({ status: 'error', message: error });
            } else {
                res.status(404).json({ status: 'error', message: error });
            }
            return;
        }

        res.status(200).json(user);
    }

    deleteUser(req: Request, res: Response): void {
        const { userId } = req.params;
        const { success, error } = userService.deleteUser(userId);

        if (!success) {
            if (error && error.includes('Invalid user ID')) {
                res.status(400).json({ status: 'error', message: error });
            } else {
                res.status(404).json({ status: 'error', message: error });
            }
            return;
        }

        res.status(204).send();
    }
}

export default new UserController();
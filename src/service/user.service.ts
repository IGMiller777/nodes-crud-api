import db from '../db/in-memory.db';
import { User, UserCreateDto, UserUpdateDto } from '../models/user.model';
import { isValidUuid } from '../utils/validate';

class UserService {
    getAllUsers(): User[] {
        return db.getAllUsers();
    }

    getUserById(id: string): { user?: User; error?: string } {
        if (!isValidUuid(id)) {
            return { error: 'Invalid user ID format' };
        }

        const user = db.getUserById(id);
        if (!user) {
            return { error: `User with id ${id} not found` };
        }

        return { user };
    }

    createUser(userData: UserCreateDto): User {
        return db.createUser(userData);
    }

    updateUser(id: string, userData: UserUpdateDto): { user?: User; error?: string } {
        if (!isValidUuid(id)) {
            return { error: 'Invalid user ID format' };
        }

        const updatedUser = db.updateUser(id, userData);
        if (!updatedUser) {
            return { error: `User with id ${id} not found` };
        }

        return { user: updatedUser };
    }


    deleteUser(id: string): { success: boolean; error?: string } {
        if (!isValidUuid(id)) {
            return { success: false, error: 'Invalid user ID format' };
        }

        const user = db.getUserById(id);
        if (!user) {
            return { success: false, error: `User with id ${id} not found` };
        }

        const result = db.deleteUser(id);
        return { success: result };
    }
}

export default new UserService();
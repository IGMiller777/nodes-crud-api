import { User, UserCreateDto, UserUpdateDto } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

class InMemoryDb {
    private users: Map<string, User> = new Map();

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    getUserById(id: string): User | undefined {
        return this.users.get(id);
    }

    createUser(userData: UserCreateDto): User {
        const id = uuidv4();
        const newUser = {id, ...userData};

        this.users.set(id, newUser);

        return newUser;
    }

    updateUser(id: string, userData: UserUpdateDto): User | undefined{
        const user = this.getUserById(id);
        if(!user) {
            return undefined;
        }

        const updatedUser = { ...user, ...userData };
        this.users.set(id, updatedUser);
        return updatedUser;
    }

    deleteUser(id: string): boolean {
        return this.users.delete(id);
    }
}

const db = new InMemoryDb();

export default db;
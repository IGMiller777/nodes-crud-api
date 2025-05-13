import { validate as uuidValidate } from 'uuid';

export const isValidUuid = (id: string): boolean => {
    return uuidValidate(id);
};

export const validateUserCreation = (data: any): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
        return { valid: false, errors: ['Request body must be a valid JSON object'] };
    }

    if (!data.username || typeof data.username !== 'string') {
        errors.push('Username is required and must be a string');
    }

    if (data.age === undefined || typeof data.age !== 'number' || isNaN(data.age)) {
        errors.push('Age is required and must be a number');
    }

    if (!Array.isArray(data.hobbies)) {
        errors.push('Hobbies is required and must be an array');
    } else {
        for (const hobby of data.hobbies) {
            if (typeof hobby !== 'string') {
                errors.push('All hobbies must be strings');
                break;
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

export const validateUserUpdate = (data: any): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
        return { valid: false, errors: ['Request body must be a valid JSON object'] };
    }

    if (data.username !== undefined && typeof data.username !== 'string') {
        errors.push('Username must be a string');
    }

    if (data.age !== undefined && (typeof data.age !== 'number' || isNaN(data.age))) {
        errors.push('Age must be a number');
    }

    if (data.hobbies !== undefined) {
        if (!Array.isArray(data.hobbies)) {
            errors.push('Hobbies must be an array');
        } else {
            for (const hobby of data.hobbies) {
                if (typeof hobby !== 'string') {
                    errors.push('All hobbies must be strings');
                    break;
                }
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
};
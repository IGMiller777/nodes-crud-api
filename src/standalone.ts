import { resolve } from 'path';

import * as dotenv from 'dotenv';
import { DEFAULT_PORT as DB_SERVICE_DEFAULT_PORT, startMemoryDBService } from './DBService/DBMemoryServiceServer';
import { DEFAULT_PORT as USER_SERVICE_DEFAULT_PORT, startUsersService } from './UsersService/UserServiceServer';

dotenv.config({path: resolve(__dirname, '.env')});

const memoryDbPort = Number(process.env.MEMORY_DB_SERVICE_PORT) || DB_SERVICE_DEFAULT_PORT;
const userServicePort = Number(process.env.USER_SERVICE_PORT) || USER_SERVICE_DEFAULT_PORT;

startMemoryDBService(memoryDbPort);

startUsersService({
    port: userServicePort,
    dbServiceUrl: `http://localhost:${memoryDbPort}`
});

console.log(123)
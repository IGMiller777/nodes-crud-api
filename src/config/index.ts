import dotenv from "dotenv";
import * as process from 'node:process';

const DEFAULT_PORT = 4000;
const DEFAULT_MODE = 'development';

dotenv.config();

const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
    nodeEnv: process.env.NODE_ENV || DEFAULT_MODE
}

export default config;
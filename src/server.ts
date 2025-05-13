import app from './app';
import config from './config';

const port = config.port;

const server = app.listen(port, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

export default server;
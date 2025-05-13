import express from 'express';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
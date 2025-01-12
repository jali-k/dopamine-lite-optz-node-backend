import express, {Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.midleware';
import routes from './routes/index';
import sequelize from './config/database';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Dopamine Lite" });
});

// Error handling
app.use(errorHandler);

// Database connection and server startup
const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync database (in development)
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database synchronized');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
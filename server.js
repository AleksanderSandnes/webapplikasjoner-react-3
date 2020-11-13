import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {PORT} from './constants/index.js';
import 'dotenv/config.js';
import errorMiddleware from './middleware/errors.js';
import connectDatabase from './config/database.js';
import poll from './routes/poll.js';
import user from './routes/user.js';

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
}));

app.use('${process.env.BASEURL}/polls', poll);
app.use('${process.env.BASEURL}/users', user);
app.use(errorMiddleware);

connectDatabase();

const server = app.listen(
    PORT,
    console.log('Server running in ${process.env.NODE_ENV} mode on port ${PORT}')
);

process.on('unhandledRejection', (err) => {
    console.log('Errors: ${err.message}');
    console.log('Shutting down server due to unhandled promise rejection');
    console.log('Feilen er i server.js');
    server.close(() => {
        process.exit(1);
    });
});
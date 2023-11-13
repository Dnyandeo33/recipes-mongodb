import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import recipeRoutes from './routes/recipe.js';
import userRoutes from './routes/user.js';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 5009;

// initialize express
const app = express();

// cors
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use routes
app.use(userRoutes);
app.use(recipeRoutes);

// error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// listen

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);
        console.log('Connected to DB successfully');

        app.listen(PORT, () => {
            console.log(`Server is up and running on port : ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

connectDb();

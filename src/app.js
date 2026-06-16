import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("failed to start server", error);
    }
};

startServer();

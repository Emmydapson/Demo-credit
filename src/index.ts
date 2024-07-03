import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import walletRoutes from './routes/walletRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/wallet', walletRoutes);

let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app, server };

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from '../config/connectDB';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use(morgan("dev"));
const PORT = process.env.PORT || 3001

app.get("/", (req: Request, res: Response): Response => {
    try {
      return res.status(200).json({
        message: "Welcome",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  app.use(express.json());
  app.use(cookieParser());
  
  // Roteamento para usuários
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes)
  
  // Rota para caso a rota não seja encontrada
  app.use((req: Request, res: Response): Response => {
    return res.status(404).json({
      message: "Route not found",
    });
  });
  
  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
  });
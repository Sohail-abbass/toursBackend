import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: '🚀 Tours & Packages API is running!',
    version: '1.0.0',
    endpoints: {
      tours: '/api/tours',
      packages: '/api/packages',
      bookings: '/api/bookings',
      destinations: '/api/destinations',
      auth: '/api/auth'
    }
  });
});

// Legacy routes (for backward compatibility with json-server)
// These match the old json-server endpoints
app.get('/tours', async (req: Request, res: Response) => {
  try {
    const Tour = require('./models/Tour').default;
    const tours = await Tour.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tours' });
  }
});

app.get('/packages', async (req: Request, res: Response) => {
  try {
    const Package = require('./models/Package').default;
    const packages = await Package.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching packages' });
  }
});

app.get('/destinations', async (req: Request, res: Response) => {
  try {
    const Destination = require('./models/Destination').default;
    const destinations = await Destination.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching destinations' });
  }
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║     🌍 Tours & Packages Backend API           ║
╠═══════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}      ║
║  Environment: ${process.env.NODE_ENV || 'development'}                    ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;


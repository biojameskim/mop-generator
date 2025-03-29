import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import fs from 'fs';

// Import all routes
import mopRoutes from './routes/mop.routes';
import templateRoutes from './routes/template.routes';

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure sample data exists
const mopsPath = path.join(dataDir, 'mops.json');
if (!fs.existsSync(mopsPath)) {
  // Copy sample data if it exists
  const sampleMopsPath = path.join(__dirname, '../src/data/mops.json');
  if (fs.existsSync(sampleMopsPath)) {
    fs.copyFileSync(sampleMopsPath, mopsPath);
  } else {
    // Create empty array if sample data doesn't exist
    fs.writeFileSync(mopsPath, '[]', 'utf8');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/mops', mopRoutes);
app.use('/api/templates', templateRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
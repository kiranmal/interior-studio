import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import enquiryRoute from './routes/enquiry.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Ivy Interio API' });
});

app.use('/api/enquiry', enquiryRoute);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI is missing. Add it to server/.env before accepting enquiries.');
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    }

    app.listen(port, () => {
      console.log(`Ivy Interio API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();

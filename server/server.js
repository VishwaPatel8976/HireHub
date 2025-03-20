import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

//initialize express
const app = express();

// database connection
await connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('API Working');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)

//port
const PORT = process.env.PORT || 6284;

Sentry.setupExpressErrorHandler(app);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
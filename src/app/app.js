import cors from 'cors';
import express from 'express';

export const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

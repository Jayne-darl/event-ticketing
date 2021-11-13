import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import config from './config';
import appRouter from './router';
import { connect } from './utils/db';

dotenvConfig();

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', appRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

export default app;

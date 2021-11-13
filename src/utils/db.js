import mongoose from 'mongoose';
import app_config from '../config';

export const connect = async () => {
  try {
    await mongoose.connect(app_config.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Get the default connection
    console.log('Connected to database');
    const db = mongoose.connection;
    return db;
  } catch (error) {
    throw new Error(error);
  }
};

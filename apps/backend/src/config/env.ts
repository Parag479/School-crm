import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgrespassword@localhost:5432/edumanage?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'edumanage-super-secure-jwt-secret-key-32chars',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'edumanage-super-secure-refresh-jwt-secret-key-32chars',
  JWT_EXPIRES_IN: '1d',
  JWT_REFRESH_EXPIRES_IN: '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_schoolerp123',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_schoolerp456',
  UPLOAD_DIR: path.resolve(__dirname, '../../uploads'),
};


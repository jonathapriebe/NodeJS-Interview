import mongoose, { Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL || '';

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const close = (): Promise<void> => mongoose.connection.close();
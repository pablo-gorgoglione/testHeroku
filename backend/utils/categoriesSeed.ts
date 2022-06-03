import Category from '../models/categoryModel';
import connectDb from './db';
import dotenv from 'dotenv';

const seedCategory = async () => {};

try {
  dotenv.config();
  connectDb();

  seedCategory().then(() => {
    console.log('Data loaded');
  });
} catch (error) {
  console.log(error);
}

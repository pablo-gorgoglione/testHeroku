import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from '../models/categoryModel';

const seedCategory = async () => {
  let mongoDB =
    process.env.NODE_ENV == 'dev'
      ? (process.env.DB_DEV as string)
      : (process.env.DB_PRO as string);

  try {
    await mongoose.connect(mongoDB);
    await Category.deleteMany();
    await Promise.all([
      Category.create({ name: 'Job' }),
      Category.create({ name: 'Personal' }),
      Category.create({ name: 'Important' }),
    ]);
    process.env.NODE_ENV == 'dev'
      ? console.log('Seeded dev db')
      : console.log('Seeded production db');
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();
seedCategory().then(() => {
  mongoose.disconnect();
  process.exit(0);
});

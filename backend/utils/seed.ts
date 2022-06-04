import mongoose from 'mongoose';
import Category from '../models/categoryModel';
import Note from '../models/noteModel';
import User from '../models/userModel';

const seedCategory = async () => {
  let mongoDB = 'mongodb://localhost:27017/ensolvers_dev';
  try {
    await mongoose.connect(mongoDB);
    await Promise.all([
      Note.deleteMany(),
      User.deleteMany(),
      Category.deleteMany(),
    ]);
    await Promise.all([
      Category.create({ name: 'Job' }),
      Category.create({ name: 'Personal' }),
      Category.create({ name: 'Important' }),
    ]);
    console.log('Seeded production db');
  } catch (error) {
    console.log(error);
  }
};

seedCategory().then(() => {
  mongoose.disconnect();
  process.exit(0);
});

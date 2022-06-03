import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    console.log(process.env.DB_DEV as string);
    console.log(process.env.NODE_ENV as string);
    let mongoDB =
      process.env.NODE_ENV == 'dev'
        ? (process.env.DB_DEV as string)
        : (process.env.DB_PRO as string);

    process.env.NODE_ENV == 'dev'
      ? console.log('Using dev db')
      : console.log('Using production db');
    await mongoose.connect(mongoDB);
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;

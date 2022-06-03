import { model, Schema } from 'mongoose';
import { ICategory } from '../types';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', CategorySchema);

export default Category;

import { model, Schema } from 'mongoose';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', CategorySchema);

export default Category;

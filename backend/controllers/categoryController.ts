import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel';

// @route GET /category/
export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = Category.find({});
    res.json(categories);
  }
);

// @route POST /category/

export const postCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      throw new Error('A name is required for the category.');
    }
    const category = await Category.create({ name });

    res.status(201).json(category.toJSON());
  }
);

// @route DELETE /category/
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new Error('Missing post id');
    }

    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Not category found, invalid');
    }
    await category.delete();
    res.json({ message: 'Category deleted.' });
  }
);

// @route GET /category/seed
export const seedCategory = asyncHandler(
  async (req: Request, res: Response) => {
    await Category.deleteMany();
    await Promise.all([
      Category.create({ name: 'Personal' }),
      Category.create({ name: 'Job' }),
      Category.create({ name: 'Ideas' }),
      Category.create({ name: 'Extras' }),
    ]);
    console.log('Date loaded');
    res.json({ message: 'Category loaded.' });
  }
);

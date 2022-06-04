import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel';
import Note from '../models/noteModel';
import { searchUser } from './userController';

// @route GET /notes/
export const getNotesNotArchived = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await searchUser(req);

    const notes = await Note.find({ archived: false, userId: user._id })
      .populate({
        path: 'categories',
        select: 'name',
      })
      .sort({
        updatedAt: 'desc',
      });
    res.json(notes);
    return;
  }
);

// @route GET /notes/categories
export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.find({}).select('-__v');
    res.json(categories);
    return;
  }
);

// @route GET /notes/archived
export const getNotesArchived = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await searchUser(req);

    const notes = await Note.find({ archived: true, userId: user._id })
      .populate({
        path: 'categories',
        select: 'name',
      })
      .sort({
        updatedAt: 'desc',
      });
    res.json(notes);
    return;
  }
);

// @route POST /notes/
export const postNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categories } = req.body;

  const user = await searchUser(req);

  valiteNoteBody(req);

  const note = await Note.create({
    title,
    content,
    categories,
    userId: user._id,
  });
  await note.populate({
    path: 'categories',
    select: 'name',
  });
  res.status(201).json(note.toJSON());
  return;
});

// @route PUT /notes/:id
export const putNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categories, archived } = req.body;
  valiteNoteBody(req);
  const note = await validateExistence(req.params.id);
  note.title = title ? title : note.title;
  note.content = content ? content : note.content;
  note.archived = archived !== 'undefined' && archived;
  note.categories = categories ? categories : note.categories;
  await note.populate({
    path: 'categories',
    select: 'name',
  });
  await note.save();
  res.json(note);
  return;
});

// @route DELETE /notes/:id
export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const note = await validateExistence(req.params.id);
  await note.delete();
  res.json({ message: 'Note deleted.' });
  return;
});

// @desc Validates the data from the body
const valiteNoteBody = (req: Request) => {
  const { title, content, categories } = req.body;

  if (!title) {
    throw new Error('A title is requiered.');
  }
  if (!content) {
    throw new Error('A content is requiered.');
  }
};

// @desc Validates that one note exist with the id passed
const validateExistence = async (id: string) => {
  if (!id) {
    throw new Error('Missing post id');
  }
  const note = await Note.findById(id);
  if (!note) {
    throw new Error('Not note found, invalid');
  }
  return note;
};

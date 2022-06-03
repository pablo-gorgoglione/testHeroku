import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel';

// @route GET /notes/
export const getNotesNotArchived = asyncHandler(
  async (req: Request, res: Response) => {
    const notes = await Note.find({ archived: false }).populate({
      path: 'categories',
      select: 'name',
    });
    res.json(notes);
  }
);

// @route GET /notes/archived
export const getNotesArchived = asyncHandler(
  async (req: Request, res: Response) => {
    const notes = Note.find({ archived: true });
    res.json(notes);
  }
);

// @route POST /notes/
export const postNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categories } = req.body;
  valiteNoteBody(req);

  const note = await Note.create({ title, content, categories });

  res.status(201).json(note.toJSON());
});

// @route PUT /notes/:id
export const putNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categories } = req.body;
  valiteNoteBody(req);
  const note = await validateExistence(req.params.id);
  note.title = title ? title : note.title;
  note.content = content ? content : note.content;
  note.categories = categories ? categories : note.categories;
  await note.save();
  res.json(note);
});

// @route DELETE /notes/:id
export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const note = await validateExistence(req.params.id);
  await note.delete();
  res.json({ message: 'Note deleted.' });
});

// @desc Validates the data from the body
const valiteNoteBody = (req: Request) => {
  const { title, content, categories } = req.body;

  if (!title) {
    throw new Error('A title is requiered.');
  }
  if (!categories) {
    throw new Error('At least one category is requiered.');
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

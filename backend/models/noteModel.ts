import { model, Schema } from 'mongoose';
import { INote } from '../types';

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    categories: [{ type: String }],
    archived: { type: Boolean, require: true, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Note = model<INote>('Note', NoteSchema);

export default Note;

import { useState } from 'react';
import { ICategory, INote } from '../types';

const useNote = (prop_note: INote) => {
  const [note, setNote] = useState(prop_note);

  const reset = (note: INote) => {
    const tempnote = note;
    tempnote.categories = [];
    setNote(tempnote);
  };

  const handleTitleChange = (e: any) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: any) => {
    setNote({ ...note, content: e.target.value });
  };

  const addCategory = (category: ICategory) => {
    let tempNote = note;
    tempNote.categories.push(category);
    setNote({ ...note, categories: tempNote.categories });
  };

  const deleteCategory = (category: ICategory) => {
    let tempNote = note;
    tempNote.categories = tempNote.categories.filter(
      (c) => c._id !== category._id
    );

    setNote({ ...note, categories: tempNote.categories });
  };

  return {
    note,
    handleContentChange,
    handleTitleChange,
    reset,
    addCategory,
    deleteCategory,
  };
};

export default useNote;

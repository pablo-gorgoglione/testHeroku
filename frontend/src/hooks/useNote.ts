import { useState } from 'react';
import { INote } from '../types';

const useNote = (prop_note: INote) => {
  const [note, setNote] = useState(prop_note);

  const handleTitleChange = (e: any) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: any) => {
    setNote({ ...note, content: e.target.value });
  };

  return { note, handleContentChange, handleTitleChange };
};

export default useNote;

import { createContext, useReducer } from 'react';
import { notesApi } from '../api';
import { INote, NotesState } from '../types';
import notesReducer, { NotesReducerActions } from './noteReducer';

interface INoteContext {
  noteState: NotesState;
  handleLogoutNotes: () => void;
  dispatch: React.Dispatch<NotesReducerActions>;
  handleEdit: (id: string, note: INote, token: string) => void;
  handleCreate: (note: INote, token: string) => void;
  handleDelete: (id: string, token: string) => void;
}

const NoteContext = createContext<INoteContext>({} as INoteContext);

interface props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: NotesState = {
  error: '',
  loading: false,
  notes: [],
  archivedNotes: [],
};
export const NoteProvider = ({ children }: props) => {
  const [noteState, dispatch] = useReducer(notesReducer, INITIAL_STATE);

  const handleLogoutNotes = () => {
    try {
      dispatch({ type: 'RESET' });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Error resetting notes.',
      });
    }
  };

  const handleEdit = async (id: string, note: INote, token: string) => {
    const res = await notesApi.putNote(id, token, note);

    updateAfterToggleArchived(res);
    updateStateEdit(res); // push the updated note to the noteState
  };

  //push the updated note to the noteState
  const updateStateEdit = (note: INote) => {
    if (note.archived) {
      let tempNotes = noteState.archivedNotes;
      tempNotes = noteState.archivedNotes.filter((n) => n._id !== note._id);
      tempNotes.splice(0, 0, note);
      dispatch({ type: 'SET_ARCHIVED_NOTES', payload: tempNotes });
    } else {
      let tempNotes = noteState.notes;
      tempNotes = noteState.notes.filter((n) => n._id !== note._id);
      tempNotes.splice(0, 0, note);
      dispatch({ type: 'SET_NOTES', payload: tempNotes });
    }
  };

  const updateAfterToggleArchived = (note: INote) => {
    if (note.archived) {
      let tempNotes = noteState.notes.filter((n) => n._id !== note._id);
      dispatch({ type: 'SET_NOTES', payload: tempNotes });
    } else {
      let tempNotes = noteState.archivedNotes.filter((n) => n._id !== note._id);
      dispatch({ type: 'SET_ARCHIVED_NOTES', payload: tempNotes });
    }
  };

  const handleCreate = async (note: INote, token: string) => {
    const res = await notesApi.postNote(token, note);
    let tempNotes = noteState.notes;
    tempNotes.splice(0, 0, res);
    dispatch({ type: 'SET_NOTES', payload: tempNotes });
  };

  const handleDelete = async (id: string, token: string) => {
    await notesApi.deleteNote(id, token);
    let tempNotes = noteState.notes;
    tempNotes = noteState.notes.filter((n) => n._id !== id);
    dispatch({ type: 'SET_NOTES', payload: tempNotes });
  };

  // const;

  return (
    <NoteContext.Provider
      value={{
        noteState,
        handleLogoutNotes,
        dispatch,
        handleEdit,
        handleCreate,
        handleDelete,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;

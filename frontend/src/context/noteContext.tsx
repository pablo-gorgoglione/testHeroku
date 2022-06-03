import { createContext, useReducer } from 'react';
import { INote, NotesState } from '../types';
import notesReducer, { NotesReducerActions } from './noteReducer';

interface INoteContext {
  noteState: NotesState;
  handleLogoutNotes: () => void;
  dispatch: React.Dispatch<NotesReducerActions>;
  handleEdit: (note: INote) => void;
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

  //push the updated note to the noteState
  const handleEdit = (note: INote) => {
    let tempNotes = noteState.notes;
    //this was when i want it to leave it where is was at the start
    // const index = tempNotes.findIndex((n) => {
    //   return n._id === note._id;
    // });
    tempNotes = noteState.notes.filter((n) => n._id !== note._id);
    tempNotes.splice(0, 0, note);
    dispatch({ type: 'SET_NOTES', payload: tempNotes });
  };

  return (
    <NoteContext.Provider
      value={{ noteState, handleLogoutNotes, dispatch, handleEdit }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;

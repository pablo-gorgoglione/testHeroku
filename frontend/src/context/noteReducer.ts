import { INote, NotesState } from '../types';

export type NotesReducerActions =
  | { type: 'SET_NOTES'; payload: INote[] }
  | { type: 'SET_ARCHIVED_NOTES'; payload: INote[] }
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

const notesReducer = (
  state: NotesState,
  action: NotesReducerActions
): NotesState => {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        error: '',
        loading: false,
        notes: action.payload,
      };
    case 'SET_ARCHIVED_NOTES':
      return {
        ...state,
        error: '',
        loading: false,
        archivedNotes: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'RESET':
      return {
        loading: false,
        error: '',
        notes: [],
        archivedNotes: [],
      };
  }
};

export default notesReducer;

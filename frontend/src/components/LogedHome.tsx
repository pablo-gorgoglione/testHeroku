import { Box, Button, Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { notesApi } from '../api';
import NoteContext from '../context/noteContext';
import { INote } from '../types';
import NoteCard from './NoteCard';

interface props {
  token: string;
}

const LogedHome = ({ token }: props) => {
  const { noteState, dispatch, handleEdit } = useContext(NoteContext);
  const { notes } = noteState;

  //fetch notes when token is loaded
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const notes = await notesApi.getNotes(token);
        dispatch({ type: 'SET_NOTES', payload: notes });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error tryng to fetch notes' });
      }
    };
    if (token && token.startsWith('Bearer')) {
      fetchNotes();
    }
  }, [token, dispatch]);

  const handleEditNote = async (id: string, note: INote) => {
    const res = await notesApi.putNote(id, token, note);
    handleEdit(note); // push the updated note to the noteState
    return res;
  };

  const renderNoteList = () =>
    notes.map((note) => {
      return (
        <NoteCard
          handleEditNote={handleEditNote}
          token={token}
          key={note._id}
          note={note}
        />
      );
    });
  return (
    <Box>
      <Flex margin={'2rem 0 5rem'} justifyContent={'center'}>
        <Button>Create note</Button>
      </Flex>
      <Box
        display={'grid'}
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
        gridColumnGap={['2rem', '2rem', '2rem', '6rem']}
        gridRowGap={'5rem'}
      >
        {notes.length > 0 && renderNoteList()}
        {notes.length > 0 && renderNoteList()}
        {notes.length > 0 && renderNoteList()}
        {notes.length > 0 && renderNoteList()}
      </Box>
    </Box>
  );
};

export default LogedHome;

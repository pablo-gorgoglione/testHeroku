import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { notesApi } from '../api';
import NoteContext from '../context/noteContext';
import { INote } from '../types';
import CreateModal from './CreateModal';
import NoteCard from './NoteCard';

interface props {
  token: string;
}

const LogedHome = ({ token }: props) => {
  const [archived, setArchived] = useState<boolean>(true);

  const { noteState, dispatch, handleEdit, handleCreate, handleDelete } =
    useContext(NoteContext);
  const { notes, archivedNotes } = noteState;

  //fetch notes when token is loaded
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const notes = await notesApi.getNotes(token);
        const archivedNotes = await notesApi.getNotesArchived(token);
        dispatch({ type: 'SET_NOTES', payload: notes });
        dispatch({ type: 'SET_ARCHIVED_NOTES', payload: archivedNotes });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error tryng to fetch notes' });
      }
    };
    if (token && token.startsWith('Bearer')) {
      fetchNotes();
    }
  }, [token, dispatch]);

  /* ARREGLAR ESTOS ESTAN DE MAS */
  const handleEditLocal = (id: string, note: INote) => {
    handleEdit(id, note, token);
  };

  const handleCreateLocal = (note: INote) => {
    handleCreate(note, token);
  };

  const handleDeleteLocal = (id: string) => {
    handleDelete(id, token);
  };

  const handleToggleArchived = (note: INote) => {
    handleEdit(note._id, note, token);
  };
  /* ARREGLAR ESTOS ESTAN DE MAS */

  const renderNoteList = () =>
    notes.map((note) => {
      return (
        <NoteCard
          handleDeleteLocal={handleDeleteLocal}
          handleEditNote={handleEditLocal}
          handleToggleArchived={handleToggleArchived}
          token={token}
          key={note._id}
          note={note}
        />
      );
    });

  const renderArchivedNoteList = () =>
    archivedNotes.map((note) => {
      return (
        <NoteCard
          handleDeleteLocal={handleDeleteLocal}
          handleEditNote={handleEditLocal}
          handleToggleArchived={handleToggleArchived}
          token={token}
          key={note._id}
          note={note}
        />
      );
    });

  const toggleArchived = () => {
    setArchived(!archived);
  };

  //create modal handlers
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        margin={'2rem 0 5rem'}
        justifyContent={'center'}
        alignItems={'center'}
        columnGap={'3rem'}
      >
        <Button onClick={onOpen}>Create note</Button>
        <Button variant={'outline'} cursor={'pointer'} onClick={toggleArchived}>
          {archived ? 'Archived Notes >' : '< Notes'}
        </Button>
      </Flex>
      <CreateModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateLocal={handleCreateLocal}
      />
      <Box
        display={'grid'}
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
        gridColumnGap={['2rem', '2rem', '2rem', '6rem']}
        gridRowGap={'5rem'}
      >
        {archived
          ? notes.length > 0 && renderNoteList()
          : archivedNotes.length > 0 && renderArchivedNoteList()}
      </Box>
    </Box>
  );
};

export default LogedHome;

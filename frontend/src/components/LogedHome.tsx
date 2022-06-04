import { Box, Button, Flex, Select } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { notesApi } from '../api';
import NoteContext from '../context/noteContext';
import { ICategory, INote } from '../types';
import CreateModal from './CreateModal';
import NoteCard from './NoteCard';

interface props {
  token: string;
}

const LogedHome = ({ token }: props) => {
  const [archived, setArchived] = useState<boolean>(true);
  const [notesFiltered, setNotesFiltered] = useState<INote[]>([]);
  const [archivedNotesFiltered, setArchivedNotesFiltered] = useState<INote[]>(
    []
  );

  const { noteState, dispatch, handleEdit, handleCreate, handleDelete } =
    useContext(NoteContext);
  const { notes, archivedNotes, categories } = noteState;

  //fetch notes when token is loaded
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const notes = await notesApi.getNotes(token);
        const archivedNotes = await notesApi.getNotesArchived(token);
        const categories = await notesApi.getCategories(token);
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
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

  useEffect(() => {
    if (noteState.notes && noteState.archivedNotes) {
      setNotesFiltered(noteState.notes);
      setArchivedNotesFiltered(noteState.archivedNotes);
    }
  }, [noteState.notes, noteState.archivedNotes]);

  const handleEditLocal = (id: string, note: INote) => {
    handleEdit(id, note, token);
  };

  const handleCreateLocal = (note: INote) => {
    handleCreate(note, token);
  };

  const handleDeleteLocal = (id: string, archived: boolean) => {
    handleDelete(id, token, archived);
  };

  const handleToggleArchived = (note: INote) => {
    handleEdit(note._id, note, token);
  };

  const handleFilterChange = (e: any) => {
    let result = categories.find(
      ({ name }) => name === e.target.value
    ) as ICategory;
    if (typeof result !== 'undefined') {
      if (archived) {
        let tempNotes: INote[] = [];
        noteState.notes.forEach((n) => {
          n.categories.forEach((c) => {
            if (c._id === result._id) {
              tempNotes.push(n);
            }
          });
        });
        setNotesFiltered(tempNotes);
      } else {
        let tempNotes: INote[] = [];
        noteState.archivedNotes.forEach((n) => {
          n.categories.forEach((c) => {
            if (c._id === result._id) {
              tempNotes.push(n);
            }
          });
        });
        setArchivedNotesFiltered(tempNotes);
      }
    } else {
      setNotesFiltered(noteState.notes);
      setArchivedNotesFiltered(noteState.archivedNotes);
    }
  };

  const renderNoteList = () =>
    notesFiltered.map((note) => {
      return (
        <NoteCard
          categories={categories}
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
    archivedNotesFiltered.map((note) => {
      return (
        <NoteCard
          categories={categories}
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

  return (
    <Box>
      <Flex
        margin={'2rem 0 5rem'}
        justifyContent={'center'}
        alignItems={'center'}
        columnGap={'3rem'}
      >
        <Select
          onChange={(e) => handleFilterChange(e)}
          width={'300px'}
          placeholder='No filter'
        >
          {categories.length > 0 &&
            categories.map((c) => {
              return (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
        </Select>
        <CreateModal
          categoriesGeneral={categories}
          handleCreateLocal={handleCreateLocal}
        />
        <Button variant={'outline'} cursor={'pointer'} onClick={toggleArchived}>
          {archived ? 'Archived Notes >' : '< Notes'}
        </Button>
      </Flex>

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

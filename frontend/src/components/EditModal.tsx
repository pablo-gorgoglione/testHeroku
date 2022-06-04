import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  Text,
  Textarea,
  Box,
  Alert,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useNote from '../hooks/useNote';
import { ICategory, INote } from '../types';
import CategoryListCards from './CategoryListCards';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
  handleEditNote: (id: string, note: INote) => void;
  categories: ICategory[];
}

const EditModal = ({
  isOpen,
  categories,
  onClose,
  handleEditNote,
  note,
}: Props) => {
  const {
    handleContentChange,
    handleTitleChange,
    deleteCategory,
    addCategory,
    note: note_state,
  } = useNote(note);

  const [cates, setCates] = useState<ICategory[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categories && note_state.categories) {
      const results = categories.filter(
        ({ _id: id1 }) =>
          !note_state.categories.some(({ _id: id2 }) => id2 === id1)
      );
      setCates(results);
    }
  }, [categories, note_state.categories]);

  const handleDeleteCat = (cat: ICategory) => {
    deleteCategory(cat);
    let tempCates = cates;
    tempCates.push(cat);
    setCates(tempCates);
  };

  const handleAddCat = (cat: ICategory) => {
    addCategory(cat);
    let tempCates = cates;
    tempCates = cates.filter((c) => c._id !== cat._id);
    setCates(tempCates);
  };

  const handleSave = async () => {
    if (note_state.title === '') {
      setError('A title is required');
      return;
    }
    if (note_state.content === '') {
      setError('Content is required');
      return;
    }
    handleEditNote(note._id, note_state);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Title: </Text>
          <Input value={note_state.title} onChange={handleTitleChange}></Input>
          <Textarea
            marginTop={'1rem'}
            value={note_state.content}
            onChange={handleContentChange}
          />
          <Box
            as={CategoryListCards}
            colorHover={'red'}
            deleteCategory={handleDeleteCat}
            text='In note'
            categories={note_state.categories}
          />
          <Box
            colorHover={'green'}
            as={CategoryListCards}
            addCategory={handleAddCat}
            text='Available'
            categories={cates}
          />
          {error && (
            <Alert marginTop={'1rem'} borderRadius='0.4rem' status='error'>
              {error}
            </Alert>
          )}
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'}>
          <Button onClick={onClose}>Close</Button>
          <Button colorScheme='blue' onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

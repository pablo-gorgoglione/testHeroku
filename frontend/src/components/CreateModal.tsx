import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Textarea,
  ModalFooter,
  Button,
  Text,
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
  handleCreateLocal: (note: INote) => void;
  categories: ICategory[];
}
const initial_note: INote = {
  _id: '',
  title: '',
  content: '',
  archived: false,
  categories: [],
  createdAt: '',
  updatedAt: '',
};

const CreateModal = ({
  isOpen,
  categories,
  onClose,
  handleCreateLocal,
}: Props) => {
  const {
    note,
    handleContentChange,
    handleTitleChange,
    reset,
    addCategory,
    deleteCategory,
  } = useNote(initial_note);
  const [cates, setCates] = useState<ICategory[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    if (categories) {
      setCates(categories);
    }
  }, [categories]);

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

  const handleCreate = () => {
    if (note.title === '') {
      setError('A title is required');
      return;
    }
    if (note.content === '') {
      setError('Content is required');
      return;
    }

    handleCreateLocal(note);
    reset(initial_note);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Title: </Text>
          <Input value={note.title} onChange={handleTitleChange}></Input>
          <Text marginTop={'1rem'}>Content: </Text>
          <Textarea value={note.content} onChange={handleContentChange} />
          <Box
            colorHover={'red'}
            as={CategoryListCards}
            deleteCategory={handleDeleteCat}
            text='In note'
            categories={note.categories}
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
          <Button colorScheme='blue' onClick={handleCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;

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
} from '@chakra-ui/react';
import useNote from '../hooks/useNote';
import { INote } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleCreateLocal: (note: INote) => void;
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

const CreateModal = ({ isOpen, onClose, handleCreateLocal }: Props) => {
  const { note, handleContentChange, handleTitleChange, reset } =
    useNote(initial_note);

  const handleCreate = () => {
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

          <Text margin={'1rem 0 1rem'}>
            Categories:{' '}
            {note.categories.length > 0 &&
              note.categories.map((c) => {
                return <Text id={c._id}>{c.name}</Text>;
              })}
          </Text>
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

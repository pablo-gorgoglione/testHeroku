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
} from '@chakra-ui/react';
import useNote from '../hooks/useNote';
import { INote } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
  handleEditNote: (id: string, note: INote) => void;
}

const EditModal = ({ isOpen, onClose, handleEditNote, note }: Props) => {
  const {
    handleContentChange,
    handleTitleChange,
    note: note_state,
  } = useNote(note);

  const handleSave = async () => {
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
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent={'space-between'}>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

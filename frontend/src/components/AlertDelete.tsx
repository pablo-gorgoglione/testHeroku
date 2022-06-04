import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Props {
  handleDelete: () => void;
}

const AlertDelete = ({ handleDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const handleDeleteLocal = () => {
    handleDelete();
    onClose();
  };
  return (
    <>
      <Icon
        as={FaTrash}
        cursor={'pointer'}
        color='grey'
        transitionDuration='100ms'
        _hover={{ color: 'white' }}
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteLocal} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDelete;

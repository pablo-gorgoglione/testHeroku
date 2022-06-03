import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { INote } from '../types';
import EditModal from './EditModal';

interface Props {
  note: INote;
  token: string;
  handleEditNote: (id: string, note: INote) => void;
}

const NoteCard = ({ token, note, handleEditNote }: Props) => {
  const { categories, updatedAt, content, createdAt, title } = note;
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    if (note && createdAt) {
      const date = new Date(createdAt);
      setTime(date);
    }
  }, [note, createdAt]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderCategories = () =>
    categories.map((c) => {
      return <h3 key={Math.random()}>{c.name}</h3>;
    });

  return (
    <Box
      borderRadius={'0.6rem'}
      padding={'0.5rem'}
      border={'2px white solid'}
      cursor={'pointer'}
      onClick={onOpen}
    >
      <EditModal
        handleEditNote={handleEditNote}
        isOpen={isOpen}
        onClose={onClose}
        note={note}
      />
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'1.5rem'}>{title}</Text>
      </Flex>
      <Text padding={'0 1rem 0 1rem'}>{content.substring(0, 20) + ' ...'}</Text>
      <p>EDITADO: {updatedAt}</p>
      <p>{time.toLocaleString()}</p>
      <Flex columnGap={'0.5rem'}>
        {categories.length > 0 && renderCategories()}
      </Flex>
    </Box>
  );
};

export default NoteCard;

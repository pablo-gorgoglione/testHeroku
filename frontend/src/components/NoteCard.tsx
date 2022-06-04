import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaBoxOpen, FaDownload } from 'react-icons/fa';
import { ICategory, INote } from '../types';
import AlertDelete from './AlertDelete';
import CategoryMiniCard from './CategoryMiniCard';
import EditModal from './EditModal';

interface Props {
  note: INote;
  token: string;
  handleEditNote: (id: string, note: INote) => void;
  handleDeleteLocal: (id: string, archived: boolean) => void;
  handleToggleArchived: (note: INote) => void;
  categories: ICategory[];
}

const NoteCard = ({
  token,
  note,
  handleEditNote,
  handleDeleteLocal,
  handleToggleArchived,
  categories: categoriesGeneral,
}: Props) => {
  const { _id, categories, updatedAt, title, archived } = note;
  const [updateTime, setUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    if (note && updatedAt) {
      const dateUpt = new Date(updatedAt);
      setUpdateTime(dateUpt);
    }
  }, [note, updatedAt]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    handleDeleteLocal(_id, archived);
  };
  const handleArchive = () => {
    const tempNote = note;
    tempNote.archived = !tempNote.archived;
    handleToggleArchived(tempNote);
  };
  const renderCategories = () =>
    categories.map((c) => {
      return <CategoryMiniCard colorHover='white' key={c._id} category={c} />;
    });

  return (
    <Box
      borderRadius={'0.6rem'}
      padding={'1rem'}
      border={'2px grey solid'}
      _hover={{ border: '2px white solid' }}
      transitionDuration='200ms'
    >
      <EditModal
        categories={categoriesGeneral}
        handleEditNote={handleEditNote}
        isOpen={isOpen}
        onClose={onClose}
        note={note}
      />
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'1.5rem'} cursor={'pointer'} onClick={onOpen}>
          {title}
        </Text>
        <Flex columnGap={'1rem'}>
          {archived ? (
            <Icon
              as={FaDownload}
              cursor={'pointer'}
              color='grey'
              transitionDuration='100ms'
              _hover={{ color: 'white' }}
              onClick={handleArchive}
            />
          ) : (
            <Icon
              as={FaBoxOpen}
              cursor={'pointer'}
              color='grey'
              _hover={{ color: 'white' }}
              transitionDuration='100ms'
              onClick={handleArchive}
            />
          )}
          <AlertDelete handleDelete={handleDelete} />
        </Flex>
      </Flex>
      <Text as={'p'} marginTop={'0.4rem'}>
        Last edited: {updateTime.toLocaleString()}
      </Text>
      {categories.length > 0 && (
        <>
          <Divider margin={'0.9rem 0 0.1rem'}></Divider>
          <Flex marginTop={'1rem'} alignItems={'center'} columnGap={'0.5rem'}>
            <p>Categories: </p>
            {renderCategories()}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default NoteCard;

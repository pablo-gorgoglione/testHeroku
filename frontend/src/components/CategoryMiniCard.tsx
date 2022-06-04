import { Text } from '@chakra-ui/react';
import { ICategory } from '../types';

interface Props {
  category: ICategory;
  addCategory?: (category: ICategory) => void;
  deleteCategory?: (category: ICategory) => void;
  colorHover: string;
}

const CategoryMiniCard = ({
  colorHover = 'white',
  addCategory,
  deleteCategory,
  category,
}: Props) => {
  const { _id, name } = category;
  const handleClick = () => {
    if (addCategory) {
      addCategory(category);
    } else if (deleteCategory) {
      deleteCategory(category);
    }
  };
  return (
    <Text
      border='1px grey solid'
      cursor='pointer'
      borderRadius={'0.3rem'}
      _hover={{ border: `1px ${colorHover} solid` }}
      padding='0.3rem'
      onClick={handleClick}
      key={_id}
    >
      {name}
    </Text>
  );
};

export default CategoryMiniCard;

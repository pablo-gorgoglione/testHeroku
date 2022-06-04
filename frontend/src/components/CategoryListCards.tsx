import { Flex, Text } from '@chakra-ui/react';
import { ICategory } from '../types';
import CategoryMiniCard from './CategoryMiniCard';

interface Props {
  categories: ICategory[];
  text: string;
  addCategory?: (category: ICategory) => void;
  deleteCategory?: (category: ICategory) => void;
  colorHover: string;
}

const CategoryListCards = ({
  addCategory,
  deleteCategory,
  text,
  colorHover,
  categories,
}: Props) => {
  return (
    <Flex marginTop={'1rem'} columnGap={'1rem'} alignItems={'center'}>
      <Text>{text}:</Text>
      {categories.length > 0 ? (
        categories.map((c) => {
          return (
            <CategoryMiniCard
              colorHover={colorHover}
              addCategory={addCategory}
              deleteCategory={deleteCategory}
              key={c._id}
              category={c}
            />
          );
        })
      ) : (
        <Text color={'red'}>empty</Text>
      )}
    </Flex>
  );
};

export default CategoryListCards;

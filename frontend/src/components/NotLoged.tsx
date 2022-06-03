import { Flex, Text } from '@chakra-ui/react';

const NotLoged = () => {
  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Text marginTop={'15rem'} fontSize={'1.5rem'} as={'p'}>
          Please login or register to use the web app
        </Text>
      </Flex>
    </>
  );
};

export default NotLoged;

import { Flex, Spinner } from '@chakra-ui/react';
import { useContext } from 'react';
import LogedHome from '../components/LogedHome';
import NotLoged from '../components/NotLoged';
import UserContext from '../context/userContext';

const Home = () => {
  const { userState } = useContext(UserContext);
  const { isLog, loading, user } = userState;
  if (loading) {
    return (
      <Flex height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Spinner width={'5rem'} height={'5rem'} />
      </Flex>
    );
  }
  if (!isLog) {
    return <NotLoged />;
  }
  return <LogedHome token={user.token} />;
};

export default Home;

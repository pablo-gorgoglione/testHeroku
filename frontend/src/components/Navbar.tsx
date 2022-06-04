import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/noteContext';
import UserContext from '../context/userContext';

const Navbar = () => {
  const { userState, logout } = useContext(UserContext);
  const { handleLogoutNotes } = useContext(NoteContext);
  const { isLog, user, loading } = userState;
  const navigate = useNavigate();
  const handleLogout = async () => {
    handleLogoutNotes();
    logout();
  };

  return (
    <Box display={'flex'} as={'nav'} alignItems={'center'}>
      <Text width={'35%'} as={'h1'} fontSize={'3rem'} textAlign={'center'}>
        <Link to='../'>My Notes app</Link>
      </Text>
      <Flex justifyContent={'center'} width={'65%'}>
        <Flex
          justifyContent={loading ? 'center' : ''}
          width={loading ? '300px' : ''}
          alignItems={'center'}
        >
          {loading ? (
            <Spinner />
          ) : isLog ? (
            <>
              <Text marginRight={'5rem'}>Log as {user.username}</Text>
              <Button marginRight={'2rem'} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button marginRight={'2rem'} onClick={() => navigate('../login')}>
                Login
              </Button>
              <Button
                marginRight={'2rem'}
                onClick={() => navigate('../register')}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

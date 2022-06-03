import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import NoteContext from '../context/noteContext';
import UserContext from '../context/userContext';

const Navbar = () => {
  const { userState, login, logout } = useContext(UserContext);
  const { handleLogoutNotes } = useContext(NoteContext);
  const { isLog, user, loading } = userState;

  const userr = { username: 'Pablo', password: '12345' };

  const handleLogin = async () => {
    await login(userr.username, userr.password);
  };
  const handleLogout = async () => {
    handleLogoutNotes();
    logout();
  };

  return (
    <Box display={'flex'} as={'nav'} alignItems={'center'}>
      <Text width={'35%'} as={'h1'} fontSize={'3rem'} textAlign={'center'}>
        My Notes app
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
              <ColorModeSwitcher marginRight={'2rem'} justifySelf='flex-end' />
            </>
          ) : (
            <>
              <Button onClick={handleLogin} marginRight={'2rem'}>
                Login
              </Button>
              <Button marginRight={'2rem'}>Register</Button>
              <ColorModeSwitcher justifySelf='flex-end' />
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

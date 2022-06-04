import { Alert, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

const Login = () => {
  const { userState, login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await login(username, password);
    if (res) {
      navigate('../');
    }
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems='center'
      flexDirection={'column'}
    >
      <Box width={'40%'}>
        <Text marginTop={'3rem'}>Username </Text>
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Text marginTop={'1rem'}>Password </Text>
        <Input
          type={'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {userState.error && (
          <Alert marginTop={'1rem'} borderRadius='0.4rem' status='error'>
            {userState.error}
          </Alert>
        )}
      </Box>
      <Button
        marginTop={'4rem'}
        width={'6rem'}
        colorScheme='blue'
        onClick={handleLogin}
      >
        Login
      </Button>
    </Flex>
  );
};

export default Login;

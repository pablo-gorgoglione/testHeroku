import { Flex, Box, Input, Alert, Button, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

const Register = () => {
  const { userState, register } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await register({ username, password });
    if (res) {
      navigate('../login');
    }
  };

  const validate = () => {
    if (username.length < 4) {
      setError('Username must be at least 4 characters');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 5 characters');
      return;
    }
    if (password !== passwordC) {
      setError('Passwords do not match');
      return;
    }
    handleRegister();
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
        <Text marginTop={'1rem'}>Confirm password </Text>
        <Input
          type={'password'}
          value={passwordC}
          onChange={(e) => {
            setPasswordC(e.target.value);
          }}
        />
        {error && (
          <Alert marginTop={'1rem'} borderRadius='0.4rem' status='error'>
            {error}
          </Alert>
        )}
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
        onClick={validate}
      >
        Register
      </Button>
    </Flex>
  );
};

export default Register;

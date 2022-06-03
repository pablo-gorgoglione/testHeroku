import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

interface namesFromServer {
  name: string;
}
const TestButton = () => {
  const handleClick = async () => {
    const res = await axios.post('http://localhost:4000/api/users/login', {
      username: 'Pablo',
      password: '12345',
    });
    console.log(res);
  };
  const handleClick2 = async () => {
    const res = await axios.post(
      'https://ensolvers-pablo-gorgoglione.herokuapp.com/api/users/login',
      {
        username: 'Pablo',
        password: '12345',
      }
    );
    console.log(res);
  };
  return (
    <>
      <Button onClick={handleClick}>Fetch Data Local</Button>
      <Button onClick={handleClick2}>Fetch Data heroku</Button>
    </>
  );
};

export default TestButton;

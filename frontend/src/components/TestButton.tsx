import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

interface namesFromServer {
  name: string;
}
const TestButton = () => {
  const [names, setNames] = useState<namesFromServer[]>([]);
  const handleClick = async () => {
    const res = await axios.get('http://localhost:4000/api/v1/names');
    setNames(res.data.data);
  };
  const handleClick2 = async () => {
    const res = await axios.get(
      'https://ensolvers-pablo-gorgoglione.herokuapp.com/api/v1/names'
    );
    setNames(res.data.data);
  };
  return (
    <>
      <Button onClick={handleClick}>Fetch Data</Button>
      <Button onClick={handleClick2}>Fetch Data 2</Button>
      <Button
        onClick={() => {
          console.log(names);
        }}
      >
        Console log
      </Button>
    </>
  );
};

export default TestButton;

import { UserProdiver } from './context/userContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { NoteProvider } from './context/noteContext';
import Login from './pages/Login';
import Register from './pages/Register';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <>
        <UserProdiver>
          <NoteProvider>
            <Router>
              <Flex
                margin={'0% 7%'}
                height={'100vh'}
                // border={'1px solid red'}
                flexDirection={'column'}
              >
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Routes>
              </Flex>
            </Router>
          </NoteProvider>
        </UserProdiver>
      </>
    </ChakraProvider>
  );
};

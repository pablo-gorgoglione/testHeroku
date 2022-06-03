import { UserProdiver } from './context/userContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';
import Home from './pages/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <>
      <UserProdiver>
        <Router>
          <Flex margin={'0% 7%'} flexDirection={'column'}>
            {/* <Navbar /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/posts/:id' element={<PostPage />} /> */}
            </Routes>
            {/* <Footer /> */}
          </Flex>
        </Router>
      </UserProdiver>
    </>
  </ChakraProvider>
);

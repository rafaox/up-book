import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query'

import { queryClient } from '../services/queryClient';

import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp

import { ChakraProvider } from '@chakra-ui/react';

import { SearchProvider } from '../services/hooks/useSearch';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SearchProvider>
  );
}

export default MyApp

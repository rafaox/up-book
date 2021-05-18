import { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Spinner,
  Text
} from '@chakra-ui/react';

import { Header } from '../components/Header';
import { useBooks } from '../services/hooks/useBooks';
import { Pagination } from '../components/Pagination';
import { queryClient } from '../services/queryClient';
import { api } from '../services/api';

export default function Home() {
  const [ page, setPage ] = useState(1);
  const { data, isLoading, isFetching, error } = useBooks(page, '');

  async function handlePrefetchUser(bookId: string) {
    await queryClient.prefetchQuery(['books/v1/volumes', bookId], async () => {
      const response = await api.get(`books/v1/volumes/${bookId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutos
    });
  }

  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' my='6' maxWidth={960} mx='auto' px={['4', '4', '6']}>
        <Box
          flex='1'
          borderRadius={8}
          p='8'
        >
          <Flex mb='8' justify='space-between' align='center'>
            <Heading
              size='lg'
              fontWeight='normal'
            >
              { !isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>
          </Flex>

          { isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : data.totalItems === 0 || data.books.length <= 0 ? (
            <Flex justify='center'>
              <Image
                src='/ufo-no-results-found.png'
                w='100%'
                maxWidth='25rem'
                maxHeight='25rem'
                borderRadius='5'
              />
            </Flex>
          ) : (
            <>
              {data.books.map(book => (
                <Link
                  as='a'
                  key={book.id}
                  href={book.id}
                  textDecoration='none'
                  onMouseEnter={() => handlePrefetchUser(book.id)}
                >
                  <HStack
                    spacing='24px'
                    p={5}
                    bg='gray.800'
                    borderRadius={10}
                    mb={4}
                  >
                    <Image
                      src={book.volumeInfo.title}
                      fallbackSrc={book.volumeInfo.imageLinks.thumbnail ?? './book-cover-not-found.jpg'}
                      w='100%'
                      maxWidth='128px'
                      maxHeight='166px'
                      borderRadius='5'
                    />

                    <Box>
                      <Text
                        color='teal.400'
                        fontWeight='bold'
                      >
                        {book.volumeInfo.title}
                      </Text>

                      <Text py='2'>
                        {book.volumeInfo.publishedDate}
                      </Text>
                    
                      <Text
                        fontSize='sm'
                        color='gray.300'
                      >
                        {book.searchInfo?.textSnippet}
                      </Text>
                    </Box>
                  </HStack>
                </Link>
              ))}
              <Pagination
                totalCountOfRegisters={data.totalItems + 1}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}

        </Box>
      </Flex>
    </Flex>
  );
}

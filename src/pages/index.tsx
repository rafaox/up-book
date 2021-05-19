import { useState } from 'react';

import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Text
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { queryClient } from '../services/queryClient';
import { api } from '../services/api';
import { useSearch } from '../services/hooks/useSearch';

export default function Home() {
  const [ page, setPage ] = useState(1);
  const { items, totalItems, changePage, setFavorite } = useSearch();

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
          { totalItems === 0 || items.length <= 0 ? (
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
              {items.map(book => (
                
                  <HStack
                    key={book.id}
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
                      <Link
                        as='a'
                        href={book.id}
                        textDecoration='none'
                        onMouseEnter={() => handlePrefetchUser(book.id)}
                      >
                        <Text
                          color='teal.400'
                          fontWeight='bold'
                        >
                          {book.volumeInfo.title}
                        </Text>
                      </Link>

                      {book.favorite ? (
                        <IconButton
                          aria-label='up star'
                          bg='gray.800'
                          py='2'
                          px='0'
                          _hover={{
                            bg: 'gray.800',
                            color: 'teal.800'
                          }}
                          icon={<Icon as={AiFillStar} />}
                          onClick={() => setFavorite(book)}
                        />
                      ) : (
                        <IconButton
                          aria-label='down star'
                          bg='gray.800'
                          py='2'
                          px='0'
                          _hover={{
                            bg: 'gray.800',
                            color: 'teal.800'
                          }}
                          icon={<Icon as={AiOutlineStar} />}
                          onClick={() => setFavorite(book)}
                        />
                      )}

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
                
              ))}
              <Pagination
                totalCountOfRegisters={totalItems + 1}
                currentPage={page}
                onPageChange={setPage}
                changePage={changePage}
              />
            </>
          )}

        </Box>
      </Flex>
    </Flex>
  );
}

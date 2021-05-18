import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';

import { Header } from '../components/Header';
import { api } from '../services/api';

type Book = {
  title: string;
  description: string;
  publishedDate: Date;
}

type ResponseItem = {
  id: string;
  volumeInfo: Book;
}

interface BookProps {
  item: ResponseItem;
}

export default function Book({ item }: BookProps) {
  
  const [book, setBook ] = useState<ResponseItem>();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`books/v1/volumes/${router.query.slug}`);
      const data = await response.data;

      const item: ResponseItem = {
        id: data.id,
        volumeInfo: {
          title: data.volumeInfo.title,
          description: data.volumeInfo.description,
          publishedDate: data.volumeInfo.publishedDate
        }
      };
      setBook(item);
    }
    
    if (slug)
      fetchData();
  }, [slug]);

  return (
    <Flex
      direction='column'
      h='100vh'
    >
      <Header />

      <Flex w="100%" my="6" maxWidth={960} mx="auto" px={["4", "4", "6"]} direction='column'>

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
          position='relative'
        >
          <NextLink href="/">
            <Button
              position='absolute'
              top='4'
              right='4'
              bg='teal.400'
            >
              <Icon
                as={IoArrowBack}
                fontSize="20"
              />
              Voltar
            </Button>
          </NextLink>

          <Text
            as='h2'
            color='teal.400'
            fontWeight='bold'
            fontSize='lg'
            pt='4'
            pb='2'
            letterSpacing={1}
          >
            { book?.volumeInfo?.title }
          </Text>

          <Text
            as='h4'
            letterSpacing={1}
          >
            Publicado em { book?.volumeInfo?.publishedDate }
          </Text>

          <Text
            as='p'
            fontSize='sm'
            letterSpacing={1}
            pt='4'
          >
            { book?.volumeInfo?.description }
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

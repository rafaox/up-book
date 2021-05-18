import NextLink from 'next/link';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';

import { Header } from '../components/Header';

type Book = {
  title: string;
  description: string;
  publishedDate: Date;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  }
}

type ResponseItem = {
  id: string;
  volumeInfo: Book;
}

interface BookProps {
  item: ResponseItem;
}

export default function Book({ item }: BookProps) {
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
              Voltar
              <Icon
                as={IoArrowBack}
                fontSize="20"
              />
            </Button>
          </NextLink>

          <Text
            as='h2'
          >
            { item?.volumeInfo.title }
          </Text>

          <Text
            as='h4'
          >
            { item?.volumeInfo.publishedDate }
          </Text>

          <Text
            as='p'
          >
            { item?.volumeInfo.publishedDate }
          </Text>
          
        </Box>
      </Flex>
    </Flex>
  );
}
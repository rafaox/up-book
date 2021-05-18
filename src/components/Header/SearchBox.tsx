import { useRef, useState } from "react";

import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  const [searchValue, setSearchValue] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as='label'
      flex='1'
      py='4'
      px='8'
      ml='6'
      maxWidth='400'
      alignSelf='center'
      color='gray.200'
      position='relative'
      bg='gray.800'
      borderRadius='full'
    >
      <Input
        color='gray.50'
        variant='unstyled'
        px='4'
        mr='4'
        placeholder='Buscar livro'
        _placeholder={{ color: 'grya.400' }}
        ref={searchInputRef}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Icon
        as={RiSearchLine}
        fontSize="20"
        cursor='pointer'
        // onClick={() => getBooks(1, searchValue)}
      />
    </Flex>
  );
}
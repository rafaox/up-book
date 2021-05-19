import { useRef, useState } from "react";

import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from 'react-icons/ri';

import { useSearch } from "../../services/hooks/useSearch";

export function SearchBox() {
  const [searchValue, setSearchValue] = useState('');
  const { searchBooks } = useSearch();

  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e) {
    e.preventDefault();
    if (e.key === 'Enter') searchBooks(1, searchValue);
  }

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
        onKeyUp={(e) => handleSearch(e)}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Icon
        as={RiSearchLine}
        fontSize="20"
        cursor='pointer'
        onClick={() => searchBooks(1, searchValue)}
      />
    </Flex>
  );
}
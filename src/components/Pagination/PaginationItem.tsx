import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
  changePage: (page: number) => void;
}

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,
  changePage
}: PaginationItemProps) {

  function handleClick() {
    changePage(number);
    onPageChange(number);
  }

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="teal"
        disabled
        _disabled={{
          bg: 'teal.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size='sm'
      fontSize='xs'
      w='4'
      bg='gray.700'
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => handleClick()}
    >
      { number }
    </Button>
  );
}
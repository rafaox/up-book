import { Box, Flex, Icon, IconButton, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { GiBookAura } from 'react-icons/gi';

import { Logo } from './Logo';
import { SearchBox } from './SearchBox';

export function Header() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });
  
  return (
    <Flex
      as='header'
      h='20'
      mt='4'
      py='2'
      px='4'
    >
      <Box
        display='inherit'
      >
        { isWideVersion && <IconButton
          aria-label='Up! Book'
          icon={<Icon as={GiBookAura} />}
          fontSize='24'
          variant='unstyled'
          mr='2'
        /> }

        <Logo />
      </Box>

      <Spacer />

      <Box>
        { isWideVersion && <SearchBox /> }
      </Box>
    </Flex>
  );
}
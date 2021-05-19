import { Box, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react"
import { GiBookAura } from 'react-icons/gi';

import { Logo } from './Logo';
import { SearchBox } from './SearchBox';

export function Header() {

  const [isLargerThan600] = useMediaQuery("(max-width: 600px)")

  return (
    <>
      { isLargerThan600 ? (
        <Flex
          as='header'
          h='20'
          mt='4'
          py='2'
          px='4'
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            display='inherit'
          >
            <IconButton
              aria-label='Up! Book'
              icon={<Icon as={GiBookAura} />}
              fontSize='26'
              variant='unstyled'
            />

            <Logo />
          </Box>

          <Spacer />

          <Box>
            <SearchBox />
          </Box>
        </Flex>
      ) : (
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
            <IconButton
              aria-label='Up! Book'
              icon={<Icon as={GiBookAura} />}
              fontSize='26'
              variant='unstyled'
              mr='2'
            />

            <Logo />
          </Box>

          <Spacer />

          <Box>
            <SearchBox />
          </Box>
        </Flex>
      )}
    </>
  );
}
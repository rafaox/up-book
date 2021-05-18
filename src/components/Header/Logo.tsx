import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      as='h1'
      fontSize={['2xl', '3xl']}
      fontWeight='bold'
      letterSpacing='tight'
      w={64}
      color='teal.200'
    >
      Up! Book
    </Text>
  )
}
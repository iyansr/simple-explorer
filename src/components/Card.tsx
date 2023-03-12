import { Box, HStack, Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = {
  title?: string
  prefix?: React.ReactNode
}

const Card = ({ children, title, prefix }: PropsWithChildren<Props>) => {
  return (
    <Box bg="gray.700" rounded="md" shadow="lg" overflow="hidden" maxW="full" pb="2">
      {title && (
        <HStack px="6" py="4">
          <Box flex={1}>
            <Text fontWeight="bold" fontSize="md">
              {title}
            </Text>
          </Box>
          <Box>{prefix || null}</Box>
        </HStack>
      )}
      {children}
    </Box>
  )
}

export default Card

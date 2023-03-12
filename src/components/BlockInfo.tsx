import useQueryBlock from '@app/hooks/useQueryBlock'
import sliceHash from '@app/utils/sliceHash'
import { Box, Grid, GridItem, HStack, Tag, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

const BlockInfo = () => {
  const { data } = useQueryBlock()

  return (
    <Card title={`Block Information (${data?.number || '-'})`}>
      <Box px="6">
        <Grid templateColumns="repeat(2, 1fr)" gap="4">
          <GridItem>
            <HStack alignItems="center">
              <Text fontSize="sm">Miner</Text>
              <Tooltip label={data?.miner} hasArrow placement="top">
                <Tag colorScheme="purple">{sliceHash(data?.miner || '')}</Tag>
              </Tooltip>
            </HStack>
          </GridItem>
          <GridItem>
            <HStack alignItems="center">
              <Text fontSize="sm">Transactions</Text>
              <Tag colorScheme="purple">{data?.transactions.length}</Tag>
            </HStack>
          </GridItem>
          <GridItem>
            <HStack alignItems="center">
              <Text fontSize="sm">Gas Fee</Text>
              <Tag colorScheme="purple">{data?.gasUsed.toNumber() || 0}</Tag>
            </HStack>
          </GridItem>
          <GridItem>
            <HStack alignItems="center">
              <Text fontSize="sm">Gas Limit</Text>
              <Tag colorScheme="purple">{data?.gasLimit.toNumber() || 0}</Tag>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Card>
  )
}

export default BlockInfo

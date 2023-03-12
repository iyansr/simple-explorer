import useQueryLatestBlocks from '@app/hooks/useQueryLatestBlocks'
import sliceHash from '@app/utils/sliceHash'
import { Box, Skeleton, Table, Tag, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import { formatDistanceStrict } from 'date-fns'
import React from 'react'

const BlockTable = () => {
  const { data: blocks, isLoading } = useQueryLatestBlocks()

  return (
    <Box maxW="full" px="2">
      <Table size="sm" variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Block Number</Th>
            <Th>Data</Th>
            <Th>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading || !blocks?.length
            ? [
                ...Array(10)
                  .fill(null)
                  .map((_, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height="20px" bg="green.500" color="white" fadeDuration={1} />
                      </Td>
                      <Td>
                        <Skeleton height="20px" bg="green.500" color="white" fadeDuration={1} />
                      </Td>
                      <Td>
                        <Skeleton height="20px" bg="green.500" color="white" fadeDuration={1} />
                      </Td>
                    </Tr>
                  )),
              ]
            : blocks?.map((block, index) => {
                const date = new Date(block.timestamp * 1000)
                return (
                  <Tr key={String(index)}>
                    <Td>{block.number}</Td>
                    <Td>
                      <Box>
                        Miner:
                        <Tooltip label={block.miner} hasArrow placement="top">
                          <Tag colorScheme="purple">{sliceHash(block.miner)}</Tag>
                        </Tooltip>
                      </Box>
                      <Box mt="1">
                        Txns: <Tag colorScheme="purple">{block.transactions.length}</Tag>
                      </Box>
                    </Td>
                    <Td fontSize="xs">
                      {formatDistanceStrict(date, new Date(), {
                        addSuffix: true,
                      })}
                    </Td>
                  </Tr>
                )
              })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default BlockTable

import useQueryLatestTransactions from '@app/hooks/useQueryLatestTransactions'
import sliceHash from '@app/utils/sliceHash'
import { Box, Skeleton, Table, Tag, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'

const TransactionsTable = () => {
  const { data, isLoading } = useQueryLatestTransactions()
  return (
    <Box maxW="full" overflowX="hidden" px="2">
      <Table size="sm" variant="simple" colorScheme="gray" fontSize="sm">
        <Thead>
          <Tr>
            <Th>Txn Hash</Th>
            <Th>From / To</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading || !data
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
            : data?.transfers.map((txn) => {
                return (
                  <Tr key={txn.uniqueId}>
                    <Td fontSize="sm">
                      {' '}
                      <Tooltip label={txn.hash} hasArrow placement="top">
                        {sliceHash(txn.hash)}
                      </Tooltip>
                    </Td>
                    <Td>
                      <Tooltip label={txn.from} hasArrow placement="top">
                        <Box>
                          From: <Tag colorScheme="purple">{sliceHash(txn.from)}</Tag>
                        </Box>
                      </Tooltip>

                      <Tooltip label={txn.to} hasArrow placement="top">
                        <Box mt="1">
                          To: <Tag colorScheme="purple">{sliceHash(txn.to)}</Tag>
                        </Box>
                      </Tooltip>
                    </Td>
                    <Td fontSize="xs">
                      <Tag size="sm">
                        {txn.value?.toFixed(6)} {txn.asset}
                      </Tag>
                    </Td>
                  </Tr>
                )
              })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TransactionsTable

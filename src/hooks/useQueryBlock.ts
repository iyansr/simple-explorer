import alchemy from '@app/libs/alchemy'
import { useQuery } from '@tanstack/react-query'
import { Block } from 'alchemy-sdk'
import useQueryBlockNumber from './useQueryBlockNumber'

const useQueryBlock = () => {
  const { data: blockNumber = 0 } = useQueryBlockNumber()
  return useQuery(['current-blocks', blockNumber], {
    queryFn: async () => {
      if (!blockNumber) {
        return undefined
      }
      const block = await alchemy.core.getBlock(blockNumber)
      return block
    },
    keepPreviousData: true,
  })
}

export default useQueryBlock

import alchemy from '@app/libs/alchemy'
import { useQuery } from '@tanstack/react-query'
import { Block } from 'alchemy-sdk'
import useQueryBlockNumber from './useQueryBlockNumber'

const useQueryLatestBlocks = () => {
  const { data: blockNumber = 0 } = useQueryBlockNumber()
  return useQuery(['latest-blocks', blockNumber], {
    queryFn: async () => {
      let blocks: Block[] = []
      let lastBlock = blockNumber
      if (blockNumber <= 0) {
        return blocks
      }

      for (let i = 0; i < 10; i++) {
        lastBlock -= 1
        const block = await alchemy.core.getBlock(lastBlock)
        blocks.push(block)
      }
      return blocks
    },
    keepPreviousData: true,
  })
}

export default useQueryLatestBlocks

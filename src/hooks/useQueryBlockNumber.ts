import alchemy from '@app/libs/alchemy'
import { useQuery } from '@tanstack/react-query'

const useQueryBlockNumber = () => {
  return useQuery(['block-number'], {
    queryFn: async () => {
      const blockNumber = await alchemy.core.getBlockNumber()
      return blockNumber
    },
    refetchInterval: 1000 * 60, // 1 Min
    keepPreviousData: true,
  })
}

export default useQueryBlockNumber

import alchemy from '@app/libs/alchemy'
import { useQuery } from '@tanstack/react-query'
import { AssetTransfersCategory, SortingOrder } from 'alchemy-sdk'

const useQueryLatestTransactions = () => {
  return useQuery(['latest-transactions'], {
    queryFn: async () => {
      const response = await alchemy.core.getAssetTransfers({
        fromBlock: 'latest',
        toBlock: 'latest',
        category: [
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.ERC721,
        ],
        maxCount: 10,
        order: SortingOrder.DESCENDING,
      })
      return response
    },
    keepPreviousData: true,
  })
}

export default useQueryLatestTransactions

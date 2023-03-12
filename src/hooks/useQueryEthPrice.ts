// import { useQuery } from "@chakra-ui/react"

import { useQuery } from '@tanstack/react-query'
const url =
  'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false'

type Currency = {
  usd: number
  idr: number
  btc: number
}

export type CurrencyString = keyof Currency

type EtherPriceResponse = {
  market_data: {
    price_change_24h_in_currency: Currency
    price_change_percentage_24h_in_currency: Currency
    circulating_supply: number
    market_cap: Currency
    current_price: Currency
  }
}

const useQueryEthPrice = () => {
  return useQuery(['eth-price'], {
    queryFn: async () => {
      const response = await fetch(url)
      const json: EtherPriceResponse = await response.json()
      return json
    },
    keepPreviousData: true,
    refetchInterval: 10_000,
  })
}

export default useQueryEthPrice

import useQueryEthPrice, { CurrencyString } from '@app/hooks/useQueryEthPrice'
import numberFormat from '@app/utils/numberFormat'
import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Card from './Card'

type CurrencyLocal = {
  name: string
  value: Exclude<CurrencyString, 'btc'>
  symbol: string
  flag: string
}

const currencies: CurrencyLocal[] = [
  {
    value: 'idr',
    name: 'IDR',
    symbol: 'Rp',
    flag: '🇮🇩',
  },
  {
    value: 'usd',
    name: 'USD',
    symbol: '$',
    flag: '🇺🇸',
  },
]

const EthPrice = () => {
  const { data, isLoading } = useQueryEthPrice()
  const [currency, setCurrency] = useState<CurrencyLocal>(currencies[0])

  const currentPrice = data?.market_data?.current_price?.[currency.value] || 0
  const currentPriceBTC = data?.market_data?.current_price?.btc || 0
  const priceChangeCurrency = data?.market_data?.price_change_24h_in_currency?.[currency.value] || 0
  const priceChangePercentage = data?.market_data?.price_change_percentage_24h_in_currency?.[currency.value] || 0
  const marketCap = data?.market_data?.market_cap?.[currency.value] || 0

  const isMinus = priceChangePercentage < 0

  return (
    <Card
      title="ETH Price"
      prefix={
        <Menu>
          <MenuButton as={Button} size="xs">
            {currency.name} ▼
          </MenuButton>
          <MenuList>
            {currencies.map((curr) => {
              return (
                <MenuItem key={curr.name} fontSize="xs" onClick={() => setCurrency(curr)}>
                  {curr.name} {curr.flag}
                </MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      }
    >
      <Box px="6">
        <Skeleton fadeDuration={1} isLoaded={!isLoading}>
          <Text fontWeight="bold" fontSize="sm">
            Price: {currency.symbol} {numberFormat(currentPrice)}
          </Text>
        </Skeleton>

        <Skeleton fadeDuration={1} isLoaded={!isLoading}>
          <HStack fontSize="xs">
            <Text>Price Change: </Text>
            <Text color={isMinus ? 'red.400' : 'green.400'} fontWeight="bold">
              {priceChangePercentage} ({currency.symbol} {numberFormat(priceChangeCurrency)}) {isMinus ? '▼' : '▲'}
            </Text>
          </HStack>
        </Skeleton>
        <Skeleton fadeDuration={1} isLoaded={!isLoading}>
          <Text fontSize="sm">
            Market Cap:{' '}
            <strong>
              {currency.symbol} {numberFormat(marketCap)}
            </strong>
          </Text>
        </Skeleton>
      </Box>
    </Card>
  )
}

export default EthPrice

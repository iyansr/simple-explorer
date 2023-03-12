import { Alchemy, Network } from 'alchemy-sdk'

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '',
  network: Network.ETH_MAINNET,
}
const alchemy = new Alchemy(config)

export default alchemy

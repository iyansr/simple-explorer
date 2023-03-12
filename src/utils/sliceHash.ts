const sliceHash = (hash: string | null): string => {
  return hash ? `${hash.substring(0, 5)}...${hash.substring(hash.length - 4)}` : '0x'
}

export default sliceHash

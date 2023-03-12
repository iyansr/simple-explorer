const numberFormat = (num?: number, locale?: string) => {
  return new Intl.NumberFormat(locale || 'id').format(num || 0)
}

export default numberFormat

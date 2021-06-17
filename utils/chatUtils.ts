export const getCurrency = (curr: string) => {
  switch (curr) {
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
    default:
      return '€'
  }
}

export const getMessage = (message: any) => {
  if (message.text) return message.text
  if (message.offer) return `${message.offer} ${getCurrency(message.currency)}`
  return ''
}

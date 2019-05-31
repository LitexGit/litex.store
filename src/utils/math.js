export function roundFun (value, symbol) {
  let n
  switch (symbol) {
    case 'ETH':
      n = 4
      break
    case 'USDT':
      n = 2
      break
    case 'LXT':
      n = 0
      break
    default:
      n = 4
      break
  }
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
}

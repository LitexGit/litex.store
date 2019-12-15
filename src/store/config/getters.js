
export const getSelectedToken = ({ tokens, selected }) => {
  const token = { symbol: '', address: '', decimal: 18, type: 1, round: 0, icon: '', status: 0, channelBalance: '0', balance: '0' }
  return tokens[selected] || token
}

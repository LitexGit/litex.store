
export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function loading (state, loading) {
  state.loading = loading
}

export function updateConfigs (state, config) {
  const {
    baseUrl,
    categorys,
    telegramUrl,
    tokens,
    contractAddress: {
      ethPNAddress,
      appRpcUrl,
      appPNAddress
    }
  } = config

  state.baseURL = baseUrl
  state.categorys = categorys
  state.telegramURL = telegramUrl

  state.ethPNAddress = ethPNAddress
  state.appPNAddress = appPNAddress
  state.appRpcUrl = appRpcUrl

  const completion = { status: 0, channelBalance: '0', balance: '0' }

  let list = []
  for (const token of tokens) {
    list.push(Object.assign(token, completion))
  }
  state.tokens = list

  // console.log('=============config=======================')
  // console.log(state)
  // console.log('=============config=======================')
}

export function updateSelected (state, { index }) {
  state.selected = index
}

export function updatePrice (state, { price }) {
  price < 0 && (price = 0)
  state.price = price
}

export function updateOnchainBalance (state, { list }) {
  const { tokens } = state
  for (const token of tokens) {
    const t = list.find(item => {
      return item.address.toLowerCase() === token.address.toLowerCase()
    })
    token.balance = t.balance
  }
}

export function updateBalance (state, { list }) {
  const { tokens } = state
  for (const token of tokens) {
    const t = list.find(item => {
      return item.address.toLowerCase() === token.address.toLowerCase()
    })
    token.channelBalance = t.channelBalance
  }
}

export function updateChannelStatus (state, { list }) {
  const { tokens } = state
  for (const token of tokens) {
    const t = list.find(item => {
      return item.address.toLowerCase() === token.address.toLowerCase()
    })
    token.status = t.status
    token.loading = t.loading
  }
}

export function syncChannelStatus (state, { channel }) {
  // address: '0x0000000000000000000000000000000000000000'
  // status: 2
  const { tokens } = state
  const token = tokens.find(item => {
    return item.address.toLowerCase() === channel.address.toLowerCase()
  })
  token.status = channel.status
  token.loading = channel.loading
}

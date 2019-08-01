
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
    tokens
  } = config

  state.baseURL = baseUrl
  state.categorys = categorys
  state.telegramURL = telegramUrl

  state.ethPNAddress = '0xbe5d4d46bd33362f66cb0e6a24c81565ecb565c4'
  state.appPNAddress = '0x8A7B9f4396483A33fB2fb32B6F67ff9ff4Edf6fE'
  state.appRpcUrl = 'https://cita.milewan.com:9191'

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

export function updateIsShowRoot (state, { isShowRoot, isShowFund, title }) {
  state.isShowRoot = isShowRoot
  state.isShowFund = isShowFund
  state.title = title
}

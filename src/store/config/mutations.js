
export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function loading (state, loading) {
  state.loading = loading
}

export function updateConfigs (state, config) {
  const { baseUrl, categorys, telegramUrl, tokens } = config
  state.baseURL = baseUrl
  state.categorys = categorys
  state.telegramURL = telegramUrl

  let list = []
  for (const token of tokens) {
    for (const t of state.tokens) {
      const { symbol } = token
      const { symbol: s } = t
      if (s === symbol) {
        list.push(Object.assign(t, token))
      }
    }
  }
  state.tokens = list
}

export function updateSelected (state, { index }) {
  state.selected = index
}

export function updatePrice (state, { price }) {
  price < 0 && (price = 0)
  state.price = price
}

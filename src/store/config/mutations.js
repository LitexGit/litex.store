
export function loading (state, loading) {
  state.loading = loading
}

export function updateSelected (state, { index }) {
  state.selected = index
}

export function updatePrice (state, { price }) {
  price < 0 && (price = 0)
  state.price = price
}

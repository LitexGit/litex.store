/*
export function someMutation (state) {
}
*/

export function loading (state, loading) {
  state.loading = loading
}

export function updatePrice (state, price) {
  if (!price || price < 0) {
    price = 0
  }
  state.price = price
}

export function updateSelected (state, selected) {
  state.selected = selected
}

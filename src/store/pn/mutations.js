/*
export function someMutation (state) {
}
*/

export function updateSelectedPn (state, selected) {
  state.selected = selected
}

export function updatePnPrice (state, { symbol, price }) {
  let pn = state.available.find(pn => pn.symbol === symbol)
  pn && (pn.price = price)
}

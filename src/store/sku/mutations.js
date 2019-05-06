/*
export function someMutation (state) {
}
*/

export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}
export function updateSelectedSku (state, selected) {
  state.selected = selected
}
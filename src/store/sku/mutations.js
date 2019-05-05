/*
export function someMutation (state) {
}
*/

export function update (state, payload) {
  console.log('PAYLOAD:\n', payload)
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
  console.log('STATE after:\n', state)
}
export function updateSelectedSku (state, selected) {
  state.selected = selected
}

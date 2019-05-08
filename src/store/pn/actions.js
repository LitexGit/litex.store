/*
export function someAction (context) {
}
*/

import api from '../../service/api'

export async function updatePrice ({ commit }, symbol) {
  commit('loading', true)
  let price = await api.getPrice(symbol)
  console.log('Price: ', price)

  commit('updatePrice', price)
  commit('loading', false)
}

/*
export function someAction (context) {
}
*/

import axios from 'axios'

export async function updatePrice ({ commit }, symbol) {
  commit('loading', true)
  let api = `${process.env.API}/price/${symbol}`
  let { data: price } = await axios.get(api)
  console.log('Price: ', price)

  commit('updatePrice', price)
  commit('loading', false)
}

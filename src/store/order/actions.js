import axios from 'axios'

export async function placeOrder ({ commit }, { user, pn, sku }) {
  const api = `${process.env.API}/orders`
  const { data: order } = await axios.post(api, { user, pn, sku })
  commit('update', { placing: true })
  commit('update', { current: order })
}

export async function updateOrder ({ commit }, { id, txhash }) {
  const api = `${process.env.API}/orders/${id}`
  const { data: order } = await axios.put(api, { status: 2, txhash })
  console.log(`order ${id} paid:`, order)
  commit('update', { placing: false })
  commit('update', { current: order })
}

export async function cancelOrder ({ commit }, { id }) {
  const api = `${process.env.API}/orders/${id}`
  const res = await axios.put(api, { status: 0 })
  console.log(`order ${id} cancelled:`, res)
  commit('update', { placing: false })
  commit('update', { current: {} })
}

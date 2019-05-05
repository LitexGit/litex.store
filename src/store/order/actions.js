import axios from 'axios'

export async function placeOrder ({ commit }, { user, pn, sku }) {
  const api = `${process.env.API}/orders`
  const { data: order } = await axios.post(api, { user, pn, sku })
  commit('update', { current: order })
}

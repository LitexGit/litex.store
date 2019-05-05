/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function loadSkus ({ commit }) {
  let api = `${process.env.API}/config`
  let { data: { skus } } = await axios.get(api)

  commit('update', { skus })
}

// import api from '../../service/api'

export async function updatePrice ({ commit }, { symbol }) {
  commit('loading', true)

  // const price = await api.getPrice(symbol)
  // console.log('=================getPrice===================')
  // console.log(price)
  // console.log('=================getPrice===================')
  // commit('updatePrice', { price })

  commit('loading', false)
}

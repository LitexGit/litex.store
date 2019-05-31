import api from '../../service/api'

export async function getGoodsList ({ commit }, payload) {
  commit('loading', true)
  const categoryId = 0
  const accountNum = '18516804325'
  const skus = await api.getGoodsList({ categoryId, accountNum })
  commit('update', { skus })
  commit('loading', false)
}

export async function updatePrice ({ commit }, symbol) {
  commit('loading', true)
  // 汇率
  // 分
  // token
  // let price = await api.getPrice(symbol)
  // console.log('Price: ', price)
  // commit('updatePrice', price)
  commit('loading', false)
}

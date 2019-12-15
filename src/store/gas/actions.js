import api from '../../service/api'

export async function getGoodsList ({ commit }, payload) {
  commit('update', { loading: true })
  // 当前为 0 => 话费流量
  const categoryId = 1
  const { selectedCard: card } = payload
  const skus = await api.getGoodsList({ categoryId, accountNum: card === null ? null : card.id })
  commit('update', { skus })
  commit('update', { loading: false })
  if (card === null) {
    commit('update', { disable: true })
  } else {
    commit('update', { disable: false })
  }
}

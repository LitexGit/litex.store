import api from '../../service/api'

export async function loadSkus ({ commit }) {
  const skus = await api.getSkus()

  commit('update', { skus })
}

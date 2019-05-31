import api from '../../service/api'

export async function updateFundRecords ({ commit }, { index, account }) {
  commit('updateLoading', true)
  const records = await api.getAssetRecords({
    type: index + 1,
    address: account
  })
  commit('updateFundRecords', records)
  commit('updateLoading', false)
}

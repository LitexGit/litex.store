import api from '../../service/api'

export async function updateFundRecords ({ commit }, { type, account }) {
  commit('updateLoading', true)
  const records = await api.getAssetRecords({
    type,
    address: account
  })
  commit('updateFundRecords', records)
  commit('updateLoading', false)
}

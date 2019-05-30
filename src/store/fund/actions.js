import api from '../../service/api'

export async function updateFundRecords ({ commit }, { index, account }) {
  const records = await api.getFundRecords(index, account)
  commit('updateFundRecords', records)
}

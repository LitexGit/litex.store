import api from '../../service/api'
import { Preferences, PrefKeys } from '../../utils/preferences'

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

export async function getRecords ({ commit }, payload) {
  commit('update', { loading: true })
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const type = 3 // 加油卡
  // 加油卡充值记录
  const records = await api.getOrderRecords({ address, type: type })
  records.forEach(element => {
    element.type = 3
  })
  commit('update', { records })
  // commit('update', { records: records.filter(record => record.status && record.status !== 0) })
  commit('update', { loading: false })
}

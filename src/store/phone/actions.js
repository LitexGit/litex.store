import api from '../../service/api'
import { isPoneAvailable } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'

export async function getGoodsList ({ commit }, payload) {
  commit('loading', true)
  // 当前默认为 0 => 话费流量
  const categoryId = 0
  const { accountNum = '', debug } = payload
  const skus = await api.getGoodsList({ categoryId, accountNum, debug })
  commit('update', { skus })
  commit('loading', false)
  if (!isPoneAvailable(accountNum)) {
    commit('update', { disable: true })
  } else {
    commit('update', { disable: false })
  }
}
export async function getRecords ({ commit }, payload) {
  commit('loading', true)
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  // 话费充值记录
  const callRecords = await api.getOrderRecords({ address, type: 1 })
  callRecords.forEach(element => {
    element.type = 1
  })
  // 流量充值记录
  const flowRecords = await api.getOrderRecords({ address, type: 2 })
  flowRecords.forEach(element => {
    element.type = 2
  })
  const records = [...callRecords, ...flowRecords]
  // callRecords.push.apply(callRecords, flowRecords)
  // 对未进行支付的订单进行过滤
  commit('updateRecords', { records: records.filter(record => record.status && record.status !== 0) })
  commit('loading', false)
}

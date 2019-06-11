import { Notify } from 'quasar'
import api from '../../service/api'
import { isPoneAvailable } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'
import * as utils from 'web3-utils'

/**
 *【下单】
 */
export async function placeOrder ({ commit, rootState }, payload) {
  console.log('===============【下单】=====================')
  const { config: { tokens, selected, duration } } = rootState
  // 01:校验 手机号码
  const { phone } = payload
  if (!isPoneAvailable(phone)) {
    Notify.create({ message: '请输入正确的手机号码', position: 'top', color: 'red', timeout: duration })
    return
  }
  // 02:校验 商品
  const { sku: { selectGoods } } = rootState
  const { productId, goodsId } = selectGoods
  if (!productId || !goodsId) {
    Notify.create({ message: '请先选择下单商品', position: 'top', color: 'red', timeout: duration })
    return
  }
  // 03:校验 余额

  const { type: tokenType, decimal, channelBalance } = tokens[selected]
  let { price } = rootState.pn
  price = price * Math.pow(10, decimal)
  const isGte = utils.toBN(price).gte(utils.toBN(channelBalance))
  if (isGte) {
    Notify.create({ message: '余额不足,请及时充值', position: 'top', color: 'red', timeout: duration })
    return
  }
  // 04:下单
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  commit('updateLoading', true)
  const order = await api.placeOrder({ address, accountNum: phone, tokenType, productId, goodsId })
  commit('updateLoading', false)
  commit('update', { current: Object.assign(order, { status: 1 }) })
  commit('updateShowConfirmPay', { open: true })
}

/******************/
export async function confirmPayment ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 4 })

  if (order.status === 4) {
    console.log(`order ${id} confirmed:`, order)
    commit('update', { current: order })
  }
}

export async function updateOrder ({ commit }, { id, txhash }) {
  const order = await api.updateOrder(id, { status: 2, txhash })
  console.log(`order ${id} paid:`, order)
  commit('update', { placing: false })
  commit('update', { current: order })
}

export async function cancelOrder ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 0 })
  if (order.status === 0) {
    console.log(`order ${id} cancelled:`)
    commit('update', { placing: false })
    commit('update', { current: {} })
  }
}

export async function updateOrderRecords ({ commit }, { account }) {
  commit('updateLoading', true)
  const records = await api.getOrderRecords({
    address: account
  })
  commit('updateOrderRecords', records)
  commit('updateLoading', false)
}

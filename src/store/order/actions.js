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
  const { path } = payload
  let selectGoods, accountNum, remark
  switch (path) {
    case '/shop/phone':
      // 01:校验 手机号码
      const { info: { phone } } = rootState.phone
      if (!isPoneAvailable(phone)) {
        Notify.create({ message: '请输入正确的手机号码', position: 'top', color: 'red', timeout: duration })
        return
      }
      selectGoods = rootState.phone.selectGoods
      accountNum = phone
      remark = null
      break
    case '/shop/gas':
      selectGoods = rootState.gas.selectedGoods
      const selectedCard = rootState.gas.selectedCard
      if (selectedCard === null || selectedCard === {}) {
        Notify.create({ message: '请选择加油卡', position: 'top', color: 'red', timeout: duration })
        return
      }
      accountNum = selectedCard.id
      remark = JSON.stringify({
        phoneNum: selectedCard.tel
      })
      break
    case '/shop/lifeDeal':
    case '/shop/lifeDealDetail':
      break
    default: return
  }

  let productId, goodsId
  switch (path) {
    case '/shop/phone':
    case '/shop/gas':
      // 02:校验 商品
      productId = selectGoods.productId
      goodsId = selectGoods.goodsId
      if (!productId || !goodsId) {
        Notify.create({ message: '请先选择下单商品', position: 'top', color: 'red', timeout: duration })
      }
      break
    case '/shop/lifeDeal':
    case '/shop/lifeDealDetail':
      break
    default:
      return
  }

  // 校验通道状态
  const { type: tokenType, decimal, channelBalance, status } = tokens[selected]
  console.log('=======placeOrder=====status========================')
  console.log(status)
  console.log('=======placeOrder=====status========================')
  if (parseInt(status) === 0) {
    // Notify.create({ message: '余额不足,请及时充值...', position: 'top', color: 'red', timeout: duration })
    commit('config/update', { showDepositDialog: true }, { root: true })
    return
  }
  if (parseInt(status) === 2) {
    Notify.create({ message: '状态恢复中,请稍后...', position: 'top', color: 'red', timeout: duration })
    return
  }

  // 03:校验 余额
  let { price } = rootState.pn
  price = price * Math.pow(10, decimal)
  const isGte = utils.toBN(price).gte(utils.toBN(channelBalance))
  if (isGte) {
    // Notify.create({ message: '余额不足,请及时充值', position: 'top', color: 'red', timeout: duration })
    commit('config/update', { showDepositDialog: true }, { root: true })
    return
  }

  // 04:下单
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  let order
  switch (path) {
    case '/shop/phone':
    case '/shop/gas':
      commit('updateLoading', true)
      order = await api.placeOrder({ address, accountNum, tokenType, productId, goodsId, remark })
      commit('updateLoading', false)
      commit('update', { current: Object.assign(order, { status: 1, productId: selectGoods.productId }) })
      break
    case '/shop/lifeDeal':
    case '/shop/lifeDealDetail':
      commit('updateLoading', true)
      const { life: { account: { id: accountId, type }, depositAmount } } = rootState
      order = await api.placeLifeOrder({ address, accountId, tokenType, fiatAmount: depositAmount * 100 })
      order.orderinfo = order.orderInfo
      order.ordered = order.orderNo
      order.orderinfo.accountNum = order.orderinfo.householdId
      commit('updateLoading', false)
      commit('update', { current: Object.assign(order, { status: 1, productId: type + 3 }) })
      break
    default:
      return
  }
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
  commit('updateOrderRecords', records.filter(record => record.status && record.status !== 0))
  commit('updateLoading', false)
}

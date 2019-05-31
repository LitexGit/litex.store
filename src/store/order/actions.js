import { Notify } from 'quasar'
import api from '../../service/api'
import { isPoneAvailable } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'

//
/**
 *【下单】
 */
export async function placeOrder ({ commit, rootState }, payload) {
  console.log('===============【下单】=====================')
  const { phone } = payload
  if (!isPoneAvailable(phone)) { // color: 'red',
    Notify.create({ message: '请输入正确的手机号码', position: 'top', type: 'negative', timeout: rootState.config.duration })
    return
  }
  // price ?? channelBalance
  // api
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { tokens, selected } = rootState.config
  const { type: tokenType } = tokens[selected]

  const { selectGoods: { productId, goodsId } } = rootState.sku

  const order = await api.placeOrder({ address, accountNum: phone, tokenType, productId, goodsId })
  commit('update', { current: order })
  commit('updateShowConfirmPay', { open: true })
}

export async function updateOrder ({ commit }, { id, txhash }) {
  const order = await api.updateOrder(id, { status: 2, txhash })
  console.log(`order ${id} paid:`, order)
  commit('update', { placing: false })
  commit('update', { current: order })
}

export async function confirmPayment ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 4 })

  if (order.status === 4) {
    console.log(`order ${id} confirmed:`, order)
    commit('update', { current: order })
  }
}

export async function cancelOrder ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 0 })
  if (order.status === 0) {
    console.log(`order ${id} cancelled:`)
    commit('update', { placing: false })
    commit('update', { current: {} })
  }
}

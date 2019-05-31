import { Notify } from 'quasar'
import api from '../../service/api'
import { isPoneAvailable } from '../../utils/helper'

/**
 *【下单】
 */
export async function placeOrder ({ commit, rootState }, payload) {
  console.log('===============【下单】=====================')
  const { phone, msg } = payload
  if (!isPoneAvailable(phone)) {
    // color: 'red',
    Notify.create({
      message: '请输入正确的手机号码',
      position: 'top',
      type: 'negative',
      timeout: rootState.config.duration
    })
    return
  }

  console.log(msg)
  // const order = await api.newOrder(data)
  commit('updateShowConfirmPay', { open: true })

  // commit('update', { placing: true })
  // commit('update', { current: order })
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

export async function updateOrderRecords ({ commit }, { account }) {
  commit('updateLoading', true)
  const records = await api.getOrderRecords({
    address: account
  })
  commit('updateOrderRecords', records)
  commit('updateLoading', false)
}


import * as utils from 'web3-utils'
import { timeoutCheck, getErrMsg } from '../../utils/helper'
import { Notify, Loading } from 'quasar'
import Vue from 'vue'
import { Preferences, PrefKeys } from '../../utils/preferences'

/**
 *【确认充值】
 */
export async function confirmDeposit ({ commit, rootState }, payload) {
  console.log('===============【确认充值】=====================')
  commit('updateShowDERC20Model', { open: false })
  commit('updateShowDpositModel', { open: false })
  const { amount, address } = payload
  // TODO 锁定通道
  try {
    const txHex = await Vue.prototype.$layer2.deposit(amount, address)
    console.log('===========deposit=========================')
    console.log(txHex)
    console.log('===========deposit=========================')
  } catch (error) {
    // TODO 解锁通道
    const { config: { duration } } = rootState
    Notify.create({ message: getErrMsg(error), position: 'top', type: 'negative', timeout: duration })
  }
}
/**
 *【准备充值】
 */
export function preDeposit ({ commit, rootState }, payload) {
  console.log('===============【准备充值】=====================')
  const { address, symbol } = payload
  // TODO 01:layer2 init
  // TODO 02:status 通道状态
  if (symbol === 'ETH') {
    commit('updateShowDpositModel', { open: true })
  } else {
    getERC20Allowance({ commit, rootState }, { address })
  }
}

/**
 *【确认授权】
 */
export async function submitERC20Approval ({ commit, rootState }, payload) {
  console.log('===============【确认授权】=====================')
  const { amount, address } = payload
  // TODO 01:锁定通道
  try {
    const txHex = await Vue.prototype.$layer2.submitERC20Approval(amount, address)
    console.log('===========submitERC20Approval=========================')
    console.log(txHex)
    console.log('===========submitERC20Approval=========================')
  } catch (error) {
    // TODO 02:解锁通道
    const { config: { duration } } = rootState
    Notify.create({ message: getErrMsg(error), position: 'top', type: 'negative', timeout: duration })
  }
}

async function getERC20Allowance ({ commit, rootState }, { address }) {
  commit('update', { allowance: '0' })
  const owner = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { config: { ethPNAddress: spender } } = rootState
  let allowance = await Vue.prototype.$layer2.getERC20Allowance(owner, spender, address)
  allowance = allowance.toString()
  const isLTE = utils.toBN(allowance).lte(utils.toBN('0'))
  if (isLTE) {
    commit('updateShowDRemindModel', { open: true })
  } else {
    commit('update', { allowance })
    commit('updateShowDERC20Model', { open: true })
  }
}

/**
 *【准备提现】
 */
export async function preWithdraw ({ commit, rootState }, payload) {
  console.log('===============【准备提现】=====================')
  const { config: { tokens, selected, duration } } = rootState
  const { channelBalance } = tokens[selected]
  // TODO 00: layer2
  // TODO 01: 校验通道状态
  const isGT = utils.toBN(channelBalance).gt(utils.toBN('0'))
  if (!isGT) {
    Notify.create({ message: '余额不足', position: 'top', type: 'negative', timeout: duration })
    return
  }
  await confirmWithdraw({ rootState }, payload)
}

/**
 *【确认提现】
 */
async function confirmWithdraw ({ rootState }, payload) {
  console.log('===============【确认提现】=====================')
  // TODO 01: 锁定通道
  const { config: { tokens, selected } } = rootState
  const { channelBalance, address } = tokens[selected]
  try {
    const txHex = await Vue.prototype.$layer2.withdraw(channelBalance, address)
    console.log('============txHex========================')
    console.log(txHex)
    console.log('============txHex========================')
  } catch (error) {
    // TODO 02:解锁通道
    const { config: { duration } } = rootState
    Notify.create({ message: getErrMsg(error), position: 'top', type: 'negative', timeout: duration })
  }
}

/**
 *【支付】
 */
export function transfer ({ commit, rootState }, payload) {
  console.log('===============【支付】=====================')
  const { order: { current }, config } = rootState
  const { timeout } = current
  if (timeoutCheck(timeout)) {
    Notify.create({ message: '订单已超时，请重新下单', position: 'top', type: 'negative', timeout: config.duration })
    return
  }
  Loading.show()
  // commit('update', { loading: true })
  setTimeout(() => {
    Loading.hide()
    // commit('update', { loading: false })
  }, 3000)
  console.log('==============【订单未超时=>继续支付】======================')
}

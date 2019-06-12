
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
  const { config: { duration, tokens } } = rootState
  const { status } = tokens.find(item => {
    return item.address.toLowerCase() === address.toLowerCase()
  })
  try {
    commit('update', { channel: { address, status: 2 } })
    const txHex = await Vue.prototype.$layer2.deposit(amount, address)
    console.log('===========deposit=========================')
    console.log(txHex)
    console.log('===========deposit=========================')
  } catch (error) {
    commit('update', { channel: { address, status } })
    Notify.create({ message: getErrMsg(error), position: 'top', color: 'red', timeout: duration })
  }
}
/**
 *【准备充值】
 */
export function preDeposit ({ commit, rootState }, payload) {
  console.log('===============【准备充值】=====================')
  const { address, symbol } = payload
  // TODO 01:layer2 init
  const { config: { tokens, duration } } = rootState
  const { status } = tokens.find(item => {
    return item.address.toLowerCase() === address.toLowerCase()
  })
  if (status === 2) {
    Notify.create({ message: '请稍后...', position: 'top', color: 'red', timeout: duration })
    return
  }
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
  const { config: { duration, tokens } } = rootState
  const { status } = tokens.find(item => {
    return item.address.toLowerCase() === address.toLowerCase()
  })
  try {
    commit('update', { channel: { address, status: 2 } })
    const txHex = await Vue.prototype.$layer2.submitERC20Approval(amount, address)
    console.log('===========submitERC20Approval=========================')
    console.log(txHex)
    console.log('===========submitERC20Approval=========================')
  } catch (error) {
    commit('update', { channel: { address, status } })
    Notify.create({ message: getErrMsg(error), position: 'top', color: 'red', timeout: duration })
  }
}

async function getERC20Allowance ({ commit, rootState }, { address }) {
  commit('update', { allowance: '0' })
  const owner = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { config: { ethPNAddress: spender } } = rootState
  let allowance = await Vue.prototype.$layer2.getERC20Allowance(owner, spender, address)
  // debugger
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
  const { address } = payload
  const { config: { tokens, duration } } = rootState
  const { status, channelBalance } = tokens.find(item => {
    return item.address.toLowerCase() === address.toLowerCase()
  })
  if (status !== 1) {
    Notify.create({ message: '请稍后...', position: 'top', color: 'red', timeout: duration })
    return
  }
  const isGT = utils.toBN(channelBalance).gt(utils.toBN('0'))
  if (!isGT) {
    Notify.create({ message: '余额不足', position: 'top', color: 'red', timeout: duration })
    return
  }
  commit('updateShowWithdrawModel', { open: true })
}

/**
 *【确认提现】
 */
export async function confirmWithdraw ({ commit, rootState }, payload) {
  console.log('===============【确认提现】=====================')
  const { config: { tokens, selected, duration } } = rootState
  const { address, status, channelBalance } = tokens[selected]
  try {
    commit('update', { channel: { address, status: 2 } })
    const txHex = await Vue.prototype.$layer2.withdraw(channelBalance, address)
    console.log('============withdraw========================')
    console.log(txHex)
    console.log('============withdraw========================')
  } catch (error) {
    commit('update', { channel: { address, status, isUpdate: true } })
    // 获取签名 => 解锁
    // 提现 => 锁定1分钟
    Notify.create({ message: getErrMsg(error), position: 'top', color: 'red', timeout: duration })
  }
}

/**
 *【支付】
 */
export async function transfer ({ commit, rootState }, payload) {
  console.log('===============【支付】=====================')
  const { order: { current }, config: { duration, tokens } } = rootState
  const { timeout, ordered, orderinfo } = current
  if (timeoutCheck(timeout)) {
    Notify.create({ message: '订单已超时，请重新下单', position: 'top', color: 'red', timeout: duration })
    return
  }
  const { amount, tokenType } = orderinfo
  const token = tokens.find(item => {
    return tokenType === item.type
  })
  const { address } = token
  Loading.show()
  try {
    const res = await Vue.prototype.$layer2.transfer(amount, address, ordered, timeout)
    console.log('=================transfer===================')
    console.log(res)
    console.log('=================transfer===================')
    Notify.create({ message: '订单支付成功', position: 'top', color: 'positive', timeout: duration })
  } catch (error) {
    Notify.create({ message: getErrMsg(error), position: 'top', color: 'red', timeout: duration })
  } finally {
    Loading.hide()
  }
}

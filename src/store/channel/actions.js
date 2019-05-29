
// import * as utils from 'web3-utils'

/**
 *【确认充值】
 */
export function confirmDeposit ({ commit }, payload) {
  console.log('===============【确认充值】=====================')
  commit('updateShowDERC20Model', { open: false })
  commit('updateShowDpositModel', { open: false })
  const { amount, address } = payload
  address && console.log('==============token======================')
  address && console.log(address)
  console.log('==============amount======================')
  console.log(amount)
  // layer2
}

/**
 *【准备充值】
 */
export function preDeposit ({ commit }, payload) {
  console.log('===============【准备充值】=====================')
  const { address, symbol } = payload
  // 01:layer2
  // 02:status
  if (symbol === 'ETH') {
    commit('updateShowDpositModel', { open: true })
  } else {
    getERC20Allowance({ commit }, { address })
  }
}

/**
 *【确认授权】
 */
export function submitERC20Approval ({ commit }, payload) {
  console.log('===============【确认授权】=====================')
  const { amount, address } = payload
  console.log('============address========================')
  console.log(address)
  console.log('============amount========================')
  console.log(amount)
}

function getERC20Allowance ({ commit }, { address }) {
  // layer2

  // commit('updateShowDRemindModel', { open: true })

  const allowance = '100000000000000'
  commit('updateAllowance', { allowance })
  commit('updateShowDERC20Model', { open: true })
}

/**
 *【准备提现】
 */
export function preWithdraw ({ commit }, payload) {
  console.log('===============【准备提现】=====================')
  // const { address, symbol } = payload
  // 01:layer2
  // 02:status
  commit('updateShowWithdrawModel', { open: true })
}

/**
 *【确认提现】
 */
export function confirmWithdraw ({ commit, rootState }, payload) {
  console.log('===============【确认提现】=====================')
  // 01: 校验通道余额
  const { config: { tokens } } = rootState
  console.log('====================================')
  console.log(tokens)
  console.log('====================================')
  // 02: channelStatus
  // layer2 withdraw
}

/**
 *【支付】
 */
export function transfer ({ commit }, payload) {
  console.log('===============【支付】=====================')
}

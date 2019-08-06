import api from '../../service/api'
import { getNetwork, getChannelStatus, getWalletInfo } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'
import Vue from 'vue'

export async function register ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const walletName = getWalletInfo()
  await api.register({ address, walletName })
  // userId
}

export async function getConfigs ({ commit, state }, payload) {
  const netId = await getNetwork()
  const walletName = getWalletInfo()
  const data = await api.getConfigs({ netId, walletName }) // : 'Kcash'
  commit('updateConfigs', data)
  await initLayer2({ commit, state })
}

export async function initLayer2 ({ commit, state }, payload) {
  // Vue.prototype.$layer2.setDebug(false)

  commit('update', { isInitL2: false })
  process.versions = { node: '11.2.0' }
  const account = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { ethPNAddress, appRpcUrl, appPNAddress } = state
  const chain = Preferences.getItem(PrefKeys.CURRENT_CHAIN)
  const provider = chain === 'ethereum' ? window.web3 : window.wan3
  console.log('=============initLayer2=======================')
  console.log(ethPNAddress)
  console.log(appRpcUrl)
  console.log(appPNAddress)
  console.log('=============initLayer2=======================')
  await Vue.prototype.$layer2.init(account, provider, ethPNAddress, appRpcUrl, appPNAddress)
  commit('update', { isInitL2: true })
}

export async function getOnchainBalance ({ commit, state }, payload) {
  let list = []
  const { tokens } = state
  try {
    for (const token of tokens) {
      const { address } = token
      let balance = await Vue.prototype.$layer2.getOnchainBalance(address)
      balance = balance.toString()
      list.push({ address, balance })
    }
    commit('updateOnchainBalance', { list })
  } catch (error) {
    console.log(error)
  }
}

export async function getBalance ({ commit, state }, payload) {
  let list = []
  const { tokens } = state
  for (const token of tokens) {
    const { address } = token
    let channelBalance = await Vue.prototype.$layer2.getBalance(address)
    // console.log('=============getBalance=======================')
    // console.log(address)
    // console.log(channelBalance)
    // console.log('==============getBalance======================')
    channelBalance = channelBalance.toString()
    list.push({ address, channelBalance })
  }
  commit('updateBalance', { list })
}

// 0: "0x0000000000000000000000000000000000000000"
// 1: "0x0000000000000000000000000000000000000000"
// 2: "0"
// 3: "0"
// 4: "0"
// channelID: "0x0000000000000000000000000000000000000000000000000000000000000000"
// status: 10001
// token: "0x0000000000000000000000000000000000000000"
// user: "0x0000000000000000000000000000000000000000"
// userBalance: "0"
// userDeposit: "0"
export async function getChannelInfo ({ commit, state }, payload) {
  let list = []
  const { tokens } = state
  for (const token of tokens) {
    const { address } = token
    const info = await Vue.prototype.$layer2.getChannelInfo(address)
    const { status, userBalance } = info
    // console.log('===============getChannelInfo=====================')
    // console.log(' status==> ' + status)
    // console.log('===============getChannelInfo=====================')
    const channelStatus = getChannelStatus({ status, tokens, address, userBalance })
    list.push({ address, status: channelStatus })
  }
  commit('updateChannelStatus', { list })
}

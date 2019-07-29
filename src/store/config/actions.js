import api from '../../service/api'
import { getNetwork, getChannelStatus } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'
import Vue from 'vue'

export async function register ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  await api.register({ address })
  // userId
}

export async function getConfigs ({ commit }, payload) {
  commit('loading', true)
  const netId = getNetwork()
  const data = await api.getConfigs({ netId })
  commit('updateConfigs', data)
  commit('loading', false)
}

export async function initLayer2 ({ commit, state }, payload) {
  commit('update', { isInitL2: false })
  process.versions = { node: '11.2.0' }
  const account = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { ethPNAddress, appRpcUrl, appPNAddress } = state
  // Vue.prototype.$layer2.setDebug(false)
  await Vue.prototype.$layer2.init(account, window.web3, ethPNAddress, appRpcUrl, appPNAddress)
  commit('update', { isInitL2: true })
}

export async function getOnchainBalance ({ commit, state }, payload) {
  let list = []
  const { tokens } = state
  for (const token of tokens) {
    const { address } = token
    let balance = await Vue.prototype.$layer2.getOnchainBalance(address)
    balance = balance.toString()
    list.push({ address, balance })
  }
  commit('updateOnchainBalance', { list })
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
    // console.log(info)
    // console.log('===============getChannelInfo=====================')
    const channelStatus = getChannelStatus({ status, tokens, address, userBalance })
    list.push({ address, status: channelStatus })
  }
  commit('updateChannelStatus', { list })
}

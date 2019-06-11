import api from '../../service/api'
import { getNetwork } from '../../utils/helper'
import { Preferences, PrefKeys } from '../../utils/preferences'
import Vue from 'vue'

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
    channelBalance = channelBalance.toString()
    list.push({ address, channelBalance })
  }
  commit('updateBalance', { list })
}

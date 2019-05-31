import api from '../../service/api'
import { getNetwork } from '../../utils/helper'

export async function getConfigs ({ commit }, payload) {
  commit('loading', true)
  const netId = getNetwork()
  const data = await api.getConfigs({ netId })
  commit('updateConfigs', data)
  commit('loading', false)
}

export async function getRates ({ state, commit }, payload) {
  const { tokens } = state
  const list = tokens.map(({ address }) => {
    return { address }
  })
  commit('loading', true)
  const { tokens: rates } = await api.getRates(list)
  commit('update', { rates })
  commit('loading', false)
}

export async function updatePrice ({ commit }, { symbol }) {
  // commit('loading', true)
  // const price = await api.getPrice(symbol)
  // console.log('=================getPrice===================')
  // console.log(price)
  // console.log('=================getPrice===================')
  // commit('updatePrice', { price })
  // commit('loading', false)
}

// { categoryId, accountNum }

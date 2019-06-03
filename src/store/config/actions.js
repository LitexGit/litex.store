import api from '../../service/api'
import { getNetwork } from '../../utils/helper'

export async function getConfigs ({ commit }, payload) {
  commit('loading', true)
  const netId = getNetwork()
  const data = await api.getConfigs({ netId })
  commit('updateConfigs', data)
  commit('loading', false)
}

import api from '../../service/api'
import { isPoneAvailable } from '../../utils/helper'

export async function getGoodsList ({ commit }, payload) {
  commit('loading', true)
  // 当前默认为 0 => 话费流量
  const categoryId = 0
  const { accountNum = '' } = payload
  // console.log('============accountNum========================')
  // console.log(accountNum)
  // console.log('============accountNum========================')
  const skus = await api.getGoodsList({ categoryId, accountNum })
  commit('update', { skus })
  commit('loading', false)
  if (!isPoneAvailable(accountNum)) {
    commit('update', { disable: true })
  } else {
    commit('update', { disable: false })
  }
}

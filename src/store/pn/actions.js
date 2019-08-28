import api from '../../service/api'
import { mathCeil } from '../../utils/helper'

export async function updatePrice ({ commit, rootGetters, rootState }, payload) {
  const { path } = payload
  commit('loading', true)
  let payPrice
  switch (path) {
    case '/shop/phone':
      const { selectGoods: { price } } = rootState.phone
      payPrice = price
      break
    case '/shop/gas':
      const { selectedGoods: { price: gasPrice } } = rootState.gas
      payPrice = gasPrice
      break
    case '/shop/lifeDeal':
    case '/shop/lifeDealDetail':
      const { depositAmount } = rootState.life
      payPrice = depositAmount * 100
      break
    default:
      commit('updatePrice', 0)
      commit('loading', false)
      return
  }
  const { tokens, selected } = rootState.config
  const { address, round } = tokens[selected]
  const { tokens: rates } = await api.getRates([{ address }])
  const Ramda = require('ramda')
  const { rate } = Ramda.head(rates)

  let decimal = payPrice / 100 / rate
  decimal = mathCeil({ decimal, round })
  commit('updatePrice', decimal)
  commit('loading', false)
}

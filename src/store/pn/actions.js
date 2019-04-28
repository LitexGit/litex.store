/*
export function someAction (context) {
}
*/

import axios from 'axios'

export async function updatePrice ({ commit }, symbol) {
  let price = 0
  console.log(symbol === 'usdt')
  let cors = 'https://cors-anywhere.herokuapp.com/'
  if (symbol === 'usdt') {
    let api = 'https://otc-api.huobi.co/v1/data/trade-market?country=37&currency=1&payMethod=0&currPage=1&coinId=2&tradeType=sell&blockType=general&online=1'
    let { data } = await axios.get(cors + api)
    if (data.length) {
      price = data.reduce((a, b) => a.price + b.price) / data.length
    }
  } else {
    let api = `http://api.huobi.pro/market/trade?symbol=${symbol}usdt`
    let { tick } = await axios.get(cors + api)
    price = tick.data.price
  }

  commit('pn/updatePnPrice', { symbol, price })
}

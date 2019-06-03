import axios from 'axios'
import Api from '../constants/interface'

async function get (path, params) {
  if (params) {
    path += '?'
    for (let k of Object.keys(params)) {
      path += k + '=' + params[k] + '&'
    }
  }
  return axios.get(path)
}

export default {
  /**
   * 查询App配置接口
   */
  getConfigs: async netId => get(Api.GET_CONFIGS, { netId }),

  /**
   * 查询汇率接口
   */
  getRates: async tokens => axios.post(Api.GET_RATES, { tokens }),

  /**
   * 查询App配置接口
   */
  getGoodsList: async (params) => axios.post(Api.GET_GOODS_LIST, params),

  /**
   * 下单接口
   */
  placeOrder: async (params) => axios.post(Api.PLEASE_ORDER, params),

  /** **********
   * order api
   ************/

  getSkus: async () => {
    const {
      data: { skus }
    } = await get(Api.GET_SKU)
    return skus
  },
  /**
   * get specific order by id
   */
  getOrder: async id => {
    const order = await get(`${Api.GET_ORDER}/${id}`)
    return order
  },

  /**
   * get orders by restrictions
   * params
   * - page
   * - size
   */
  getOrders: async params => {
    const orders = await get(Api.GET_ORDER, params)
    return orders
  },

  /**
   * create order
   */
  newOrder: async data => {
    const { data: order } = await axios.post(Api.GET_ORDER, data)
    return order
  },

  updateOrder: async (id, data) => {
    const { data: order } = await axios.put(`${Api.GET_ORDER}/${id}`, data)
    return order
  },

  /**
   * payment api
   */
  getPrice: async symbol => {
    const { data: price } = await get(`${Api.GET_PRICE}/${symbol}`)
    return price
  },

  /**
   * get asset records by tokenType and accountAddress
   */
  getAssetRecords: async params => {
    const records = await axios.post(Api.POST_ASSET_RECORDS, params)
    return records
  },

  /**
   * get order records by accountAddress
   */
  getOrderRecords: async params => {
    const records = await axios.post(Api.POST_ORDER_RECORDS, params)
    return records
  }
}

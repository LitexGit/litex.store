
import axios from 'axios'
import Api from '../constants/interface'

/**
 * ===============================
 */

export default {
  /**
   * 查询App配置接口
   */
  getConfigs: async (netId) => get(Api.GET_CONFIGS, { netId }),

  /**
   * 查询App配置接口
   */
  getRates: async (tokens) => axios.post(Api.GET_RATES, { tokens }),

  getSkus: async () => {
    const { data: { skus } } = await get(Api.GET_SKU)
    return skus
  },

  /************
   * order api
   ************/

  /**
   * get specific order by id
   */
  getOrder: async (id) => {
    const order = await get(`${Api.GET_ORDER}/${id}`)
    return order
  },

  /**
   * get orders by restrictions
   * params
   * - page
   * - size
   */
  getOrders: async (params) => {
    const orders = await get(Api.GET_ORDER, params)
    return orders
  },

  /**
   * create order
   */
  newOrder: async (data) => {
    const { data: order } = await post(Api.GET_ORDER, data)
    return order
  },

  updateOrder: async (id, data) => {
    const { data: order } = await put(`${Api.GET_ORDER}/${id}`, data)
    return order
  },

  /**
   * payment api
   */
  getPrice: async (symbol) => {
    const { data: price } = await get(`${Api.GET_PRICE}/${symbol}`)
    return price
  }
}
async function get (path, params) {
  if (params) {
    path += '?'
    for (let k of Object.keys(params)) {
      path += k + '=' + params[k] + '&'
    }
  }
  return axios.get(path)
}

async function post (path, params) {
  return (path, params)
}

async function put (path, params) {
  return axios.put(path, params)
}

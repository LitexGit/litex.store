import axios from 'axios'

const API_BASE = process.env.API

const API_PATH = {
  order: '/orders',
  sku: '/config',
  price: '/price'
}

console.log('API_BASE: ', API_BASE)

export default {
  getSkus: async () => {
    const { data: { skus } } = await get(API_PATH.sku)
    return skus
  },

  /************
   * order api
   ************/

  /**
   * get specific order by id
   */
  getOrder: async (id) => {
    const order = await get(`${API_PATH.order}/${id}`)
    return order
  },

  /**
   * get orders by restrictions
   * params
   * - page
   * - size
   */
  getOrders: async (params) => {
    const orders = await get(API_PATH.order, params)
    return orders
  },

  /**
   * create order
   */
  newOrder: async (data) => {
    const { data: order } = await post(API_PATH.order, data)
    return order
  },

  updateOrder: async (id, data) => {
    const { data: order } = await put(`${API_PATH.order}/${id}`, data)
    return order
  },

  /**
   * payment api
   */
  getPrice: async (symbol) => {
    const { data: price } = await get(`${API_PATH.price}/${symbol}`)
    return price
  }
}

/**
 * ===============================
 */

async function get (path, params) {
  if (params) {
    path += '?'
    for (let k of Object.keys(params)) {
      path += k + '=' + params[k] + '&'
    }
  }

  return axios.get(API_BASE + path)
}

async function post (path, params) {
  return axios.post(API_BASE + path, params)
}

async function put (path, params) {
  return axios.put(API_BASE + path, params)
}

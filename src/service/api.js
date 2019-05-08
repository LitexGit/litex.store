import axios from 'axios'

const API_BASE = process.env.API

export default {
  getSkus: async () => {
    const { data: { skus } } = await get('/config')
    return skus
  },

  /************
   * order api
   ************/

  /**
   * get specific order by id
   */
  getOrder: async (id) => {
    const order = await get(`/orders/${id}`)
    return order
  },

  /**
   * get orders by restrictions
   * params
   * - page
   * - size
   */
  getOrders: async (params) => {
    const orders = await get('/orders', params)
    return orders
  },

  /**
   * create order
   */
  newOrder: async (data) => {
    const { data: order } = await post('/orders', data)
    return order
  },

  updateOrder: async (id, data) => {
    const { data: order } = await put(`/order/${id}`, data)
    return order
  }
}

async function get (path, params) {
  if (params) {
    path += '?'
    for (k of Object.keys(params)) {
      path += k + '=' + params[k] + '&'
    }
  }

  return axios.get(API_BASE + path)
}

async function post (path, params) {
  return axios.post(path, params)
}

async function put (path, params) {
  return axios.put(path, params)
}

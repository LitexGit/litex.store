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
   * 注册接口
   */
  register: async (params) => axios.post(Api.REGISTER, params),
  /**
   * 查询App配置接口
   */
  getConfigs: async params => get(Api.GET_CONFIGS, params),

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
  },

  /**
   * add life payment account
   */
  addAccount: async params => {
    const accountId = await axios.post(Api.ADD_LIFE_ACCOUNT, params)
    return accountId
  },

  /**
   * get life payment accounts
   */
  getAccounts: async params => {
    const accounts = await axios.post(Api.GET_LIFE_ACCOUNTS, params)
    return accounts
  },

  /**
   * get life payment companies
   */
  getCompanies: async params => {
    const companies = await axios.post(Api.GET_LIFE_COMPANIES, params)
    return companies
  },

  /**
   * get life payment account info
   */
  getAccountInfo: async params => {
    const bills = await axios.post(Api.GET_LIFE_ACCOUNT_BILL, params)
    return bills
  },

  /**
   * place life order
   */
  placeLifeOrder: async params => {
    const order = await axios.post(Api.PLACE_LIFE_ORDER, params)
    return order
  }
}

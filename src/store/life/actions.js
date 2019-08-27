import api from '../../service/api'
import { Preferences, PrefKeys } from '../../utils/preferences'
import { Notify } from 'quasar'

export async function addAccount ({ commit, dispatch }, payload) {
  commit('update', { loading: true })
  const { accountNumber, company } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const result = await api.addAccount({ address, householdId: accountNumber, itemId: company.id })
  commit('update', { loading: false })
  if (result && result.accountId) {
    const { accountId } = result
    commit('update', { type: undefined, account: { id: accountId } })
    dispatch('getAccounts')
    return 'ok'
  } else {
    return 'failed'
  }
}

export async function deleteAccount ({ commit, dispatch }, payload) {
  const { accountId } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  await api.deleteAccount({ address, accountId })
  dispatch('getAccounts')
}

export async function getAccounts ({ commit }, payload) {
  // commit('update', { loading: true })
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { accountList: accounts } = await api.getAccounts({ address })
  commit('updateAccounts', { accounts })
  // commit('update', { loading: false })
}

export async function getCompanies ({ commit }, payload) {
  commit('update', { loading: true })
  const { type, cityId } = payload
  const { units: companies } = await api.getCompanies({ type, cityId })
  let result
  if (companies && companies.length > 0) {
    commit('updateCompanies', { companies })
    result = 'ok'
  } else {
    Notify.create({ message: '暂不支持该城市当前缴费', position: 'top', color: 'red', timeout: 1500 })
    result = 'fail'
  }
  commit('update', { loading: false })
  return result
}

export async function checkCompany ({ commit }, payload) {
  const { type, cityId } = payload
  const { units: companies } = await api.getCompanies({ type, cityId })
  return companies && companies.length > 0
}

export async function updatePaymentItems ({ commit, dispatch, rootState }, payload) {
  const { cityId } = payload
  const { life: { paymentItems } } = rootState
  let items = []
  for (let i = 0; i < paymentItems.length; i++) {
    const item = paymentItems[i]
    const { units: companies } = await api.getCompanies({ type: item.type, cityId })
    const available = companies && companies.length > 0
    items.push({ type: item.type, available })
  }
  commit('update', { paymentItems: items })
}

export async function getAccountInfo ({ commit }, payload) {
  commit('update', { loading: true })
  const { accountId } = payload
  const { water_coal_ubqs_response: {
    message,
    status,
    waterCoalBills: {
      waterCoalBill: bills
    }
  } } = await api.getAccountBill({ accountId })
  if (status === '1') { // 获取账户信息成功
    commit('updateAccountBill', { bills })
  } else { // 获取账户信息失败
    Notify.create({ message, position: 'top', color: 'red', timeout: 1500 })
  }
  commit('update', { billResponse: { message, status } })
  commit('update', { loading: false })
}

export async function getCities ({ commit }, payload) {
  // commit('update', { loading: true })
  const { cities } = await api.getCities()
  commit('updateCities', { cities })
  // commit('update', { loading: false })
}

export async function getRecords ({ commit }, payload) {
  commit('update', { loading: true })
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const records = await api.getLifeRecords({ address })
  // commit('update', { records })
  // 对未进行支付的订单进行过滤
  commit('update', { records: records.filter(record => record.status && record.status !== 0) })
  commit('update', { loading: false })
}

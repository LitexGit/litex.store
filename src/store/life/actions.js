import api from '../../service/api'
import { Preferences, PrefKeys } from '../../utils/preferences'
import { Notify } from 'quasar'

export async function addAccount ({ commit, dispatch }, payload) {
  commit('update', { loading: true })
  const { accountNumber, company } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const result = await api.addAccount({ address, householdId: accountNumber, itemId: company.id })
  if (result && result.accountId) {
    const { accountId } = result
    commit('update', { type: undefined, account: { id: accountId } })
    dispatch('getAccounts')
  }
  commit('update', { loading: false })
}

export async function deleteAccount ({ commit, dispatch }, payload) {
  const { accountId } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  await api.deleteAccount({ address, accountId })
  dispatch('getAccounts')
}

export async function getAccounts ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { accountList: accounts } = await api.getAccounts({ address })
  commit('updateAccounts', { accounts })
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
  if (status === '1') {
    commit('updateAccountBill', { bills })
  } else {
    Notify.create({ message, position: 'top', color: 'red', timeout: 1500 })
  }
  commit('update', { billResponse: { message, status } })
  commit('update', { loading: false })
}

export async function getCities ({ commit }, payload) {
  // const { type } = payload
  // const start = new Date().getTime()
  const { cities } = await api.getCities()
  commit('updateCities', { cities })
  // const end = new Date().getTime()
  // console.log('cost time:', end - start)
}

export async function getRecords ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const records = await api.getLifeRecords({ address })
  commit('update', { records })
}

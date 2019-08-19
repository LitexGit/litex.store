import api from '../../service/api'
import { Preferences, PrefKeys } from '../../utils/preferences'
import { Notify } from 'quasar'

export async function addAccount ({ commit }, payload) {
  // commit('update', { loading: true })
  const { accountNumber, company } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { accountId } = await api.addAccount({ address, householdId: accountNumber, itemId: company.id })
  commit('update', { type: undefined, account: { id: accountId } })
}

export async function getAccounts ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const { accountList: accounts } = await api.getAccounts({ address })
  commit('updateAccounts', { accounts })
}

export async function getCompanies ({ commit }, payload) {
  const { type, cityId } = payload
  const { units: companies } = await api.getCompanies({ type, cityId })
  commit('updateCompanies', { companies })
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
  commit('update', { loading: false })
  commit('update', { billResponse: { message, status } })
}

export async function getCities ({ commit }, payload) {
  // const { type } = payload
  // const start = new Date().getTime()
  const { cities } = await api.getCities()
  commit('updateCities', { cities })
  // const end = new Date().getTime()
  // console.log('cost time:', end - start)
}

import api from '../../service/api'
import { Preferences, PrefKeys } from '../../utils/preferences'

export async function addAccount ({ commit }, payload) {
  // commit('update', { loading: true })
  const { accountNumber, company } = payload
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  await api.addAccount({ address, householdId: accountNumber, itemId: company.id })
  commit('update', { type: undefined, accountNumber: undefined, comapny: {} })
}

export async function getAccounts ({ commit }, payload) {
  const address = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  const accounts = await api.getAccounts({ address })
  commit('updateAccounts', { accounts })
}

export async function getCompanies ({ commit }, payload) {
  const { type, cityId } = payload
  const companies = await api.getCompanies({ type, cityId })
  commit('updateCompanies', { companies })
}

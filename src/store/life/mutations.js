export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function updateAccounts (state, payload) {
  const { accounts } = payload
  if (accounts && accounts.length > 0) {
    accounts.array.forEach(ele => {
      const account = {
        id: ele.id,
        type: ele.type,
        number: ele.householdId,
        name: ele.name,
        companyId: ele.itemId,
        companyName: ele.name,
        cityName: ele.city
      }
      state.accounts.push(account)
    })
  }
}

export function updateCompanies (state, payload) {
  const { companies } = payload
  if (companies && companies.length > 0) {
    companies.array.forEach(ele => {
      const company = {
        id: ele.itemId,
        name: ele.name
      }
      state.companies.push(company)
    })
  }
}

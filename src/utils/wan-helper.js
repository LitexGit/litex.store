import { Preferences, PrefKeys } from '../utils/preferences'

/**
 * 获取账户信息
 */
export function getWanAccount () {
  const getAccountPromise = new Promise((resolve, reject) => {
    window.wan3.eth.getAccounts((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
  return new Promise(async (resolve) => {
    const accounts = await getAccountPromise
    const account = accounts[0]
    console.log('window.wan3 ==>' + account)
    resolve(account)
  })
}

/**
 * 获取网络环境
 */
export function getWanNetId () {
  return new Promise((resolve, reject) => {
    window.wan3.version.getNetwork((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

export function wanProviderUpdate () {
  window.wan3.currentProvider.publicConfigStore.on('update', (res) => {
    const { selectedAddress } = res
    const account = Preferences.getItem(PrefKeys.USER_ACCOUNT)
    if (!selectedAddress || !account) return
    if (selectedAddress.toLowerCase() === account.toLowerCase()) return
    window.location.reload(true)
  })
}

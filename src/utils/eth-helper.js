/**
 * 获取账户信息
 */
export function getEthAccount (params) {
  const getAccountPromise = new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
  return new Promise(async (resolve, reject) => {
    let account = '0x'
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.enable()
        const accounts = await getAccountPromise
        account = accounts[0]
        console.log('window.ethereum ==>' + account)
        resolve(account)
      } catch (err) {
        reject(err)
      }
    } else if (window.web3) {
      const accounts = await getAccountPromise
      account = accounts[0]
      console.log('window.web3 ==>' + account)
      resolve(account)
    }
  })
}

/**
 * 获取网络环境
 */
export function getEthNetId () {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

export function ethProviderUpdate () {
  window.ethereum.on('accountsChanged', (accounts) => {
    console.log('============eth=【切换 账号】=======================')
    window.location.reload(true)
  })
  window.ethereum.on('networkChanged', function (netId) {
    console.log('============eth=【切换 netId】=======================')
  })
}

/**
 * 获取账户信息
 */
export async function getAccount () {
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
export function getNetwork () {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

import * as utils from 'web3-utils'
import { Preferences, PrefKeys } from '../utils/preferences'

export function getPlatformOS () {
  const user = navigator.userAgent
  const isiOS = !!user.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  console.log('isiOS => ' + isiOS)
  if (isiOS) {
    return 'iOS'
  }
  const isAndroid = user.indexOf('Android') > -1 || user.indexOf('Adr') > -1
  console.log('isAndroid => ' + isAndroid)
  if (isAndroid) {
    return 'Android'
  }
}

/**
 * 获取账户信息
 */
export async function getAccount () {
  const getAccountPromise = new Promise((resolve, reject) => {
    window.web3Proxy.eth.getAccounts((err, result) => {
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
    } else if (window.web3Proxy) {
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
    window.web3Proxy.version.getNetwork((err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

/**
 * 根据当前chain获取相应web3
 */
export function getWeb3forCurrentChain () {
  // let currnetChain = 'eth'
  let currnetChain = 'wan'
  switch (currnetChain) {
    case 'eth':
      window.web3Proxy = window.web3
      break
    // return window.web3
    case 'wan':
      window.web3Proxy = window.wan3
      break
    // return window.wan3
    default:
      window.web3Proxy = window.web3
    // return window.web3
  }
}

/**
 * 获取钱包类型
 */
export function getWalletInfo () {
  // console.log('===========getWalletInfo=========================')
  // console.log(window.web3.currentProvider)
  // console.log('===========getWalletInfo=========================')
  if (window.web3Proxy.currentProvider.isMetaMask) {
    return 'MetaMask'
  }
  if (window.web3Proxy.currentProvider.isImToken) {
    return 'imToken'
  }
  if (window.web3Proxy.currentProvider.isCoinbaseWallet) {
    return 'Coinbase'
  }
  if (window.web3Proxy.currentProvider.isTrust) {
    if (navigator.userAgent.includes('Kcash')) {
      return 'Kcash'
    }
    return 'Trust'
  }
  if (window.web3Proxy.currentProvider.isAlphaWallet) {
    return 'AlphaWallet'
  }
  if (navigator.userAgent.includes('TokenPocket')) {
    return 'TokenPocket'
  }
  if (window.web3Proxy.currentProvider.isHuobi) {
    return 'isHuobi'
  }
  return ''
}

/**
 * toWei
 * @param {*} input      输入值
 * @param {*} decimal    decimal
 * @param {*} pos        小数点位数
 */
export function toWei ({ input, decimal = 18, pos = 4 }) {
  let value = input * Math.pow(10, pos).toString()
  value = utils.toBN(value).mul(utils.toBN(Math.pow(10, decimal - pos)))
  value = value.toString()
  return value
}

/**
 * wei to decimal
 * @param {*} amount     wei
 * @param {*} decimal    decimal
 * @param {*} pos        .
 */
export function toDecimal ({ amount, decimal = 18, pos = 4 }) {
  return weiToDecimal(amount, decimal, pos)
}

/**
 * wei to decimal
 * @param {*} x     wei
 * @param {*} n     decimal
 * @param {*} fixed .
 */
export function weiToDecimal (x, n, fixed) {
  const BN = require('bn.js')
  const base = new BN(10).pow(new BN(n))
  const dm = new BN(x).divmod(base)
  // let prefix = '';
  if (dm.mod.lte(new BN(0))) {
    dm.mod = dm.mod.mul(new BN(-1))
  }
  let decimal = dm.mod.toString(10, n)
  if (decimal.length <= fixed) {
    decimal = utils.padRight(decimal, fixed)
  } else {
    decimal = decimal.substring(0, fixed)
  }
  // const str = dm.div + '.' + dm.mod.toString(10, n);
  let str = ''
  if (fixed > 0) {
    str = dm.div.toString() + '.' + decimal
  } else {
    str = dm.div.toString()
  }

  // fixed = fixed ? fixed : 2;
  // return new Decimal(str).toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  // return parseFloat(str).toFixed(fixed)
  return str
}

/**
 * 判断是否为手机号 校验是否为有效的手机号
 * @param {*} pone
 */
export function isPoneAvailable (pone) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(pone)) {
    return false
  } else {
    return true
  }
}

/**
 * 校验是否为有效的加油号
 * @param {*} pone
 */
export function verifyCardId (type, id) {
  // 中国石油
  const syReg = /^(\d){16}$/
  // 中国石化
  const shReg = /^(\d){19}$/
  console.log(syReg, id, syReg.test(id))
  return type === 1 ? syReg.test(id) : shReg.test(id)
}

/**
 * 格式化输入
 * @param {*} input
 */
export function formattedInput (input) {
  if (!input || input === '0' || input === '0.0' || input === '0.00') return '' // string ==> number === 0 return ''
  const reg = /^(0|[1-9]\d*|[1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
  if (!reg.test(input)) return ''
  // 清除“数字”和“.”以外的字符
  let value = input.replace(/[^\d.]/g, '')
  // 只保留第一个. 清除多余的
  value = value.replace(/\.{2,}/g, '.')
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  // 只能输入4个小数
  /* eslint-disable */
  value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
  /* eslint-disable */
  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (value.indexOf('.') < 0 && value !== '') {
    value = parseFloat(value)
  }
  return value
}

/**
 * 校验 input format
 * @param {*} input
 */
export function isAvailableFormat(input) {
  if (!input) return false
  const reg = /^(0|[1-9]\d*|[1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
  if (!reg.test(input)) return false
  return true
}

/**
 * categoryId => router
 * @param {*} categoryId
 */
export function getRouter(categoryId) {
  switch (categoryId) {
    case 0:
      return 'phone'
    case 1:
      return 'gas'
    case 2:
      return 'vip'

    default:
      break;
  }
}

/**
 * 向上取整保留小数
 * @param {*} decimal 小数
 * @param {*} round 保留小数位数
 */
export function mathCeil({ decimal, round }) {
  let value = decimal * Math.pow(10, round)
  value = Math.ceil(value) / Math.pow(10, round)
  return value
}

/**
 * 校验订单支付是否超时
 * @param {*} timeout 超时时刻
 */
export function timeoutCheck(timeout) {
  const moment = require('moment')
  const otime = moment(timeout).format()
  return moment().isSameOrAfter(otime)
}


/**
 * 解析异常提示
 * @param {*} error
 */
export function getErrMsg(error) {
  const { code, message } = error
  let msg = ''
  if (code) {
    msg = 'code:' + code
  }
  if (message) {
    const array = message.split('.')
    const Ramda = require('ramda')
    const errMsg = Ramda.head(array)
    msg = msg + errMsg + '.'
  }
  return msg
}

/**
 * 校验是否为当前用户
 * @param {*} user msg 用户地址
 */
export function isCurrentUser(user) {
  const account = Preferences.getItem(PrefKeys.USER_ACCOUNT)
  if (user.toLowerCase() === account.toLowerCase()) return true
  return false
}

/**
 * 获取授权 token
 * @param {*} address
 * @param {*} tokens
 */
export function getShowToken(address, tokens) {
  const token = tokens.find(token => {
    return token.address.toLowerCase() === address.toLowerCase()
  });
  return token
}

/**
 * 获取通道状态
 * @param {*} status
 * 0:已关闭 1:可支付 2:等待中
 */
export function getChannelStatus({ status, tokens, address, userBalance }) {
  switch (parseInt(status)) {
    case 0: // 默认初始化状态
    case 3: // 已关闭
    case 4:
      return 0
    case 1: // 通道打开
      return 1
    case 10001:
      {
        const isGT = utils.toBN(userBalance).gt(utils.toBN('0'))
        return isGT ? 1 : 0
      }
    case 2: // 强关中
    case 10000: // 授权中
    case 10002: // 开通道
    case 10003: // 充值
    case 10004:
    case 10005:
    case 10006:
    case 10007:
      return 2
    default:
      return 0
  }
}

/**
 * 获取通道状态描述
 * @param {*} status
 * 0:不可用 1:可用 2:准备中
 */
export function getChannelStatusDes(status) {
  switch (parseInt(status)) {
    case 0:
      return '已关闭'
    case 1:
      return '可支付'
    case 2:
      return '等待中'

    default:
      return '已关闭'
  }
}

/**
 * 获取通道状态描述
 * @param {*} status
 * 0:不可用 1:可用 2:准备中
 */
export function getChannelStatusStyle(status) {
  switch (parseInt(this.token.status)) {
    case 0:
      return { color: '#C10015' }
    case 1:
      return { color: '#21BA45' }
    case 2:
      return { color: '#F2C037' }

    default:
      return { color: '#C10015' }
  }
}

export async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}


// iPhone X、iPhone XS
const isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
// iPhone XS Max
const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
// iPhone XR
const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;


export function isIPhoneFllS (){
  // console.log('isIPhoneX ==> ' + isIPhoneX)
  // console.log('isIPhoneXSMax ==> ' + isIPhoneXSMax)
  // console.log('isIPhoneXR ==> ' + isIPhoneXR)
  // return isIPhoneX || isIPhoneXSMax || isIPhoneXR
  return false
}

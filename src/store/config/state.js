export default {
  ethPNAddress: '0x3edc24F911151aC605340170aC961154F1F8d833',
  appRpcUrl: 'http://39.106.71.164:1337',
  appPNAddress: '0x8306AA644fa900f901f7494b163C865ECe4c4e65',
  isInitL2: false,
  loading: false,
  duration: 1500,
  // baseURL: 'http://a1.litex.fun:7777',
  baseURL: 'http://192.168.51.73:7777',
  timeout: 5000,
  categorys: [],
  telegramURL: '',
  selected: 0,
  price: 0,
  // 钱包余额  通道余额
  tokens: [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimal: 18,
      float: 4,
      icon: 'statics/tokens/eth.svg',
      channelBalance: '0',
      status: 0,
      balance: '0',
      type: 0
    },
    {
      address: '0x9ac78c85A0d3a86a8BE1e08Bea6Ef2EE1687bE18',
      symbol: 'USDT',
      decimal: 18,
      float: 2,
      icon: 'statics/tokens/usdt.svg',
      channelBalance: '0',
      status: 0,
      balance: '0',
      type: 0
    },
    {
      address: '0x3052c3104c32e666666fbef3a5ead4603747ea83',
      symbol: 'LXT',
      decimal: 18,
      float: 0,
      icon: 'statics/tokens/lxt.png',
      channelBalance: '0',
      status: 0,
      balance: '0',
      type: 0
    }
  ],

  menuList: [
    {
      key: 'shop',
      label: '商城'
    },
    {
      key: 'funds',
      label: '资金记录'
    },
    {
      key: 'orders',
      label: '订单列表'
    },
    {
      key: 'introduction',
      label: '说明'
    },
    {
      key: 'contactUS',
      label: '联系我们'
    }
  ]

}

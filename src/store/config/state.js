export default {
  ethPNAddress: '0xcc7d77DEF5cace6d57058286FDaeA27bC084baB4',
  appRpcUrl: 'http://39.106.71.164:1337',
  appPNAddress: '0xcDab9A75Faf7c9c1619521965fd535680182715b',
  isInitL2: false,
  loading: false,
  duration: 1500,
  // baseURL: 'http://a1.litex.fun:7777',
  baseURL: 'http://a1.litex.fun:7001',
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
      type: 1
    },
    {
      address: '0x801217Bc9ac5ef2fA1669bc4B0B82cb9263bD883',
      symbol: 'USDT',
      decimal: 6,
      float: 2,
      icon: 'statics/tokens/usdt.svg',
      channelBalance: '0',
      status: 0,
      balance: '0',
      type: 2
    },
    {
      address: '0x641f543E76cD0Dfe81717d91Ab532831468FA3CE',
      symbol: 'LXT',
      decimal: 18,
      float: 0,
      icon: 'statics/tokens/lxt.png',
      channelBalance: '0',
      status: 0,
      balance: '0',
      type: 3
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

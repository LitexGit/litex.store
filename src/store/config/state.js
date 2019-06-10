export default {
  loading: false,
  duration: 1500,
  // baseURL: 'http://a1.litex.fun:7777',
  baseURL: 'http://192.168.51.73:7001',
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
      channelBalance: '23000000000000000',
      status: '可用',
      enable: true,
      balance: '12300000000000000',
      type: 0
    },
    {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbol: 'USDT',
      decimal: 5,
      float: 2,
      icon: 'statics/tokens/usdt.svg',
      channelBalance: '56000',
      status: '准备中',
      enable: false,
      balance: '456000',
      type: 0
    },
    {
      address: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
      symbol: 'LXT',
      decimal: 12,
      float: 0,
      icon: 'statics/tokens/lxt.png',
      channelBalance: '89000000000000000',
      status: '不可用',
      enable: true,
      balance: '7890000000000',
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

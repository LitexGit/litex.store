export default {
  // ethPNAddress: '0xcc7d77DEF5cace6d57058286FDaeA27bC084baB4',
  // appRpcUrl: 'https://cita.milewan.com:9191',
  // appPNAddress: '0xcDab9A75Faf7c9c1619521965fd535680182715b',

  ethPNAddress: '0x11d0B2243739656F54C0277Ed0EEcDe46658a537',
  appPNAddress: '0x52a709ed5bC0fb7479E6Ca410371b85aDe079E2A',
  appRpcUrl: 'https://cita.milewan.com:9191',

  account: undefined,
  // socketURL: 'https://api.litex.store',
  socketURL: 'https://storeapi.bykernel.com',
  isInitL2: false,
  loading: false,
  duration: 1500,
  // baseURL: 'https://api.litex.store',
  baseURL: 'https://storeapi.bykernel.com',
  // baseURL: 'http://192.168.51.73:7777',
  timeout: 5000,
  categorys: [],
  telegramURL: '',
  selected: 0,
  price: 0,
  // 钱包余额  通道余额
  tokens: [{
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
    // address: '0x801217Bc9ac5ef2fA1669bc4B0B82cb9263bD883',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
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
    // address: '0x641f543E76cD0Dfe81717d91Ab532831468FA3CE',
    address: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
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

  menuList: [{
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
  ],
  showDepositDialog: false,
  showSelectDropdown: false

}

// ethPNAddress: "0x51dabc47e4f17f24b4d3504471c901deb5c45226",
// appPNAddress: "0x52a709ed5bC0fb7479E6Ca410371b85aDe079E2A",
// appOperatorAddress: "0xc363e7018C6811Cce5123A4511D347874109609F",
// ethRpcUrl: "http://39.96.9.247:8545",//正式网
// appRpcUrl: "http://39.106.71.164:1337"

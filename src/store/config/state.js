export default {
  duration: 1500,

  baseUrl: '',
  telegramUrl: '',
  categorys: [],

  /** *********DIY*************/

  tokens: [
    {
      index: 0,
      contract: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimal: 18,
      icon: 'statics/tokens/eth.svg',
      balance: 1.2345,
      status: '可用',
      enable: true
    },
    {
      index: 1,
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbol: 'USDT',
      decimal: 5,
      icon: 'statics/tokens/usdt.svg',
      balance: 0,
      status: '准备中',
      enable: false
    },
    {
      index: 2,
      contract: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
      symbol: 'LXT',
      decimal: 12,
      icon: 'statics/tokens/lxt.png',
      balance: 0,
      status: '不可用',
      enable: true
    }
  ],
  selected: 0,
  price: 0,

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
  ],
  telegramGroup: 'https://t.me/joinchat/IyBmRhSSMJYw8FBQ3tpK4Q'
}

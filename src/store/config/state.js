export default {
  duration: 1500,

  baseUrl: '',
  telegramUrl: '',
  categorys: [],

  /** *********DIY*************/

  // 钱包余额  通道余额
  tokens: [
    {
      index: 0,
      contract: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      decimal: 18,
      icon: 'statics/tokens/eth.svg',
      channelBalance: '2300000000000000',
      status: '可用',
      enable: true,
      balance: '12300000000000000'
    },
    {
      index: 1,
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbol: 'USDT',
      decimal: 5,
      icon: 'statics/tokens/usdt.svg',
      channelBalance: '56000',
      status: '准备中',
      enable: false,
      balance: '456000'
    },
    {
      index: 2,
      contract: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
      symbol: 'LXT',
      decimal: 12,
      icon: 'statics/tokens/lxt.png',
      channelBalance: '890000000000',
      status: '不可用',
      enable: true,
      balance: '7890000000000'
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

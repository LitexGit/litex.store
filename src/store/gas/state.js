export default {
  loading: false,
  disable: true,
  skus: [],
  selectedGoods: {},
  cards: [],
  selectedCard: null,
  cardTypes: [
    {
      value: 1,
      label: '中国石油',
      img: '../statics/gas/zgsy.jpg'
    },
    {
      value: 2,
      label: '中国石化',
      img: '../statics/gas/zgsh.jpg'
    }
  ],
  records: [
    {
      stamp: new Date().getTime(),
      orderInfo: {
        ordered: '订单号00000000',
        orderDes: '加油卡充值',
        accountNum: '13611054880'
      },
      token: {
        symbol: 'ETH',
        decimal: 18,
        amount: 100000000000000000
      },
      status: 1
    },
    {
      stamp: new Date().getTime() + 1000,
      orderInfo: {
        ordered: '订单号1111111111',
        orderDes: '加油卡充值',
        accountNum: '13611054880'
      },
      token: {
        symbol: 'ETH',
        decimal: 18,
        amount: 100000000000000000
      },
      status: 2
    },
    {
      stamp: new Date().getTime() + 2000,
      orderInfo: {
        ordered: '订单号22222222222',
        orderDes: '加油卡充值',
        accountNum: '13611054880'
      },
      token: {
        symbol: 'ETH',
        decimal: 18,
        amount: 100000000000000000
      },
      status: 0
    }
  ]
}

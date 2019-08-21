export default {
  loading: false,
  remind: '请输入手机号',
  info: {
    phone: null
    // phone: '18516804325'
  },
  disable: true,
  skus: [],
  selectGoods: {
    goodsId: null,
    productId: null
  },
  records: [
    {
      stamp: new Date().getTime(),
      orderInfo: {
        ordered: '订单号00000000',
        orderDes: '话费充值',
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
        orderDes: '话费充值',
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
        orderDes: '话费充值',
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

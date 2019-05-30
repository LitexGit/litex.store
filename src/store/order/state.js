export default {
  isShowConfirmPay: false,

  orders: [
    {
      index: 0,
      date: new Date(),
      commodity: '优酷月卡',
      reveiverAccount: '',
      flat: -100,
      token: -50,
      tokenType: 'ETH',
      state: 0
    },
    {
      index: 1,
      date: new Date(),
      commodity: '话费充值',
      reveiverAccount: '',
      flat: -100,
      token: -50,
      tokenType: 'USDT',
      state: 2
    },
    {
      index: 2,
      date: new Date(),
      commodity: '流量充值',
      reveiverAccount: '',
      flat: -100,
      token: -50,
      tokenType: 'LXT',
      state: 3
    }
  ],
  current: {},
  placing: false
}

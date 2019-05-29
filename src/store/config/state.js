export default {
  baseUrl: '',
  telegramUrl: '',
  categorys: [],

  /** *********Modal*************/

  isShowConfirmPay: false,

  isShowDRemindModel: false,
  isShowPreDpositModel: false,
  isShowDERC20Model: false,
  isShowDpositModel: false,

  isShowWithdrawModel: false,
  isShowWRemindModel: false,

  /** *********DIY*************/

  tokens: [
    {
      index: 0,
      contract: null,
      symbol: 'eth',
      icon: 'statics/tokens/eth.svg',
      balance: 1.2345,
      status: '可用',
      enable: true
    }, {
      index: 1,
      contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbol: 'usdt',
      icon: 'statics/tokens/usdt.svg',
      balance: 0,
      status: '准备中',
      enable: false
    }, {
      index: 2,
      contract: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835',
      symbol: 'lxt',
      icon: 'statics/tokens/lxt.png',
      balance: 0,
      status: '不可用',
      enable: true
    }
  ],
  selected: 0,
  price: 0
}

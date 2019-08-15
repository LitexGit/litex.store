export default {
  city: {
    id: 0,
    name: '北京市'
  },
  cities: [
    {
      id: 0,
      name: '北京市'
    }
  ],
  companies: [
    {
      id: 0,
      name: '国网北京市电力公司'
    },
    {
      id: 1,
      name: '国网天津市电力公司'
    }
  ],
  type: 2,
  company: {
    id: 1,
    name: '国网天津市电力公司'
  },
  accountNumber: undefined,
  accounts: [
    {
      id: 1,
      type: 2,
      number: 1234567890,
      name: '*01室',
      companyId: 0,
      companyName: '国网天津市电力公司',
      city: '北京市'
    }
  ],
  bill: {
    accountUserName: '张昭亮', // 客户姓名
    accountNo: 123456789, // 账号
    month: 7, // 账单月
    customerAddress: '北京市昌平区***单元401室', // 地址
    payAmount: 200, // 应缴金额
    penalty: 0, // 滞纳金
    balance: 0, // 余额
    billCycle: '1231564', // 返回的账单(供下单充值)
    beginDate: '12313213123132', // 起始日期
    endDate: '12313213123132', // 截止日期
    contractNo: '12313213123132', // 合同号
    message: '12313213123132', // 返回信息说明：1.查询数据正常返回：“查询成功”2.查询完成，未获取账户信息：如“已缴费成功/超过受理期”3.查询异常：“未查询到用户信息”
    status: 1, // 查询结果状态1.成功0.失败
    channel: 0 // 查询标识（无意义,无需关注）
  },
  // accounts: [],
  paymentItems: [
    {
      type: 2
    },
    {
      type: 1
    },
    {
      type: 3
    }
  ]
}

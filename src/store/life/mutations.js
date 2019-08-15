export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function updateAccounts (state, payload) {
  const { accounts } = payload
  state.accounts = []
  if (accounts && accounts.length > 0) {
    accounts.forEach(ele => {
      const account = {
        id: ele.id,
        type: ele.type,
        number: ele.householdId,
        name: ele.householdName,
        companyId: ele.itemId,
        companyName: ele.name,
        cityName: ele.city
      }
      state.accounts.push(account)
    })
  }
}

export function updateAccount (state, payload) {
  const { accountId } = payload
  const accounts = state.accounts
  if (accounts && accounts.length > 0) {
    accounts.forEach(ele => {
      if (ele.id === Number(accountId)) {
        state.account = ele
      }
    })
  }
}

export function updateCompanies (state, payload) {
  const { companies } = payload
  state.companies = []
  if (companies && companies.length > 0) {
    companies.array.forEach(ele => {
      const company = {
        id: ele.itemId,
        name: ele.name
      }
      state.companies.push(company)
    })
  }
}

export function updateAccountBill (state, payload) {
  const { bills } = payload
  // state.bills = []
  if (bills && bills.length > 0) {
    const ele = bills[0]
    state.bill = {
      accountUserName: ele.customerName, // 客户姓名
      accountNo: ele.accountNo, // 账号
      month: ele.month, // 账单月
      customerAddress: ele.customerAddress, // 地址
      payAmount: ele.payAmount, // 应缴金额
      penalty: ele.penalty, // 滞纳金
      balance: ele.balance, // 余额
      billCycle: ele.billCycle, // 返回的账单(供下单充值)
      beginDate: ele.beginDate, // 起始日期
      endDate: ele.endDate, // 截止日期
      contractNo: ele.contractNo, // 合同号
      message: ele.message, // 返回信息说明：1.查询数据正常返回：“查询成功”2.查询完成，未获取账户信息：如“已缴费成功/超过受理期”3.查询异常：“未查询到用户信息”
      status: ele.status, // 查询结果状态1.成功0.失败
      channel: ele.channel // 查询标识（无意义,无需关注）
    }
    // bills.array.forEach(ele => {
    //   const bill = {
    //     accountUserName: ele.customerName, // 客户姓名
    //     accountNo: ele.accountNo, // 账号
    //     month: ele.month, // 账单月
    //     customerAddress: ele.customerAddress, // 地址
    //     payAmount: ele.payAmount, // 应缴金额
    //     penalty: ele.penalty, // 滞纳金
    //     balance: ele.balance, // 余额
    //     billCycle: ele.billCycle, // 返回的账单(供下单充值)
    //     beginDate: ele.beginDate, // 起始日期
    //     endDate: ele.endDate, // 截止日期
    //     contractNo: ele.contractNo, // 合同号
    //     message: ele.message, // 返回信息说明：1.查询数据正常返回：“查询成功”2.查询完成，未获取账户信息：如“已缴费成功/超过受理期”3.查询异常：“未查询到用户信息”
    //     status: ele.status, // 查询结果状态1.成功0.失败
    //     channel: ele.channel // 查询标识（无意义,无需关注）
    //   }
    //   state.bills.push(bill)
    // })
  }
}

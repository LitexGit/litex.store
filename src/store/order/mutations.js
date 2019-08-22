import { Notify, Loading } from 'quasar'

export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
    Loading.hide()
  })
}

export function updateShowConfirmPay (state, { open }) {
  state.isShowConfirmPay = open
}

export function updateOrderRecords (state, records) {
  state.orders = records
}

export function updateLoading (state, loading) {
  state.loading = loading
}

export function updateOrderStatus (state, { status }) {
  Object.assign(state.current, { status })
}

export function updateShowOrderDModel (state, { open }) {
  state.isShowOrderDModel = open
}

export function depositRes (state, payload) {
  console.log('==================payload==================')
  console.log(payload)
  console.log('==================payload==================')
  // productType 1 话费充值   2流量充值
  // status      0订单未支付  1支付成功 2发货中 3 购买成功  4购买失败
  const { productType, status, order: { desc } } = JSON.parse(payload)
  if (parseInt(status) !== 3) return
  let msg = ''
  switch (parseInt(productType)) {
    case 1:
      msg = '话费充值:'
      break
    case 2:
      msg = '流量充值:'
      break
    case 3:
      msg = '加油卡充值:'
      break
    case 4:
      msg = 'Vip充值:'
      break
    case 5:
      msg = '水电煤缴费:'
      break

    default:
      msg = 'msg:'
      break
  }
  const message = msg + desc + '已到账,请注意查收...'
  Notify.create({ message, position: 'top', color: 'positive', timeout: 2500 })
}

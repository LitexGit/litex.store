import { Loading } from 'quasar'

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

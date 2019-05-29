
export function loading (state, loading) {
  state.loading = loading
}

export function updateSelected (state, { index }) {
  state.selected = index
}

export function updatePrice (state, { price }) {
  price < 0 && (price = 0)
  state.price = price
}

export function updateShowConfirmPay (state, { open }) {
  state.isShowConfirmPay = open
}

export function updateShowDRemindModel (state, { open }) {
  state.isShowDRemindModel = open
}

export function updateShowPreDpositModel (state, { open }) {
  state.isShowPreDpositModel = open
}

export function updateShowDpositModel (state, { open }) {
  state.isShowDpositModel = open
}

export function updateShowWithdrawModel (state, { open }) {
  state.isShowWithdrawModel = open
}

export function updateShowWRemindModel (state, { open }) {
  state.isShowWRemindModel = open
}

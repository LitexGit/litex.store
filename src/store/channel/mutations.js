import { formattedInput } from '../../utils/helper'

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

export function updateShowDERC20Model (state, { open }) {
  state.isShowDERC20Model = open
}

export function updateAllowance (state, { allowance }) {
  state.allowance = allowance
}

export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function updateDepInput (state, { depInput }) {
  const input = formattedInput(depInput)
  state.depInput = input
}

export function updateAuthInput (state, { authInput }) {
  const input = formattedInput(authInput)
  state.authInput = input
}

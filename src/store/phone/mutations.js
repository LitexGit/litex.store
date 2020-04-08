import { isPoneAvailable } from '../../utils/helper'

export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function loading (state, loading) {
  state.loading = loading
}

export function updatePhoneRemind (state, { phone }) {
  let remind = '请输入手机号'
  const isSvailable = isPoneAvailable(phone)
  if (!isSvailable) {
    remind = '请输入正确的手机号'
  } else {
    remind = '请充值'
  }
  if (!phone) phone = ''
  if (!phone.length) {
    remind = '请输入手机号'
  }
  state.remind = remind
}

export function updateSelectedSku (state, selected) {
  state.selected = selected
}

export function updateRecords (state, { records }) {
  records.sort((record1, record2) => {
    return record2.stamp - record1.stamp
  })
  state.records = records
}

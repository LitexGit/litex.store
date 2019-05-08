import api from '../../service/api'

export async function placeOrder ({ commit }, data) {
  const order = await api.newOrder(data)
  commit('update', { placing: true })
  commit('update', { current: order })
}

export async function updateOrder ({ commit }, { id, txhash }) {
  const order = await api.updateOrder(id, { status: 2, txhash })
  console.log(`order ${id} paid:`, order)
  commit('update', { placing: false })
  commit('update', { current: order })
}

export async function confirmPayment ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 4 })

  if (order.status === 4) {
    console.log(`order ${id} confirmed:`, order)
    commit('update', { current: order })
  }
}

export async function cancelOrder ({ commit }, { id }) {
  const order = await api.updateOrder(id, { status: 0 })
  if (order.status === 0) {
    console.log(`order ${id} cancelled:`)
    commit('update', { placing: false })
    commit('update', { current: {} })
  }
}

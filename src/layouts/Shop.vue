<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          <span>LITE<b>X</b> Store</span>
        </q-toolbar-title>
        <q-btn flat icon="list" to="/orders" />
      </q-toolbar>
      <OrderStatusBar :status="currentOrder.status" pay="pay()" cancel="cancelOrder()" refresh="" />
      <q-tabs>
        <q-route-tab name="phone" to="phone" exact label="话费流量" />
        <q-route-tab name="gas" to="gas" exact label="加油卡" />
        <q-route-tab name="vip" to="vip" exact label="VIP会员" />
      </q-tabs>
    </q-header>
    <q-footer>
      <q-toolbar class="bg-secondary text-white row">
        <q-toolbar-title class="col-6">
          <small> 金额：</small>
          <small :class="[loading ? 'text-grey' : 'text-amber']"> {{ loading ? '加载中..' : finalPrice }} </small>
        </q-toolbar-title>
        <q-separator dark vertical inset />
        <q-btn-dropdown class="col" flat :label="supportedPnList[selected].symbol || '选择币种'">
          <q-list separator>
            <!-- <q-item-label header>当前可用</q-item-label> -->
            <q-item v-for="(pn, index) in supportedPnList" :key="index" clickable v-close-popup :active="index === selected" @click="selectPn(index)">
              <q-item-section avatar>
                <q-avatar :icon="`img:${pn.icon}`" />
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ pn.symbol.toUpperCase() }} </q-item-label>
                <q-item-label caption>{{ pn.balance }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ pn.status }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn class="col-3 q-pa-sm" label="支付" color="purple" @click="placeOrder()" />
      </q-toolbar>
    </q-footer>
    <q-dialog v-model="placingOrder" persistent>
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>订单详情</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-transparent q-pa-sm text-white">
          <q-btn stretch color="secondary" class="full-width" label="支付" @click="pay()" />
          <q-separator spaced />
          <q-btn stretch color="red" class="full-width" label="取消" @click="cancelOrder()" />
        </q-footer>
        <q-page-container>
          <q-page padding>
            <p>{{ cates[sku.cate] + ' ' + sku.label }}</p>
            <p>{{ '手机号：' + info.phone }}</p>
            <p>{{ '价值：' + sku.value }}元</p>
            <p>{{ finalPrice + ' ' + supportedPnList[selected].symbol}}</p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Web3 from 'web3'
import OrderStatusBar from '../components/OrderStatusBar.vue'

export default {
  name: 'MyLayout',
  components: {
    OrderStatusBar
  },
  data () {
    return {
      user: ''
    }
  },
  computed: {
    ...mapState('pn', {
      supportedPnList: 'supported',
      selected: 'selected',
      price: 'price',
      loading: 'loading'
    }),
    ...mapState('sku', {
      skuId: 'selected',
      cates: 'cates',
      info: 'info'
    }),
    ...mapState('order', {
      orders: 'orders',
      currentOrder: 'current'
    }),
    placingOrder: {
      get () {
        return this.$store.state.order.placing
      },
      set (val) {
        this.$store.commit('order/update', { placing: val })
      }
    },
    ...mapGetters('sku', [
      'getSkuById'
    ]),
    sku: function () {
      return this.getSkuById(this.skuId) || {}
    },
    finalPrice: function () {
      let { sku, price } = this
      if (sku) {
        return (sku.value / price).toFixed(4)
      }
      return 0
    }
  },
  methods: {
    selectPn: function (which) {
      const { commit, dispatch } = this.$store
      commit('pn/updateSelected', which)
      dispatch('pn/updatePrice', this.supportedPnList[which].symbol)
    },
    placeOrder: function () {
      const { dispatch } = this.$store
      const { user, info, selected, supportedPnList, sku } = this
      const pn = supportedPnList[selected].symbol
      dispatch('order/placeOrder', { user, info, pn, sku: sku.id })
      this.$q.loading.show()
    },
    cancelOrder: function () {
      const { id } = this.currentOrder
      this.$store.dispatch('order/cancelOrder', { id })
    },
    pay: async function () {
      const { dispatch } = this.$store
      if (!window.web3) {
        alert('Web3 not ready')
      } else {
        const { currentOrder: { id, from, to, amount } } = this
        const { toWei, toHex } = window.web3.utils

        let tx = {
          to,
          data: toHex(`orderId: ${id}`)
        }

        const gas = await web3.eth.estimateGas(tx)

        tx = {
          from,
          ...tx,
          value: toWei(amount),
          gas
        }

        web3.eth.sendTransaction(tx).on('transactionHash', function (txhash) {
          console.log('HX: ', txhash)
          dispatch('order/updateOrder', { id, txhash })
        }).on('receipt', function (receipt) {
          console.log('RP: ', receipt)
        }).on('confirmation', function (confirmationNumber, receipt) {
          console.log('CF: ', confirmationNumber)
          confirmationNumber === 1 && dispatch('order/confirmPayment', { id })
        }).on('error', console.error) // If a out of gas error, the second parameter is the receipt.
      }
    },
    refreshOrder: function () {},
    orderDetail: function () {}
  },
  mounted: async function () {
    this.selectPn(0)

    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        this.user = ethereum.selectedAddress
        console.log('USER:\n', this.user)
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */});
      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) { // Legacy dapp browsers...
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      // web3.eth.sendTransaction({/* ... */});
    } else { // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
}
</script>

<style>
</style>

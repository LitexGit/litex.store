<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn round flat disable @click="goback"/>
        <q-toolbar-title class="row justify-center">
          <span>LITE<b>X</b> Store</span>
        </q-toolbar-title>
        <MenuBtn></MenuBtn>
      </q-toolbar>
      <!-- currentOrder.status -->
      <OrderStatusBar :status="null" pay="pay()" cancel="cancelOrder()" refresh="" />
      <q-tabs>
        <!-- @select="clickTab(category)" -->
        <q-route-tab v-for="(category, index) in categorys" :key="index" exact
           :name="getRouter(category.categoryId)" :to="getRouter(category.categoryId)" :label="category.categoryDes" />
      </q-tabs>
    </q-header>
    <q-footer>
      <q-toolbar class="bg-secondary text-white row">
        <q-toolbar-title class="col-6">
          <small> 金额：</small>
          <!-- finalPrice -->
          <small :class="[loading ? 'text-grey' : 'text-amber']"> {{ loading ? '加载中..' :  price}} </small>
        </q-toolbar-title>
        <q-separator dark vertical inset />

        <q-btn-dropdown class="col" flat :label="tokens[selected].symbol || '选择币种'">
          <q-list separator>
            <q-item class="q-pa-none" v-for="(token, index) in tokens" :clickable="token.enable" v-close-popup
              :key="index"  :active="index === selected"
              @click="selectToken(index)">
              <token-item :key="index" :token = "token" @deposit="deposit(token)" @withdraw="withdraw(token)"/>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator dark vertical inset />
        <q-btn flat class="col-3 q-pa-sm" label="支付" color="white" @click="placeOrder()" />
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <confirm-pay-model/>
    <d-remind-model/>
    <pre-dposit-model/>
    <dposit-model/>
    <withdraw-model/>
    <w-remind-model/>
    <deposit-token-model/>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import OrderStatusBar from '../components/OrderStatusBar.vue'
import { TokenItem } from '../components/item'
import { ConfirmPayModel, DRemindModel, PreDpositModel, DpositModel, WithdrawModel, WRemindModel, DepositTokenModel } from '../components/modal'
import MenuBtn from '../components/menu/MenuBtn'
import { getAccount, getNetwork, getRouter } from '../utils/helper'
import { Preferences, PrefKeys } from '../utils/preferences'

export default {
  name: 'MyLayout',
  components: {
    OrderStatusBar, MenuBtn, TokenItem, ConfirmPayModel, DRemindModel, PreDpositModel, DpositModel, WithdrawModel, WRemindModel, DepositTokenModel
  },
  data () {
    return {
      user: '',
      isShowTokens: false
    }
  },
  computed: {
    ...mapState('config', {
      duration: 'duration',
      tokens: 'tokens',
      selected: 'selected',
      categorys: 'categorys'
    }),
    ...mapState('sku', {
      info: 'info',
      selectGoods: 'selectGoods'
    }),
    ...mapState('pn', {
      loading: 'loading',
      price: 'price'
    }),
    phone: function () {
      return this.info.phone
    }
  },
  methods: {
    getRouter,
    getAccount,
    getNetwork,
    // clickTab: function (category) {
    //   console.log('==========clickTab==========================')
    //   console.log(category)
    //   console.log('==========clickTab==========================')
    // },
    isCanPress: function () {
      const { productId, goodsId } = this.selectGoods
      if (!productId || !goodsId) {
        return false
      }
      return true
    },
    goback: function () {
      this.$router.go(-1)
    },
    selectToken: function (index) {
      const { commit, dispatch } = this.$store
      commit('config/updateSelected', { index })
      dispatch('pn/updatePrice')
    },

    placeOrder: function () {
      if (!this.isCanPress()) {
        this.$q.notify({ message: '请先选择下单商品', position: 'top', type: 'negative', timeout: this.duration })
        return
      }
      console.log('==============【下单】======================')
      this.$store.dispatch('order/placeOrder', { phone: this.phone })
    },
    pay: async function () {
      console.log('=============【layer1 支付】=======================')
    },
    deposit: function (token) {
      console.log('=============【deposit】=======================')
      // 01: 同步钱包余额
      const { address, symbol } = token
      this.$store.dispatch('channel/preDeposit', { address, symbol })
    },
    withdraw: function (token) {
      console.log('=============【withdraw】=======================')
      const { address, symbol } = token
      this.$store.dispatch('channel/preWithdraw', { address, symbol })
    }
  },
  created: function () {
    window.addEventListener('load', async () => {
      const account = await this.getAccount()
      Preferences.setItem(PrefKeys.USER_ACCOUNT, account)
      console.log('=================getAccount===================')
      console.log(account)
      console.log('=================getAccount===================')
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('=============【切换 账号】=======================')
        window.location.reload(true)
      })
      window.ethereum.on('networkChanged', function (netId) {
        console.log('=============【切换 netId】=======================')
      })
    })
    this.$store.dispatch('config/getConfigs')
    this.$store.dispatch('config/getRates')
  },
  mounted: async function () {
    this.selectToken(0)
  }
}
</script>

<style>
</style>

<q-dialog v-model="placingOrder" position='bottom'>
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

placingOrder: {
  get () {
    return this.$store.state.order.placing
  },
  set (val) {
    this.$store.commit('order/update', { placing: val })
  }
},
...mapState('pn', {
  supportedPnList: 'supported',
  // selected: 'selected',
  // price: 'price',
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

refreshOrder: function () {},
orderDetail: function () {}

layer1支付

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
}

cancelOrder: function () {
  const { id } = this.currentOrder
  this.$store.dispatch('order/cancelOrder', { id })
},

// 下单接口
placeOrder: function () {
  /**
    * 01: token
    * 02: goods
    * 03: api
    * */
  const { dispatch } = this.$store
  const { user, info, selected, supportedPnList, sku } = this
  const pn = supportedPnList[selected].symbol
  dispatch('order/placeOrder', { user, info, pn, sku: sku.id })
  this.$q.loading.show()
},

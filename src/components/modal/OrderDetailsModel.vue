<template>
  <q-dialog v-model="isShowOrderDModel"
    @hide="hide()" @cancel="clickCancel()">
    <div class="container">
      <div class="bg-primary q-pa-sm">
        <q-btn class="absolute-top-left" color="white" round outline flat size="md" icon="close" @click="clickClose()"/>
          <center>
            <span class="text-subtitle1 text-white">支付成功</span>
          </center>
      </div>
      <div class="q-pa-md bg-white">
        <center class="text-subtitle1">
          <span>{{amount}}</span>&nbsp;<span>{{symbol}}</span>
        </center>
        <div class="q-py-md q-px-md text-body2">
          <span>订单信息：<span>{{orderinfo.accountNum}}</span></span> <br/>
          <span>话费充值：￥<span>{{fiat}}</span></span> <br/>
          <span>付款方式：</span><span>{{symbol}}</span>
        </div>
        <center>
          <q-btn class="q-px-xl" color="primary" label="确认" @click="clickConfirm()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import { toDecimal, mathCeil } from '../../utils/helper'

export default {
  name: 'OrderDetailsModel',
  data () {
    return {}
  },
  computed: {
    ...mapState('order', {
      current: 'current'
    }),
    ...mapState('config', {
      tokens: 'tokens'
    }),
    isShowOrderDModel: {
      get () {
        return this.$store.state.order.isShowOrderDModel
      },
      set (open) {
        this.$store.commit('order/updateShowOrderDModel', { open })
      }
    },
    amount: function () {
      let amount = this.orderinfo.amount || '0'
      const decimal = this.getSelectedToken().decimal
      const float = this.getSelectedToken().float
      amount = toDecimal({ amount, decimal })
      return mathCeil({ decimal: amount, float })
    },
    orderinfo: function () {
      return this.current.orderinfo || {}
    },
    symbol: function () {
      const { tokenType } = this.orderinfo
      for (const { type, symbol } of this.tokens) {
        if (type === tokenType) {
          return symbol
        }
      }
      return this.getSelectedToken().symbol.toUpperCase()
    },

    fiat: function () {
      let fiat = this.orderinfo.fiatAmount / 100
      return fiat.toFixed(2)
    }
  },
  methods: {
    toDecimal,
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    clickConfirm: function () {
      console.log('=============【确认支付】=======================')
      this.$store.commit('order/updateShowOrderDModel', { open: false })
    },
    hide: function () {
      this.$store.commit('order/updateShowOrderDModel', { open: false })
      const info = { phone: null }
      const selectGoods = { goodsId: null, productId: null }
      this.$store.commit('sku/update', { info, selectGoods, remind: '请输入手机号' })
      this.$store.dispatch('pn/updatePrice')
    },
    clickClose: function () {
      this.$store.commit('order/updateShowOrderDModel', { open: false })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
</style>

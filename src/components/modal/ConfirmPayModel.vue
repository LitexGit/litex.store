<template>
  <q-dialog v-model="isShowConfirmPay" position='bottom'
    @hide="clickClose()" @cancel="clickCancel()">
    <div class="container">
      <div class="bg-primary q-pa-sm">
        <q-btn class="absolute-top-left" color="white" round outline flat size="md" icon="close" @click="clickClose()"/>
          <center>
            <span class="text-subtitle1 text-white">确认支付</span>
          </center>
      </div>
      <div class="q-pa-md bg-white">
        <center class="text-subtitle1">
          <span>11.1111</span>&nbsp;<span>{{symbol}}</span>
        </center>
        <div class="q-py-md q-px-md text-body2">
          <span>订单信息：<span>{{orderinfo.accountNum}}</span></span> <br/>
          <span>话费充值：￥<span>{{fiat}}</span></span> <br/>
          <span>付款方式：</span><span>{{symbol}}</span>
        </div>
        <center>
          <q-btn class="q-px-xl" color="primary" label="支付" @click="clickConfirm()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ConfirmPayModel',
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
    isShowConfirmPay: {
      get () {
        return this.$store.state.order.isShowConfirmPay
      },
      set (open) {
        this.$store.commit('order/updateShowConfirmPay', { open })
      }
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
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    clickConfirm: function () {
      console.log('=============【确认支付】=======================')
      this.$store.commit('order/updateShowConfirmPay', { open: false })
      // 订单支付超时
      this.$store.dispatch('channel/transfer', { })
    },
    clickClose: function () {
      this.$store.commit('order/updateShowConfirmPay', { open: false })
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
</style>

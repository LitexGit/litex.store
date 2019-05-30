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
          <span>订单信息：18516804325</span> <br/>
          <span>话费充值：￥100.00</span> <br/>
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

import { mapGetters } from 'vuex'

export default {
  name: 'ConfirmPayModel',
  data () {
    return {}
  },
  computed: {
    isShowConfirmPay: {
      get () {
        return this.$store.state.order.isShowConfirmPay
      },
      set (open) {
        this.$store.commit('order/updateShowConfirmPay', { open })
      }
    },
    symbol: function () {
      return this.getSelectedToken().symbol.toUpperCase()
    }
  },
  methods: {
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    clickConfirm: function () {
      console.log('=============【确认支付】=======================')
      this.$store.commit('order/updateShowConfirmPay', { open: false })
      this.$store.dispatch('channel/transfer', { })
    },
    clickClose: function () {
      this.$store.commit('order/updateShowConfirmPay', { open: false })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
</style>

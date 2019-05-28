<template>
  <q-dialog v-model="isShowConfirmPay" position='bottom'
    @hide="clickClose()" @cancel="clickCancel()">
    <div class="container">
      <div class="bg-primary q-pa-sm">
        <q-btn class="absolute-top-left" color="white" round outline flat size="1rem" icon="close" @click="clickClose()"/>
          <center>
            <span class="text-h6" text-color="white">确认支付</span>
          </center>
      </div>
      <div class="q-pa-md bg-white">
        <center class="text-subtitle1">11.1111ETH</center>
        <div class="q-py-md q-px-md text-body2">
          <span>订单信息：18516804325</span> <br/>
          <span>话费充值：￥100.00</span> <br/>
          <span>付款方式：ETH</span>
        </div>
        <center>
          <q-btn class="q-px-xl" color="primary" label="支付" @click="clickConfirm()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>

export default {
  name: 'ConfirmPayModel',
  computed: {
    isShowConfirmPay: {
      get () {
        return this.$store.state.config.isShowConfirmPay
      },
      set (open) {
        this.$store.commit('config/updateShowConfirmPay', { open })
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    clickConfirm: function () {
      console.log('=============确认支付=======================')
      this.$store.commit('config/updateShowConfirmPay', { open: false })
    },
    clickClose: function () {
      console.log('=============取消=======================')
      this.$store.commit('config/updateShowConfirmPay', { open: false })
    }
  },
  mounted: function () {
    console.log('============mounted========================')
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
</style>

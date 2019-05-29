<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowWithdrawModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white">
          <span class="text-subtitle1">提现 ETH</span>
        </div>
      </div>
      <div class="bg-white q-pa-xl">

        <center>WithdrawModel</center>

      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'WithdrawModel',
  data () {
    return {}
  },
  methods: {
    clickClose: function () {
      console.log('=============取消=======================')
      this.$store.commit('config/updateShowWithdrawModel', { open: false })
    }
  },
  computed: {
    isShowWithdrawModel: {
      get () {
        return this.$store.state.config.isShowWithdrawModel
      },
      set (open) {
        this.$store.commit('config/updateWithdrawModel', { open })
      }
    }
  }
}
</script>

<style scoped>
.container {
  border:2px solid #2ca6e0;
  width: 80%
}
</style>

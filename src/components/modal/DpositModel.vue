<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDRemindModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white">
          <span class="text-subtitle1">充值ETH</span>
        </div>
      </div>
      <div class="bg-white q-pa-xl">

        <center>DpositModel</center>

      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'DpositModel',
  data () {
    return {}
  },
  methods: {
    clickClose: function () {
      console.log('=============取消=======================')
      this.$store.commit('config/updateShowDpositModel', { open: false })
    }
  },
  computed: {
    isShowDRemindModel: {
      get () {
        return this.$store.state.config.isShowDpositModel
      },
      set (open) {
        this.$store.commit('config/updateShowDpositModel', { open })
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

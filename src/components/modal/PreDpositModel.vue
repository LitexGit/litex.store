<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDRemindModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1 q-pb-lg" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="col-11 q-pr-md text-white">
          <center class="text-subtitle1">充值PKT</center>
          <center class="text-caption">step 1/2 预授权</center>
        </div>
      </div>
      <div class="bg-white q-pa-xl">

        <center>PreDpositModel</center>

      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'PreDpositModel',
  data () {
    return {}
  },
  methods: {
    clickClose: function () {
      console.log('=============取消=======================')
      this.$store.commit('config/updateShowDRemindModel', { open: false })
    }
  },
  computed: {
    isShowDRemindModel: {
      get () {
        return this.$store.state.config.isShowPreDpositModel
      },
      set (open) {
        this.$store.commit('config/updateShowPreDpositModel', { open })
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

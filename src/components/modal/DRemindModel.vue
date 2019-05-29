<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDRemindModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white">
          <span class="text-subtitle1">充值须知</span>
          <img class="q-ml-sm" style="width: 20px" src="../../statics/icons/reminder.png" />
        </div>
      </div>
      <div class="bg-white q-pa-md">
        <div class="text-caption text-weight-light">
          <span>ERC20 token的充值需要2步：</span><br/>
          1.<span>授权想要充值的token金额。</span><br/>
          2.<span>充值授权金额的token</span><br/>
          <span>以上两步分别需要一次签名过程</span>
        </div>
        <center class="q-mt-md">
          <q-btn class="q-px-xl" dense color="primary" label="OK, 了解" @click="clickContinue()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'DRemindModel',
  data () {
    return {}
  },
  computed: {
    isShowDRemindModel: {
      get () {
        return this.$store.state.config.isShowDRemindModel
      },
      set (open) {
        this.$store.commit('config/updateShowDRemindModel', { open })
      }
    }
  },
  methods: {
    clickClose: function () {
      this.$store.commit('config/updateShowDRemindModel', { open: false })
    },
    clickContinue: function () {
      this.$store.commit('config/updateShowDRemindModel', { open: false })
      this.$store.commit('config/updateShowPreDpositModel', { open: true })
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

<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowWRemindModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white">
          <span class="text-subtitle1">注意</span>
          <img class="q-ml-sm" style="width: 20px" src="../../statics/icons/reminder.png" />
        </div>
      </div>
      <div class="bg-white q-pa-md">
        <div class="text-caption text-weight-light">
          拒绝钱包的确认提现请求会导致取消提现。 此操作会导致游戏暂时锁定1-2分钟。请保持取现过程流畅。
        </div>
        <center class="q-mt-sm">
          <q-btn class="q-px-xl" dense color="primary" label="确认提现" @click="clickConfirm()"/>
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
    isShowWRemindModel: {
      get () {
        return this.$store.state.channel.isShowWRemindModel
      },
      set (open) {
        this.$store.commit('channel/updateShowWRemindModel', { open })
      }
    }
  },
  methods: {
    clickClose: function () {
      this.$store.commit('channel/updateShowWRemindModel', { open: false })
    },
    clickConfirm: function () {
      this.$store.commit('channel/updateShowWRemindModel', { open: false })
      this.$store.dispatch('channel/confirmWithdraw')
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

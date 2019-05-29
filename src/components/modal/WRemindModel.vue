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
      <div class="bg-white q-pa-xl">

        <center>WRemindModel</center>

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
  methods: {
    clickClose: function () {
      console.log('=============取消=======================')
      this.$store.commit('config/updateShowWRemindModel', { open: false })
    }
  },
  computed: {
    isShowWRemindModel: {
      get () {
        return this.$store.state.config.isShowWRemindModel
      },
      set (open) {
        this.$store.commit('config/updateShowWRemindModel', { open })
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

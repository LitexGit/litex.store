<template>
  <div>
    <q-dialog v-model="showDepositDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="money_off"
            color="primary"
            text-color="white"
            size="23px"
          />
          <span class="q-ml-sm">余额不足，请从钱包充值到账户内</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn
            flat
            label="充值"
            color="primary"
            v-close-popup
            @click="toDeposit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DepositDialog',
  data () {
    return {}
  },
  computed: {
    showDepositDialog: {
      set: function (val) {
        this.$store.commit('config/update', { showDepositDialog: val })
      },
      get: function () {
        return this.$store.state.config.showDepositDialog
      }
    }
  },
  methods: {
    toDeposit () {
      this.$store.commit('config/update', { showSelectDropdown: true })
    }
  }
}
</script>

<style>
</style>

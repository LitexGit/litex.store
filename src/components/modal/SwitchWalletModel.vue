<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowSwitchWModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm">
        <center class="text-subtitle1 text-white">选择默认主链</center>
      </div>
      <div class="bg-white q-pa-md">
        <div class="text-caption flex justify-around">
          <q-btn v-for="({label, provider}, index) in chains" :key="index" :color="chain === provider ? 'primary' : 'grey-6'"
          :outline="isSelected" :label="label" @click="selectedChain(provider)">
          </q-btn>
        </div>
        <center class="q-mt-sm">
          <q-btn class="q-px-xl" dense color="primary" label="确认" @click="clickConfirm()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { Preferences, PrefKeys } from '../../utils/preferences'

export default {
  name: 'SwitchWalletModel',
  data () {
    return {
      isSelected: true
    }
  },
  computed: {
    ...mapState('config', {
      chains: 'chains',
      chain: 'chain'
    }),
    isShowSwitchWModel: {
      get () {
        return this.$store.state.config.isShowSwitchWModel
      },
      set (open) {
        this.$store.commit('config/update', { isShowSwitchWModel: open })
      }
    }
  },
  methods: {
    selectedChain: function (provider) {
      this.$store.commit('config/update', { chain: provider })
    },
    clickClose: function () {
      this.$store.commit('config/update', { isShowSwitchWModel: false })
    },
    clickConfirm: function () {
      const cache = Preferences.getItem(PrefKeys.CURRENT_CHAIN)
      Preferences.setItem(PrefKeys.CURRENT_CHAIN, this.chain)
      if (this.chain === 'wanchain') {
        window.provider = window.wan3
      } else {
        window.provider = window.ethereum || window.web3
      }
      this.$store.commit('config/update', { isConfirmChain: true })
      if (cache && cache !== this.chain) {
        window.location.reload(true)
      }
      this.$store.commit('config/update', { isShowSwitchWModel: false })
    }
  },
  mounted: function () {
    const chain = Preferences.getItem(PrefKeys.CURRENT_CHAIN)
    this.$store.commit('config/update', { chain })
  }
}
</script>

<style scoped>
.container {
  border:2px solid #2ca6e0;
  width: 80%
}
</style>

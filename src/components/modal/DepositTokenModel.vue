<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDERC20Model" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1 q-pb-lg" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="col-11 q-pr-md text-white">
          <center class="text-subtitle1">
            <span>充值</span>&nbsp;<span>{{symbol}}</span>
          </center>
          <center class="text-caption">step 2/2 充值</center>
        </div>
      </div>
      <div class="bg-white q-px-md q-pb-md q-pt-sm">
        <div class="q-mt-md text-subtitle1">
          <center class="text-black">充值金额</center>
          <center class="text-primary">{{allowance}}&nbsp;<span class="text-black text-subtitle2">{{symbol}}</span></center>
          <div class="q-mt-md text-caption text-weight-light">
            1.<span>您的充值安全由<span class="text-weight-regular">以太坊状态通道</span>保障，游戏运营方无法操纵用户充值的代币，且您可以随时提现。</span><br/>
            2.<span>抢红包之前请先充值，以保证有相应场次足够的代币。</span><br/>
            3.<span>充值涉及与以太坊的链上交互，请确保有足够的Gas费。成功的操作可以在“资金记录中查看”。</span><br/>
          </div>
          <center class="q-mt-md">
            <q-btn class="q-px-xl" dense color="primary" label="确认充值" @click="clickConfirm()"/>
          </center>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DepositTokenModel',
  data () {
    return {
      input: ''
    }
  },
  computed: {
    ...mapState('channel', [
      'allowance'
    ]),
    isShowDERC20Model: {
      get () {
        return this.$store.state.channel.isShowDERC20Model
      },
      set (open) {
        this.$store.commit('channel/updateShowDERC20Model', { open })
      }
    },
    symbol: function () {
      return this.getSelectedToken().symbol.toUpperCase()
    },
    token: function () {
      return this.getSelectedToken().contract
    }
  },
  methods: {
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    clickClose: function () {
      this.$store.commit('channel/updateShowDERC20Model', { open: false })
    },
    clickConfirm: function () {
      this.$store.commit('channel/updateShowDERC20Model', { open: false })
      this.$store.dispatch('channel/confirmDeposit', { amount: this.allowance, token: this.token })
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

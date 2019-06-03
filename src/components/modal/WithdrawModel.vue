<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowWithdrawModel" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white">
          <span class="text-subtitle1">提现</span>&nbsp;<span>{{symbol}}</span>
        </div>
      </div>
      <div class="bg-white q-pa-md">
        <center>可提现金额</center>
        <center>
          <balance-view class="text-primary text-subtitle1" :symbol="symbol" :decimal="decimal" :amount="balance" :symbolStyle="symbolStyle"/>
        </center>
        <div class="q-mt-sm text-caption text-weight-light">
          1.<span>您提现的代币将直接进入您的数字钱包账户。</span><br/>
          2.<span>您可以随时提现。</span><br/>
          3.<span>提现涉及与以太坊的链上交互，提现金额会扣除Gas费。成功的操作可以在“资金记录中查看”</span>
        </div>
        <center class="q-mt-sm">
          <q-btn class="q-px-xl" dense color="primary" label="全部提现" @click="clickContinue()"/>
        </center>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { BalanceView } from '../../components/view'

export default {
  name: 'WithdrawModel',
  components: { BalanceView },
  data () {
    return {
      symbolStyle: {
        color: 'black',
        'font-size': '0.5em'
      }
    }
  },
  computed: {
    isShowWithdrawModel: {
      get () {
        return this.$store.state.channel.isShowWithdrawModel
      },
      set (open) {
        this.$store.commit('channel/updateShowWithdrawModel', { open })
      }
    },
    symbol: function () {
      return this.getSelectedToken().symbol.toUpperCase()
    },
    decimal: function () {
      return this.getSelectedToken().decimal
    },
    balance: function () {
      return this.getSelectedToken().balance
    }
  },
  methods: {
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    clickClose: function () {
      this.$store.commit('channel/updateShowWithdrawModel', { open: false })
    },
    clickContinue: function () {
      this.$store.commit('channel/updateShowWithdrawModel', { open: false })
      this.$store.commit('channel/updateShowWRemindModel', { open: true })
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.container {
  border:2px solid #2ca6e0;
  width: 80%
}
</style>

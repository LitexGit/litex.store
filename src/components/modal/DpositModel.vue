<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDRemindModel" @show="show()" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="row col-11 q-pr-md justify-center items-center text-white ">
          <span>充值</span>&nbsp;<span>{{token.symbol}}</span>
        </div>
      </div>
      <div class="bg-white q-px-md q-pb-md q-pt-sm">
          <q-input filled type='number' v-model="depInput" label="请输入数量" @blur="blur()" @focus="focus()"/>
          <div class="q-mt-md">
            <span>钱包余额：</span>
            <balance-view :symbol="token.symbol" :decimal="token.decimal" :amount="token.balance"/>
            <div class="q-mt-md text-caption text-weight-light">
              1.<span>您的充值安全由<span class="text-weight-regular">以太坊状态通道</span>保障，商城运营方无法操纵用户充值的代币，且您可以随时提现。</span><br/>
              2.<span>支付商品之前请先充值，以保证有足够的代币来进行支付。</span><br/>
              3.<span>充值涉及与以太坊的链上交互，请确保有足够的Gas费。成功的操作可以在“资金记录”中查看。</span><br/>
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
import { BalanceView } from '../../components/view'
import { isAvailableFormat, toWei } from '../../utils/helper'
import * as utils from 'web3-utils'

export default {
  name: 'DpositModel',
  components: { BalanceView },
  data () {
    return {
      isScroll: false,
      timer: null
    }
  },
  computed: {
    ...mapState('config', {
      duration: 'duration'
    }),
    depInput: {
      get () {
        return this.$store.state.channel.depInput
      },
      set (input) {
        this.$store.commit('channel/updateDepInput', { depInput: input })
      }
    },
    isShowDRemindModel: {
      get () {
        return this.$store.state.channel.isShowDpositModel
      },
      set (open) {
        this.$store.commit('channel/updateShowDpositModel', { open })
      }
    },
    token: function () {
      return this.getSelectedToken()
    }
  },
  methods: {
    toWei,
    isAvailableFormat,
    ...mapGetters('config', [
      'getSelectedToken'
    ]),
    show: function () {
      this.$store.commit('channel/updateDepInput', { depInput: '' })
    },
    clickClose: function () {
      this.$store.commit('channel/updateShowDpositModel', { open: false })
    },
    checkInput: function (input) {
      // 校验 01:format
      if (!this.isAvailableFormat(input)) {
        this.$q.notify({ message: '请输入有效的充值金额', position: 'top', type: 'negative', timeout: this.duration })
        return false
      }
      // TODO 校验 02:通道状态
      // 校验 03:banlance
      const amount = this.toWei({ input: this.depInput, decimal: this.token.decimal })
      const isGT = utils.toBN(this.token.balance).gt(utils.toBN(amount))
      if (!isGT) {
        this.$q.notify({ message: '钱包余额不足,请及时充值', position: 'top', type: 'negative', timeout: this.duration })
        return false
      }
      return true
    },
    clickConfirm: function () {
      blur()
      if (!this.checkInput(this.depInput)) return
      this.$store.commit('channel/updateShowDpositModel', { open: false })
      const amount = this.toWei({ input: this.depInput, decimal: this.token.decimal })
      this.$store.dispatch('channel/confirmDeposit', { amount, address: this.token.address })
    },
    blur () {
      this.isScroll = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.isScroll) {
          window.scrollTo(0, 0)
          clearTimeout(this.timer)
        }
      }, 300)
    },
    focus () {
      this.isScroll = false
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

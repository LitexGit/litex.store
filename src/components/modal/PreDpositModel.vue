<template>
  <q-dialog minimized no-backdrop-dismiss content-classes="flex justify-center items-center" position='standard'
    v-model="isShowDRemindModel" @show="show()" @hide="clickClose()" @cancel="clickCancel()">
    <div class="container bg-white">
      <div class="bg-primary q-pa-sm row">
        <q-btn class="col-1 q-pb-lg" color="white" dense flat size="md" icon="close" @click="clickClose()"/>
        <div class="col-11 q-pr-md text-white">
          <center class="text-subtitle1">
            <span>充值</span>&nbsp;<span>{{token.symbol}}</span>
          </center>
          <center class="text-caption">step 1/2 预授权</center>
        </div>
      </div>
      <div class="bg-white q-px-md q-pb-md q-pt-sm">
        <!-- @blur="updateInputValue({input})" -->
        <q-input filled type='number' v-model="authInput" label="请输入数量" @blur="blur1()" @focus="focus()" />
        <div class="q-mt-md">
          <span>钱包余额：</span>
          <balance-view :symbol="token.symbol" :decimal="token.decimal" :amount="token.balance" :float="token.float"/>
          <div class="q-mt-md text-caption text-weight-light">
            1.<span>您的充值安全由<span class="text-weight-regular">以太坊状态通道</span>保障，游戏运营方无法操纵用户充值的代币，且您可以随时提现。</span><br/>
            2.<span>抢红包之前请先充值，以保证有相应场次足够的代币。</span><br/>
            3.<span>充值涉及与以太坊的链上交互，请确保有足够的Gas费。成功的操作可以在“资金记录”中查看。</span><br/>
          </div>
          <center class="q-mt-md">
            <q-btn class="q-px-xl" dense color="primary" label="确认授权" @click="clickAuthorize()"/>
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
  name: 'PreDpositModel',
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
    authInput: {
      get () {
        return this.$store.state.channel.authInput
      },
      set (input) {
        this.$store.commit('channel/updateAuthInput', { authInput: input })
      }
    },
    isShowDRemindModel: {
      get () {
        return this.$store.state.channel.isShowPreDpositModel
      },
      set (open) {
        this.$store.commit('channel/updateShowPreDpositModel', { open })
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
      this.$store.commit('channel/updateAuthInput', { authInput: '' })
    },
    clickClose: function () {
      this.$store.commit('channel/updateShowPreDpositModel', { open: false })
    },
    checkInput: function (input) {
      // 校验 01:format
      if (!this.isAvailableFormat(input)) {
        this.$q.notify({ message: '请输入有效的充值金额', position: 'top', type: 'negative', timeout: this.duration })
        return false
      }
      // TODO 校验 02:通道状态
      // 校验 03:banlance
      const amount = this.toWei({ input: this.authInput, decimal: this.token.decimal, pos: this.token.float })
      const isGTE = utils.toBN(this.token.balance).gt(utils.toBN(amount))
      // TODO 校验 04: 异常提示
      return isGTE
    },
    clickAuthorize: function () {
      blur()
      if (!this.checkInput(this.authInput)) return
      const amount = this.toWei({ input: this.authInput, decimal: this.token.decimal, pos: this.token.float })
      this.$store.commit('channel/updateShowPreDpositModel', { open: false })
      this.$store.dispatch('channel/submitERC20Approval', { amount, address: this.token.address })
    },
    blur1 () {
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

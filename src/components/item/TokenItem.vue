<template>
  <div class="container q-ma-none row items-center">
    <center class="col-2">
      <q-avatar square size="24px">
        <img :src="icon">
      </q-avatar>
    </center>
    <div class="col-3 q-pl-sm">
      <q-item-label> {{ token.symbol.toUpperCase() }} </q-item-label>
      <q-item-label caption class="q-pt-sm">
        <balance-view :symbol="token.symbol" :decimal="token.decimal" :amount="token.channelBalance" :float="token.round"/>
      </q-item-label>
    </div>
    <center class="col-2">
      <q-btn v-if="token.status !== 2" no-wrap flat dense label="充值" text-color="primary"
         @click="$emit('deposit')"/>
    </center>
    <center class="col-2">
      <q-btn v-if="token.status !== 2" no-wrap flat dense label="提现" text-color="primary"
         @click="$emit('withdraw')"/>
    </center>
    <center class="col-3" :style="getChannelStatusStyle(token.status)">{{ getChannelStatusDes(token.status) }}</center>
  </div>
</template>

<script>
import { BalanceView } from '../../components/view'
import { getChannelStatusDes, getChannelStatusStyle } from '../../utils/helper'

export default {
  name: 'TokenItem',
  components: { BalanceView },
  props: {
    token: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    icon: function () {
      if (!this.token || !this.token.icon || !this.token.icon.length) {
        return 'statics/tokens/erc20_icon.png'
      }
      return this.token.icon
    }
  },
  methods: {
    getChannelStatusDes,
    getChannelStatusStyle
  }
}
</script>

<style scoped>
.container {
  width: 5000px;
}
</style>

<template>
  <q-page padding>
    <!-- <order-header></order-header> -->
    <div class="row text-center text-weight-thin" style="font-size:90%">
      <div class="col q-pa-xs">时间</div>
      <div class="col q-pa-xs">商品</div>
      <div class="col q-pa-xs">金额</div>
      <div class="col q-pa-xs">订单状态</div>
    </div>
    <div v-if="!orders || orders.length < 1">
      <q-separator />
      <div class="text-center q-mt-md">
        暂无记录
      </div>
    </div>
    <div v-else>
      <div
        v-for="order in orders"
        :key="order.index"
        class="text-center"
        style="font-size:90%"
      >
        <q-separator />
        <div class="row">
          <div class="col column q-pa-xs">
            <div class="col">
              {{ format(new Date(order.stamp), "DD/MM/YYYY") }}
            </div>
            <div class="col">
              {{ format(new Date(order.stamp), "HH:mm:ss") }}
            </div>
          </div>
          <div class="col column  q-pa-xs">
            <div class="col">{{ order.orderInfo.orderDes }}</div>
            <div class="col">
              {{
                order.orderInfo.accountNum.length > 11
                  ? order.orderInfo.accountNum.slice(0, 6) +
                    "..." +
                    order.orderInfo.accountNum.slice(-6)
                  : order.orderInfo.accountNum
              }}
            </div>
          </div>
          <div class="col q-pa-xs" style="margin:auto">
            {{
              roundFun(
                order.token.amount / Math.pow(10, order.token.decimal),
                order.token.symbol
              )
            }}{{ order.token.symbol }}
          </div>
          <div class="col q-pa-xs" style="margin:auto">
            {{ getOrderState(order.status) }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import format from 'date-fns/format'
import { roundFun } from '../utils/math'
import { mapState } from 'vuex'
import { ORDER_STATE } from '../constants/state'
import { Preferences, PrefKeys } from '../utils/preferences'
import { getAccount } from '../utils/helper'
// import { OrderHeader } from '../components/header'

export default {
  name: 'Orders',

  data () {
    return {
    }
  },
  // components: {
  //   OrderHeader
  // },
  computed: {
    ...mapState('order', [
      'orders'
    ]),
    ...mapState('config', [
      'tokens', 'selected', 'account'
    ]),
    channelBalance: {
      get: function () {
        return this.$store.state.config.tokens[this.$store.state.config.selected].channelBalance
      }
    }
  },
  created () {
    this.updateOrderRecords()
  },
  mounted: function () {
    this.$store.commit('config/update', { isShowRoot: false })
    this.$store.commit('config/update', { title: '订单列表' })
  },
  destroyed: function () {
    this.$store.commit('config/update', { isShowRoot: true })
  },
  // watch: {
  //   channelBalance: function () {
  //     this.updateOrderRecords()
  //   }
  // },
  methods: {
    format,
    roundFun,
    getAccount,
    getOrderState: (state) => {
      return ORDER_STATE[state]
    },
    back: () => {
      window.history.back(-1)
    },
    updateOrderRecords: function () {
      this.$store.dispatch('order/updateOrderRecords', { account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
    }
  }
}
</script>

<style>
</style>

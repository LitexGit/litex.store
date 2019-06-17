<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">订单列表</q-toolbar-title>
        <menu-btn></menu-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="row text-center text-weight-thin" style="font-size:90%">
          <div class="col q-pa-xs">时间</div>
          <div class="col q-pa-xs">商品</div>
          <div class="col q-pa-xs">金额</div>
          <div class="col q-pa-xs">订单状态</div>
        </div>
        <div v-if="!orders || orders.length < 1">
          <q-separator/>
          <div class="text-center q-mt-md">
            暂无记录
          </div>
        </div>
        <div v-else>
          <div v-for="order in orders" :key="order.index" class="text-center" style="font-size:90%">
            <q-separator/>
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
                <div class="col">{{ order.orderInfo.accountNum }}</div>
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
    </q-page-container>
  </q-layout>
</template>

<script>
import format from 'date-fns/format'
import MenuBtn from '../components/menu/MenuBtn'
import { roundFun } from '../utils/math'
import { mapState } from 'vuex'
import { ORDER_STATE } from '../constants/state'
import { Preferences, PrefKeys } from '../utils/preferences'

export default {
  name: 'Orders',

  data () {
    return {
    }
  },
  computed: {
    ...mapState('order', [
      'orders'
    ])
  },
  components: {
    'menu-btn': MenuBtn
  },
  created () {
    this.$store.dispatch('order/updateOrderRecords', { account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
  },
  methods: {
    format,
    roundFun,
    getOrderState: (state) => {
      return ORDER_STATE[state]
    },
    back: () => {
      window.history.back(-1)
    }

  }
}
</script>

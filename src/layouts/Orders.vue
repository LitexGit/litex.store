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
        <q-markup-table
          separator="horizontal"
          flat
          dense
        >
          <thead>
            <tr>
              <th class="text-center q-px-xs">时间</th>
              <th class="text-center q-px-sm">商品</th>
              <th class="text-center q-px-sm">金额</th>
              <th class="text-center q-px-sm">订单状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.index" class="text-center">
              <td class=" q-px-sm" style="font-size:80%">
                <div class="column">
                  <div class="col">
                    {{ format(new Date(order.stamp), "DD/MM/YYYY") }}
                  </div>
                  <div class="col">
                    {{ format(new Date(order.stamp), "HH:mm:ss") }}
                  </div>
                </div>
              </td>

              <td class=" q-px-sm" style="font-size:80%">
                <div class="column">
                  <div class="col">{{ order.orderInfo.commodity }}</div>
                  <div class="col">{{ order.orderInfo.orderDes }}</div>
                </div>
              </td>
              <td class=" q-px-sm" style="font-size:85%">
                <div class="column">
                  <div class="col">
                    <span v-if="order.fiatAmount < 0">-</span>
                    <span v-else>+</span>
                    ¥{{ Math.abs(order.fiatAmount) }}
                  </div>
                  <div class="col">
                    {{ order.token.amount }}{{ order.token.symbol }}
                  </div>
                </div>
              </td>
              <td class=" q-px-sm" style="font-size:90%">
                {{ getOrderState(order.status) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div v-if="orders.length < 1" class="text-center q-mt-md">
          暂无记录
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import format from 'date-fns/format'
import MenuBtn from '../components/menu/MenuBtn'
import { mapState } from 'vuex'
import { ORDER_STATE } from '../constants/state'

export default {
  name: 'Orders',

  data () {
    return {
      // pagination: {
      //   page: 2,
      //   rowsPerPage: 5
      // }
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
    this.$store.dispatch('order/updateOrderRecords', { account: 1 })
  },
  methods: {
    format,
    getOrderState: (state) => {
      return ORDER_STATE[state]
    },
    back: () => {
      window.history.back(-1)
    }
  }
}
</script>

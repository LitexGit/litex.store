<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">订单列表</q-toolbar-title>
        <menu-btn></menu-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-markup-table separator="horizontal" flat>
          <thead>
            <tr>
              <th class="text-center">时间</th>
              <th class="text-center">商品</th>
              <th class="text-center">金额</th>
              <th class="text-center">订单状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.index" class="text-center">
              <td>
                <div class="column">
                  <div class="col">{{ format(order.date, "DD/MM/YYYY") }}</div>
                  <div class="col">{{ format(order.date, "HH:mm:ss") }}</div>
                </div>
              </td>

              <td>
                <div class="column">
                  <div class="col">{{ order.commodity }}</div>
                  <div class="col">{{ order.reveiverAccount }}</div>
                </div>
              </td>
              <td>
                <div class="column">
                  <div class="col">
                    <span v-if="order.flat < 0">-</span>
                    <span v-else>+</span>
                    ¥{{ Math.abs(order.flat) }}
                  </div>
                  <div class="col">{{ order.token }}{{ order.tokenType }}</div>
                </div>
              </td>
              <td>
                {{ getOrderState(order.state) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import format from 'date-fns/format'
import MenuBtn from '../components/menu/MenuBtn'
import { mapState } from 'vuex'
import { ORDER_STATE } from '../constants/OrderState'

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

<template>
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
              <div class="col">{{ dateFormat(order.date) }}</div>
              <div class="col">{{ timeFormat(order.date) }}</div>
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
</template>

<script>
import { dateFormat, timeFormat } from '../utils/DateFormatter'
import { mapState } from 'vuex'
export default {
  name: 'OrderList',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('order', [
      'orders'
    ])
  },
  created () {
    console.log(this.orders)
  },
  methods: {
    dateFormat,
    timeFormat,
    getOrderState: (state) => {
      switch (state) {
        case 0:
          return '支付成功'
        case 1:
          return '支付失败'
        case 2:
          return '发货中'
        case 3:
          return '购买成功'
        case 4:
          return '购买失败'
        default:
          return '查询中'
      }
    }
  }
}
</script>

<style>
</style>

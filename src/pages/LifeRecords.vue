<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <div>
        <q-list>
          <q-item-label header class="q-pt-sm q-pb-sm">缴费记录</q-item-label>
          <div v-if="!records || records.length <= 0">
            <q-separator inset class="q-mb-xs" />
            <q-item-section class="text-center">
              <q-item-label header>
                暂无数据
              </q-item-label>
            </q-item-section>
          </div>
          <div v-else>
            <div v-for="(record, index) in records" :key="index">
              <q-separator inset class="q-my-xs" />
              <q-item clickable v-ripple>
                <q-item-section avatar class="self-center">
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="getIconName(record.orderInfo.type)"></use>
                  </svg>
                </q-item-section>

                <q-item-section class="content">
                  <q-item-label>
                    {{ getTypeName(record.orderInfo.type) }} -
                    {{ record.orderInfo.householdId }}
                  </q-item-label>
                  <q-item-label caption></q-item-label>
                  <q-item-label caption>
                    {{ format(new Date(record.stamp), "MM-DD HH:mm") }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>
                    ￥ {{ record.orderInfo.fiatAmount / 100 }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ tokenAmount(record) }}{{ record.token.symbol }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ getOrderState(record.status) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </div>
    </q-card>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { getIconName, getTypeName } from '../utils/life'
import { roundFun } from '../utils/math'
import format from 'date-fns/format'
import { ORDER_STATE } from '../constants/state'

export default {
  name: 'LifeRecords',
  computed: {
    ...mapState('life', [
      'records',
      'loading'
    ])
  },
  methods: {
    getIconName,
    getTypeName,
    format,
    roundFun,
    getOrderState: (state) => {
      return ORDER_STATE[state]
    },
    tokenAmount: function (record) {
      return roundFun(
        record.token.amount /
        Math.pow(10, record.token.decimal),
        record.token.symbol)
    }
  },
  created () {
    this.$store.dispatch('life/getRecords')
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: '缴费记录' })
  }
}
</script>

<style scoped>
.content {
  position: relative;
  right: 15px;
}
</style>

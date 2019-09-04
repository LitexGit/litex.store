<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container flex" flat>
      <div
        v-if="!records || records.length <= 0"
        class="flex column justify-center items-center q-pb-xl"
        style="flex:1"
      >
        <img src="statics/store/empty.png">
        <span class="q-mt-lg text-body1">暂无记录</span>
      </div>
      <q-list v-else style="flex:1">
          <div v-for="(record, index) in records" :key="index">
              <q-item clickable v-ripple style="">
                <q-item-section avatar class="self-center">
                  <q-icon :name="iconName" color="secondary" />
                </q-item-section>
                <q-item-section class="content">
                  <q-item-label>{{ record.orderInfo.orderDes }}</q-item-label>
                  <q-item-label caption>{{ record.orderInfo.accountNum }}</q-item-label>
                  <q-item-label caption>{{ format(new Date(record.stamp), "YYYY-MM-DD HH:mm:ss") }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>￥ {{ record.orderInfo.fiatAmount / 100 }}</q-item-label>
                  <q-item-label caption>{{ tokenAmount(record) }}{{ record.token.symbol }}</q-item-label>
                  <q-item-label caption>{{ getOrderState(record.status) }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator v-if="records.length && index != records.length - 1" inset class="q-mt-xs"/>
            </div>
        </q-list>
    </q-card>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import format from 'date-fns/format'
import { roundFun } from '../../utils/math'
import { ORDER_STATE } from '../../constants/state'
export default {
  name: 'RecordsComponent',
  data () {
    return {}
  },
  props: {
    records: Array,
    iconName: String,
    loading: Boolean
  },
  methods: {
    format,
    roundFun,
    getOrderState: state => {
      return ORDER_STATE[state]
    },
    tokenAmount: function (record) {
      return roundFun(
        record.token.amount / Math.pow(10, record.token.decimal),
        record.token.symbol
      )
    }
  },
  created () {
    this.$store.commit('config/update', {
      isShowRoot: false,
      isShowRootFoot: false,
      title: '充值记录'
    })
  }
}
</script>

<style scoped>
.content {
  position: relative;
  right: 15px;
}
</style>

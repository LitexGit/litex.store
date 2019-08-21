<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <div>
        <q-list>
          <q-item-label header class="q-pt-sm q-pb-sm">充值记录</q-item-label>
          <div v-for="(record, index) in records" :key="index">
            <q-separator inset class="q-my-xs" />

            <q-item clickable v-ripple>
              <q-item-section avatar class="self-center">
                <q-icon :name="iconName" color="secondary" />
              </q-item-section>

              <q-item-section class="content">
                <q-item-label>
                  {{ record.orderInfo.orderDes }}
                </q-item-label>
                <q-item-label caption>
                  {{ record.orderInfo.accountNum }}
                </q-item-label>
                <q-item-label caption>
                  {{ format(new Date(record.stamp), "YYYY-MM-DD HH:mm:ss") }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{
                    roundFun(
                      record.token.amount / Math.pow(10, record.token.decimal),
                      record.token.symbol
                    )
                  }}{{ record.token.symbol }}</q-item-label
                >
                <q-item-label caption>
                  {{ getOrderState(record.status) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </q-card>
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
    iconName: String
  },
  methods: {
    format,
    roundFun,
    getOrderState: (state) => {
      return ORDER_STATE[state]
    }
  }
}
</script>

<style scoped>
.content {
  position: relative;
  right: 15px;
}
</style>

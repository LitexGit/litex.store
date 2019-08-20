<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <div>
        <q-list>
          <q-item-label header class="q-pt-sm q-pb-sm">缴费记录</q-item-label>
          <div v-for="(record, index) in records" :key="index">
            <q-separator inset class="q-my-xs"/>
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
                <q-item-label caption> </q-item-label>
                <q-item-label caption>
                  {{ format(new Date(record.stamp), "MM-DD HH:mm") }}
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label header
                  >-￥{{ record.orderInfo.fiatAmount }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { getIconName, getTypeName } from '../utils/life'
import format from 'date-fns/format'

export default {
  name: 'LifeRecords',
  computed: {
    ...mapState('life', [
      'records'
    ])
  },
  methods: {
    getIconName, getTypeName, format
  },
  created () {
    // this.$store.dispatch('life/getRecords')
  }
}
</script>

<style scoped>
.content {
  position: relative;
  right: 15px;
}
</style>

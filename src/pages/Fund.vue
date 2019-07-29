<template>
  <q-page padding>
    <!-- <fund-header ></fund-header> -->
    <div class="row text-weight-thin text-center" style="font-size:90%">
      <div class="col q-pa-xs">时间</div>
      <div class="col q-pa-xs">金额</div>
      <div class="col q-pa-xs">用途</div>
    </div>
    <div v-if="!records || records.length < 1">
      <q-separator />
      <div class="text-center q-mt-md">
        暂无记录
      </div>
    </div>
    <div v-else>
      <div v-for="record in records" :key="record.index">
        <q-separator />
        <div class="row justify-around q-pa-xs">
          <div class="col">
            <div class="column">
              <div class="col text-center">
                {{ format(new Date(record.stamp), "DD/MM/YYYY") }}
              </div>
              <div class="col text-center">
                {{ format(new Date(record.stamp), "HH:mm:ss") }}
              </div>
            </div>
          </div>
          <div class="col text-center" style="margin:auto">
            {{ getAssetUse(record.reason) }}
          </div>
          <div class="col">
            <div class="column">
              <div class="col text-center">
                <span v-if="record.direction < 1">-</span>
                <span v-else>+</span>
                ¥{{ Math.abs(record.fiatAmount / 100) }}
              </div>
              <div class="col text-center">
                <span v-if="record.direction < 1">-</span>
                <span v-else>+</span>
                {{
                  roundFun(
                    record.token.amount / Math.pow(10, record.token.decimal),
                    record.token.symbol
                  )
                }}{{ record.token.symbol }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <q-separator/> -->
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import format from 'date-fns/format'
import { roundFun } from '../utils/math'
import { mapState } from 'vuex'
import { ASSET_STATE } from '../constants/state'
import { getAccount } from '../utils/helper'
import { Preferences, PrefKeys } from '../utils/preferences'

export default {
  name: 'Funds',

  data () {
    return {
    }
  },
  computed: {
    ...mapState('config', [
      'tokens', 'selected', 'isInitL2', 'account'
    ]),
    ...mapState('fund', [
      'records', 'loading'
    ]),
    channelBalance: {
      get: function () {
        const { channelBalance = '0' } = this.tokens[this.selected] || {}
        return channelBalance
      }
    }
  },
  watch: {
    channelBalance: function () {
      this.updateFundRecords()
    }
  },
  mounted: function () {
    this.updateFundRecords()
    this.$store.commit('config/update', { isShowRoot: false })
    this.$store.commit('config/update', { isShowFund: true })
    this.$store.commit('config/update', { title: '资金记录' })
  },
  destroyed: function () {
    this.$store.commit('config/update', { isShowFund: false })
    this.$store.commit('config/update', { isShowRoot: true })
  },
  methods: {
    format,
    roundFun,
    getAccount,
    getAssetUse: reason => {
      return ASSET_STATE[reason]
    },
    async updateFundRecords () {
      const { type = 1 } = this.tokens[this.selected] || {}
      this.$store.dispatch('fund/updateFundRecords', { type, account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
    }
  }
}

</script>

<style>
</style>

<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">资金记录</q-toolbar-title>
        <menu-btn></menu-btn>
      </q-toolbar>
      <q-tabs
        v-model="tokens[selected].type"
        dense
        class="bg-primary text-white row"
        indicator-bg-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="(token, index) in tokens"
          :key="token.type"
          :label="token.symbol"
          :name="token.type"
          @click="selectToken(index, token.type)"
          class="col-4"
        ></q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page padding>
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
                        record.token.amount /
                          Math.pow(10, record.token.decimal),
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
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuBtn from '../components/menu/MenuBtn'
import format from 'date-fns/format'
import { roundFun } from '../utils/math'
import { mapState } from 'vuex'
import { ASSET_STATE } from '../constants/state'
import { Preferences, PrefKeys } from '../utils/preferences'

export default {
  name: 'Funds',

  data () {
    return {
    }
  },
  computed: {
    ...mapState('config', [
      'tokens', 'selected'
    ]),
    ...mapState('fund', [
      'records', 'loading'
    ]),
    channelBalance: {
      get: function () {
        return this.tokens[this.selected].channelBalance
      }
    }
  },
  components: {
    'menu-btn': MenuBtn
  },
  watch: {
    channelBalance: function () {
      this.updateFundRecords()
    }
  },
  created () {
    this.$store.dispatch('config/getConfigs')
    this.updateFundRecords()
  },
  methods: {
    format,
    roundFun,
    back: () => {
      window.history.back(-1)
    },
    selectToken (index, type) {
      this.$store.dispatch('fund/updateFundRecords', { type, account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
      this.$store.commit('config/updateSelected', { index })
    },
    getAssetUse: reason => {
      return ASSET_STATE[reason]
    },
    updateFundRecords () {
      this.$store.dispatch('fund/updateFundRecords', { type: this.tokens[this.selected].type, account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
    }
  }
}
</script>

<style >
</style>

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
        <q-markup-table separator="horizontal" flat dense>
          <thead>
            <tr>
              <th class="text-center">时间</th>
              <th class="text-center">用途</th>
              <th class="text-center">金额</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="record in records"
              :key="record.index"
              class="text-center"
            >
              <td class="td-tbody" style="font-size:80%">
                <div class="column">
                  <!-- <div class="col">{{ dateFormat(record.date) }}</div> -->
                  <div class="col">
                    {{ format(new Date(record.stamp), "DD/MM/YYYY") }}
                  </div>
                  <div class="col">
                    {{ format(new Date(record.stamp), "HH:mm:ss") }}
                  </div>
                </div>
              </td>
              <td style="font-size:80%">{{ getAssetUse(record.reason) }}</td>
              <td style="font-size:80%">
                <div class="column">
                  <div class="col">
                    <span v-if="record.direction < 1">-</span>
                    <span v-else>+</span>
                    ¥{{ Math.abs(record.fiatAmount / 100) }}
                  </div>
                  <div class="col">
                    {{
                      roundFun(
                        record.token.amount /
                          Math.pow(10, record.token.decimal),
                        record.token.symbol
                      )
                    }}{{ record.token.symbol }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div v-if="records.length < 1" class="text-center q-mt-md">
          暂无记录
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
    ])
  },
  components: {
    'menu-btn': MenuBtn
  },
  created () {
    this.$store.dispatch('fund/updateFundRecords', { type: this.tokens[this.selected].type, account: Preferences.getItem(PrefKeys.USER_ACCOUNT) })
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
    }
  }
}
</script>

<style >
.td-tbody {
  font-size: 1px;
}
</style>

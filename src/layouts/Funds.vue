<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">资金记录</q-toolbar-title>
        <menu-btn></menu-btn>
      </q-toolbar>
      <q-tabs
        v-model="tokens[selected].index"
        dense
        class="bg-primary text-white row"
        indicator-bg-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="token in tokens"
          :key="token.index"
          :label="token.symbol"
          :name="token.index"
          @click="selectToken(token.index)"
          class="col-4"
        ></q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-markup-table separator="horizontal" flat class="q-mr-md">
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
              <td>
                <div class="column">
                  <!-- <div class="col">{{ dateFormat(record.date) }}</div> -->
                  <div class="col">{{ format(record.date, "DD/MM/YYYY") }}</div>
                  <div class="col">{{ format(record.date,"HH:mm:ss") }}</div>
                </div>
              </td>
              <td>{{ record.use }}</td>
              <td>
                <div class="column">
                  <div class="col">
                    <span v-if="record.flat < 0">-</span>
                    <span v-else>+</span>
                    ¥{{ Math.abs(record.flat) }}
                  </div>
                  <div class="col">
                    {{ record.token }}{{ tokens[selected].symbol }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-inner-loading :showing="loading">
          <q-spinner-bars size="50px" color="primary" />
        </q-inner-loading>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuBtn from '../components/menu/MenuBtn'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import format from 'date-fns/format'

export default {
  name: 'Funds',

  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('config', [
      'tokens', 'selected'
    ]),
    ...mapState('fund', [
      'records'
    ])
  },
  components: {
    'menu-btn': MenuBtn
  },
  methods: {
    format,
    back: () => {
      window.history.back(-1)
    },
    selectToken (index) {
      this.loading = true
      // this.$store.dispatch('fund/updateFundRecords',{index,account})
      this.$store.commit('config/updateSelected', { index })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

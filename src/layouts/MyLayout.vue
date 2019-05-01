<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          <span>LITE<b>X</b> Store</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-model="cate">
        <q-tab name="phone" label="话费流量" />
        <q-tab name="gas" label="加油卡" />
        <q-tab name="vip" label="VIP会员" />
      </q-tabs>
    </q-header>
    <q-footer>
      <q-toolbar class="bg-secondary text-white">
        <q-btn-dropdown stretch flat :label="supportedPnList[selected].symbol || '选择币种'">
          <q-list separator>
            <!-- <q-item-label header>当前可用</q-item-label> -->
            <q-item v-for="(pn, index) in supportedPnList" :key="index" clickable v-close-popup :active="index === selected" @click="selectPn(index)">
              <q-item-section avatar>
                <q-avatar :icon="`img:${pn.icon}`" />
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ pn.symbol.toUpperCase() }} </q-item-label>
                <q-item-label caption>{{ pn.balance }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ pn.status }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator dark vertical inset />
        <q-toolbar-title>
          <small> {{ loading ? '加载中..' : cnyPrice }} </small>
        </q-toolbar-title>
        <q-space />

        <q-separator dark vertical />
        <q-btn stretch flat label="支付" />
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      cate: 'phone'
    }
  },
  computed: {
    ...mapState('pn', {
      supportedPnList: 'supported',
      selected: 'selected',
      price: 'price',
      loading: 'loading'
    }),
    ...mapState('sku', {
      sku: 'selected'
    }),
    cnyPrice: function () {
      const { sku, price } = this
      return (sku.value / price).toFixed(4)
    }
  },
  methods: {
    selectPn: function (which) {
      const { commit, dispatch } = this.$store
      commit('pn/updateSelected', which)
      dispatch('pn/updatePrice', this.supportedPnList[which].symbol)
    }
  },
  mounted: function () {
    this.selectPn(0)
  }
}
</script>

<style>
</style>

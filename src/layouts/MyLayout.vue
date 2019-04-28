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
        <q-btn-dropdown stretch flat :label="selectedPn.symbol || '选择币种'">
          <q-list separator>
            <!-- <q-item-label header>当前可用</q-item-label> -->
            <q-item v-for="pn in supportedPnList" :key="pn.symbol" clickable v-close-popup :active="pn === selectedPn" @click="selectedPn = pn">
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
          {{ selectedPn.price }}
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

export default {
  name: 'MyLayout',
  data () {
    return {
      cate: 'phone'
    }
  },
  computed: {
    supportedPnList: {
      get () {
        return this.$store.state.pn.supported
      }
    },
    selectedPn: {
      get () {
        let symbol = this.$store.state.pn.selected
        console.log(this.$store)
        return this.$store.getters['pn/getPn'](symbol) || {}
      },
      set (val) {
        this.$store.commit('pn/updateSelectedPn', val.symbol)
        this.$store.dispatch('pn/updatePrice', val.symbol)
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>

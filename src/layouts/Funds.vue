<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">资金记录</q-toolbar-title>
        <menu-btn></menu-btn>
        <!-- <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer"/> -->
      </q-toolbar>
      <q-tabs
        v-model="tab"
        dense
        class="bg-primary text-white"
        indicator-bg-color="primary"
        align="justify"
        narrow-indicator
      >
        <!-- <q-route-tab name="ETH" label="ETH" to="/funds/records/ETH" /> -->
        <q-tab name="ETH" label="ETH" @click="changeToken('ETH')" />
        <!-- <q-route-tab name="USDT" label="USDT" to="/funds/records/USDT" /> -->
        <q-tab name="USDT" label="USDT" @click="changeToken('USDT')" />
        <!-- <q-route-tab name="LXT" label="LXT" to="/funds/records/LXT" /> -->
        <q-tab name="LXT" label="LXT" @click="changeToken('LXT')" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuBtn from '../components/menu/MenuBtn'

export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true,
      tab: this.$store.state.fund.currentToken
    }
  },
  components: {
    'menu-btn': MenuBtn
  },
  methods: {
    back: () => {
      window.history.back(-1)
    },
    changeToken (token) {
      this.$store.commit('fund/updateCurrentToken', token)
    }
  }
}
</script>

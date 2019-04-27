<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <!--
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        -->
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
        <q-btn-dropdown stretch flat label="选择币种">
          <q-list>
            <q-item-label header>当前可用</q-item-label>
            <q-item v-for="pn in supportedPnList" :key="pn.symbol" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar :icon="`img:${pn.icon}`" />
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ pn.symbol }} </q-item-label>
                <q-item-label caption>{{ pn.balance }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ pn.status }}
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item-label header>即将支持</q-item-label>
            <q-item v-for="pn in incomingPnList" disabled :key="pn.symbol" tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="img:pn.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ pn.symbol }} </q-item-label>
                <q-item-label caption>{{ pn.balance }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ pn.status }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator dark vertical />
        <q-btn stretch flat label="Link" />
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
      cate: 'phone'
    }
  },
  computed: {
    supportedPnList: {
      get () {
        return this.$store.state.pn.supported
      }
    },
    incomingPnList: {
      get () {
        return this.$store.state.pn.incoming
      }
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>

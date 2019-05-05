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
          <small> {{ loading ? '加载中..' : finalPrice }} </small>
        </q-toolbar-title>
        <q-separator dark vertical />
        <q-btn stretch flat label="支付" @click="placingOrder = true" />
      </q-toolbar>
    </q-footer>
    <q-dialog v-model="placingOrder">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
        <q-footer class="bg-transparent q-pa-sm text-white">
          <q-btn stretch color="secondary" class="full-width" label="支付" @click="pay()" />
          <q-separator spaced />
          <q-btn stretch color="red" class="full-width" label="取消" @click="placingOrder = false" />
        </q-footer>
        <q-page-container>
          <q-page padding>
            <p>{{ sku.cate + ' ' + sku.label }}</p>
            <p>{{ '价值' + sku.value }}元</p>
            <p>{{ finalPrice + ' ' + supportedPnList[selected].symbol}}</p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Web3 from 'web3'

export default {
  name: 'MyLayout',
  data () {
    return {
      cate: 'phone',
      placingOrder: false
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
    ...mapGetters('sku', [
      'getSkuById'
    ]),
    finalPrice: function () {
      let { sku, price, getSkuById } = this
      sku = getSkuById(sku)
      if (sku) {
        return (sku.value / price).toFixed(4)
      }
      return 0
    }
  },
  methods: {
    selectPn: function (which) {
      const { commit, dispatch } = this.$store
      commit('pn/updateSelected', which)
      dispatch('pn/updatePrice', this.supportedPnList[which].symbol)
    },
    pay: async function () {
      if (!window.web3) {
        alert('Web3 not ready')
      } else {
        const { toWei } = window.web3.utils
        const accounts = await window.web3.eth.getAccounts()
        const value = toWei(this.finalPrice)
        web3.eth.sendTransaction({
          from: accounts[0],
          to: process.env.TO,
          value
        }).on('transactionHash', function (hash) {
          console.log('HX: ', hash)
        }).on('receipt', function (receipt) {
          console.log('RP: ', receipt)
        }).on('confirmation', function (confirmationNumber, receipt) {
          console.log('CF: ', confirmationNumber)
        }).on('error', console.error) // If a out of gas error, the second parameter is the receipt.
      }
    }
  },
  mounted: async function () {
    this.selectPn(0)

    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */});
      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) { // Legacy dapp browsers...
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      // web3.eth.sendTransaction({/* ... */});
    } else { // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
}
</script>

<style>
</style>

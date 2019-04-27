<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm">
      <q-card-section>
      <q-input filled v-model='phone' counter maxlength="11" type='tel' label="请输入手机号">
        <template v-slot:prepend>
          <q-icon name="smartphone" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="phone = ''" class="cursor-pointer" />
        </template>
      </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div>话费充值</div>
        <q-btn v-for="{id, value} in skus.phone" @click="selectedSku=id" :key="id" :outline="id!=selectedSku" color="primary"
          :label="value + '元'" />
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div>流量充值</div>
        <q-btn v-for="{id, value} in skus.data" @click="selectedSku=id" :key="id" :outline="id!=selectedSku" color="primary"
          class="btn-fixed-width" :label="dataLabel(value)" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      phone: '11111111111',
      skus: {
        phone: [
          { id: 'ph-30', value: 30 },
          { id: 'ph-50', value: 50 },
          { id: 'ph-100', value: 100 },
          { id: 'ph-200', value: 200 },
          { id: 'ph-300', value: 300 },
          { id: 'ph-500', value: 500 }
        ],
        data: [
          { id: 'dt-1', value: 1 },
          { id: 'dt-2', value: 2 },
          { id: 'dt-3', value: 3 },
          { id: 'dt-0.5', value: 0.5 }
        ]
      },

      token: 'eth'
    }
  },
  computed: {
    selectedSku: {
      get () {
        return this.$store.state.sku.selected
      },
      set (val) {
        this.$store.commit('sku/updateSelectedSku', val)
      }
    }
  },
  methods: {
    dataLabel: (dc) => dc < 1 ? dc * 1000 + 'M' : dc + 'G',
    getUsdtPrice: async function () {
      let api = 'https://otc-api.huobi.co/v1/data/trade-market?country=37&currency=1&payMethod=0&currPage=1&coinId=2&tradeType=sell&blockType=general&online=1'
      let usdtPrice = await this.$axios.get(api)
      return usdtPrice
    },
    getEthPrice: async function () {
      let api = 'http://api.huobi.pro/market/trade?symbol=ethusdt'
      let ethUsdt = await this.$axios.get(api)
      return ethUsdt
    }
  }
}
</script>

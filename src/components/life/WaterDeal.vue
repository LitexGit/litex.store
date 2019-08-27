<template>
  <div class="q-px-lg">
    <div class="row text-center q-pb-sm">
      <div class="col text-subtitle2">待缴金额</div>
    </div>
    <div class="row text-center q-pb-md">
      <div class="col text-bold text-h4">￥{{ bill.payAmount }}</div>
    </div>
    <div class="row q-pb-sm">
      <div class="col-5">当前余额</div>
      <div class="col">{{ bill.balance ? bill.balance : "0.00" }} 元</div>
    </div>
    <div class="row q-py-sm">
      <q-separator />
    </div>
    <div class="row q-py-sm" v-if="bill.customerName">
      <div class="col-5">缴费户名</div>
      <div class="col">{{ bill.customerName }}</div>
    </div>
    <div class="row q-py-sm" v-if="account.number">
      <div class="col-5">缴费户号</div>
      <div class="col">{{ account.number }}</div>
    </div>
    <div class="row q-py-sm" v-if="bill.customerAddress">
      <div class="col-5">用户地址</div>
      <div class="col">{{ bill.customerAddress }}</div>
    </div>
    <div class="row q-py-sm" v-if="account.companyName">
      <div class="col-5">缴费单位</div>
      <div class="col">{{ account.companyName }}</div>
    </div>
    <div class="row q-py-sm" v-if="bill.month">
      <div class="col-5">账期</div>
      <div class="col">{{ bill.month }}</div>
    </div>
    <div class="row q-pt-sm q-pb-lg">
      <q-separator />
    </div>
    <div class="row text-caption q-pb-md text-grey">
      <div>您的缴费预计在一个工作日内到账</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WaterDeal',
  data () {
    return {}
  },
  computed: {
    ...mapState('life', [
      'account',
      'bill'
    ])
  },
  created () {
    this.$store.commit('life/update', { depositAmount: this.bill.payAmount })
    this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
  },
  mounted () {
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: true, title: '账单详情' })
  },
  destroyed () {
    this.$store.commit('life/update', { depositAmount: undefined })
  }
}
</script>

<style>
</style>

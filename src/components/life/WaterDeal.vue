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
      <div class="col">{{ bill.balance }}元</div>
    </div>
    <div class="row q-py-sm">
      <q-separator />
    </div>
    <div class="row q-py-sm">
      <div class="col-5">缴费户名</div>
      <div class="col">{{ bill.customerAddress }}</div>
    </div>
    <div class="row q-py-sm">
      <div class="col-5">缴费户号</div>
      <div class="col">{{ bill.accountNo }}</div>
    </div>
    <div class="row q-py-sm">
      <div class="col-5">缴费单位</div>
      <div class="col">{{ account.companyName }}</div>
    </div>
    <div class="row q-py-sm">
      <div class="col-5">账期</div>
      <div class="col">{{ bill.month }}</div>
    </div>
    <div class="row q-pt-sm q-pb-lg">
      <q-separator />
    </div>
    <div class="row text-caption q-pb-md text-grey">
      点击下方"支付"进行下单操作
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
  }
}
</script>

<style>
</style>

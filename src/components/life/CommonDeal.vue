<template>
  <div class="q-px-lg">
    <q-form submit @submit="toDealDetail()">
      <div class="row q-pb-sm">
        <div class="col-5">应缴金额</div>
        <div class="col">{{ bill.payAmount }}元</div>
      </div>
      <div class="row q-py-sm">
        <q-separator />
      </div>
      <div class="row q-py-sm" v-if="bill.accountUserName">
        <div class="col-5">缴费户名</div>
        <div class="col">{{ bill.accountUserName }}</div>
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
      <div class="row q-pt-sm q-pb-sm">
        <q-separator />
      </div>
      <q-input
        label="输入缴费充值金额"
        stack-label
        prefix="￥"
        v-model="depositAmount"
        class="row q-py-sm"
        :rules="[
          val => (val && val >= 10) || '最少需缴费10元',
          val => val >= bill.payAmount || '缴费金额需大于应缴金额'
        ]"
      ></q-input>
      <div class="row q-pt-md q-pb-lg">
        <div class="col-4 text-center q-px-sm">
          <q-btn
            :label="adviceAmount + '元'"
            color="grey-4"
            text-color="black"
            size="md"
            class="full-width"
            dense
            @click="setAmount(adviceAmount)"
          ></q-btn>
        </div>
        <div class="col-4 text-center q-px-sm">
          <q-btn
            :label="adviceAmount + 50 + '元'"
            color="grey-4"
            text-color="black"
            class="full-width"
            dense
            @click="setAmount(adviceAmount + 50)"
          ></q-btn>
        </div>
        <div class="col-4 text-center q-px-sm">
          <q-btn
            :label="adviceAmount + 100 + '元'"
            color="grey-4"
            text-color="black"
            class="full-width"
            dense
            @click="setAmount(adviceAmount + 100)"
          ></q-btn>
        </div>
      </div>
      <q-btn
        label="下一步"
        class="row full-width q-mb-md q-mt-lg"
        color="secondary"
        type="submit"
      ></q-btn>
    </q-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CommonDeal',
  data () {
    return {}
  },
  computed: {
    ...mapState('life', [
      'account',
      'bill'
    ]),
    adviceAmount: function () {
      const advice = Math.ceil(this.bill.payAmount / 50) * 50
      return advice < 50 ? 50 : advice
    },
    depositAmount: {
      set: function (val) {
        this.$store.commit('life/update', { depositAmount: val })
        this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
      },
      get: function () {
        return this.$store.state.life.depositAmount
      }
    }
  },
  methods: {
    setAmount (amount) {
      this.depositAmount = amount
    },
    toDealDetail () {
      this.$router.push('lifeDealDetail')
    }
  },
  mounted () {
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: '账单详情' })
  }
}
</script>

<style>
</style>

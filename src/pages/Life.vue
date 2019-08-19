<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="q-pa-sm" v-if="accounts && accounts.length > 0">
        <div class="q-pb-md q-pl-sm">我的缴费</div>
        <div class="q-px-sm" v-for="(account, index) in accounts" :key="index">
          <q-btn
            class="full-width q-pa-xs q-mb-sm"
            @click="toLifeDeal(account)"
          >
            <life-account-item
              class="full-width"
              :name="account.name"
              :type="account.type"
              :number="account.number"
            ></life-account-item>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <div class="row q-pb-md q-pt-sm">
          <div class="col q-pl-sm">新增缴费</div>
          <div class="col  q-pr-sm text-right" @click="pickCity()">
            {{ city.name }}
            <q-icon name="keyboard_arrow_down" style="font-size:1.5em"></q-icon>
          </div>
        </div>
        <div class="row justify-around">
          <div
            class="col-4 text-center q-px-sm"
            v-for="(item, index) in paymentItems"
            :key="index"
          >
            <q-btn class="full-width q-mb-md" :to="'lifeAdd?type=' + item.type">
              <payment-item :type="item.type"></payment-item>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { PaymentItem, LifeAccountItem } from '../components/item'
import { mapState } from 'vuex'

export default {
  name: 'Life',
  data () {
    return {
    }
  },
  components: {
    PaymentItem, LifeAccountItem
  },
  computed: {
    ...mapState('life', [
      'paymentItems',
      'accounts',
      'city',
      'billResponse',
      'loading'
    ])
  },
  created () {
    this.$store.dispatch('life/getAccounts')
  },
  mounted () {
    this.$store.commit('life/update', { payable: false })
  },
  destroyed () {
    this.$store.commit('life/update', { payable: true })
  },
  methods: {
    toLifeDeal (account) {
      this.$store.dispatch('life/getAccountInfo', { accountId: account.id })
      if (this.billResponse && this.billResponse.status === '1') {
        this.$store.commit('life/update', { account: { id: account.id } })
        this.$router.push('lifeDeal')
      }
    },
    pickCity () {
      this.$router.push('cityPicker')
    }
  }
}
</script>

<style scoped>
</style>

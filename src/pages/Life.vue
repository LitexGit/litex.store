<template>
  <q-page padding class="flex column">
    <div style="flex:1">
        <q-card-section class="q-pa-sm" v-if="accounts && accounts.length > 0">
          <div class="row q-pb-md justify-around">
            <div class="col q-pl-sm">缴费账户</div>
            <div class="text-weight-bolder q-pr-sm" @click="pickCity()">...</div>
          </div>
          <q-card class="q-py-sm">
            <div class="q-px-sm" v-for="(account, index) in accounts" :key="index">
              <life-account-item
                class="full-width"
                :name="account.name"
                :type="account.type"
                :number="account.number"
                :account="account"/>
             </div>
          </q-card>
        </q-card-section>
        <q-card-section class="q-pa-sm" style="flex:1">
          <div class="row q-my-md">
            <div class="col q-pl-sm">新增缴费</div>
            <small class="col q-pr-sm items-end text-right" style="color: blue" @click="pickCity()">
              {{ city.name }}
              <q-icon name="keyboard_arrow_down" style="font-size:1.5em"/>
            </small>
          </div>
          <q-card class="row justify-around q-pa-md">
              <div class="col-3 text-center "  v-for="(item, index) in paymentItems" :key="index">
                <q-btn flat  outline class="full-width" :disable="!item.available" @click="toLifeAdd(item)">
                  <payment-item :type="item.type" :available="item.available"/>
                </q-btn>
              </div>
          </q-card>
        </q-card-section>
    </div>

    <div class="text-center">
      <q-btn flat size="sm" type="a" label="缴费记录" color="blue" to="lifeRecords"/>
    </div>
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
      'accounts',
      'city',
      'billResponse',
      'loading',
      'comapnies'
    ]),
    paymentItems: function () {
      let available = []
      let unAvailable = []
      const items = this.$store.state.life.paymentItems
      items.forEach(element => {
        if (element.available) {
          available.push(element)
        } else {
          unAvailable.push(element)
        }
      })
      return available.concat(unAvailable)
    }
  },
  created () {
    this.$store.dispatch('life/getAccounts')
    this.$store.dispatch('life/updatePaymentItems', { cityId: this.city.id })

    // this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
  },
  mounted () {
    this.$store.commit('life/update', { payable: false })
    this.$store.commit('config/update', { isShowRoot: true, isShowRootFoot: true, title: undefined })
  },
  destroyed () {
    this.$store.commit('life/update', { payable: true })
  },
  methods: {
    async toLifeAdd (item) {
      const result = await this.$store.dispatch('life/getCompanies', { cityId: this.city.id, type: item.type })
      if (result === 'ok') {
        this.$router.push('lifeAdd?type=' + item.type)
      }
    },
    pickCity () {
      this.$router.push('cityPicker')
    }
    // async checkAvailable (type) {
    //   const result = await this.$store.dispatch('life/checkCompany', { cityId: this.city.id, type })
    //   console.log(result)
    //   return result
    // }
  }
}
</script>

<style scoped>

</style>

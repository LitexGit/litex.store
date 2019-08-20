<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm">
        <q-card class="q-mt-sm">
          <div class="row q-pt-sm">
            <div class="col text-center">
              <q-btn round id="detailBtn">
                <svg class="icon item-center" aria-hidden="true">
                  <use :xlink:href="getIconName(account.type)"></use>
                </svg>
              </q-btn>
            </div>
          </div>
          <water-deal v-if="account.type === 1"></water-deal>
          <common-deal v-else></common-deal>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { getIconName } from '../utils/life'
import { mapState } from 'vuex'
import { CommonDeal, WaterDeal } from '../components/life'

export default {
  name: 'LifeDeal',
  data () {
    return {
      type: 2
    }
  },
  components: {
    CommonDeal, WaterDeal
  },
  computed: {
    ...mapState('life', [
      'account',
      'bill'
    ])
  },
  methods: {
    getIconName
  },
  created () {
    if (!this.account || !this.account.id) {
      this.$router.push('life')
    }
    // this.$store.dispatch('life/getAccountInfo', { accountId: this.account.id })
    // console.log('billResponse', billResponse)
    // if (billResponse.status !== '1') {
    //   this.$q.notify({
    //     message: billResponse.message,
    //     position: 'top',
    //     color: 'red',
    //     timeout: 1500
    //   })
    //   this.$router.push('life')
    // }
    // this.$store.commit('life/updateAccount', { accountId: this.account.id })
  },
  mounted () {
    if (this.account.type !== 1) {
      this.$store.commit('life/update', { payable: false })
    }
  },
  destroyed () {
    this.$store.commit('life/update', { payable: true })
    this.$store.commit('pn/updatePrice', 0)
  }
}
</script>

<style>
</style>

<template>
   <q-page padding class="flex column">
   <q-card class="q-ma-sm q-mt-md" style="flex: 1">
        <div class="row q-pt-sm">
          <div class="col text-center">
            <q-btn disable round id="detailBtn">
              <q-icon :name="getIconImgName(account.type, true)"/>
            </q-btn>
          </div>
        </div>
        <water-deal v-if="account.type === 1"/>
        <common-deal v-else/>
    </q-card>
    <!-- <div v-if="account.type != 1" class="q-pa-xs">
      <q-btn class="full-width q-pa-sm" color="secondary" label="确认账单" @click="$router.push('lifeDealDetail')"/>
    </div> -->
  </q-page>
</template>

<script>
import { getIconImgName } from '../utils/life'
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
    getIconImgName
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

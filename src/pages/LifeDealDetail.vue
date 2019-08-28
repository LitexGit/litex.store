<template>
  <q-page padding class="flex">
     <q-card class="q-ma-sm q-mt-md" style="flex: 1">
          <div class="row q-pt-sm">
            <div class="col text-center ">
              <q-btn round id="detailBtn">
                <q-icon :name="getIconImgName(account.type, true)"></q-icon>
              </q-btn>
            </div>
          </div>
          <div class="q-px-lg">
            <div class="row text-center q-pb-sm">
              <div class="col text-subtitle2 text-grey-7">缴费金额</div>
            </div>
            <div class="row text-center q-pb-md">
              <div class="col text-bold text-amber-14 text-h4">￥{{ depositAmount }}</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5 text-grey-7">应缴金额</div>
              <div class="col">{{ bill.payAmount }}元</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5 text-grey-7">入表金额</div>
              <div class="col">{{ depositAmount - bill.payAmount }}元</div>
            </div>
            <div class="row q-py-sm">
              <q-separator />
            </div>
            <div class="row q-py-sm" v-if="bill.customerName">
              <div class="col-5 text-grey-7">缴费户名</div>
              <div class="col">{{ bill.customerName }}</div>
            </div>
            <div class="row q-py-sm" v-if="account.number">
              <div class="col-5 text-grey-7">缴费户号</div>
              <div class="col">{{ account.number }}</div>
            </div>
            <div class="row q-py-sm" v-if="bill.customerAddress">
              <div class="col-5 text-grey-7">用户地址</div>
              <div class="col">{{ bill.customerAddress }}</div>
            </div>
            <div class="row q-py-sm" v-if="account.companyName">
              <div class="col-5 text-grey-7">缴费单位</div>
              <div class="col">{{ account.companyName }}</div>
            </div>
            <div class="row q-pt-sm q-pb-lg">
              <q-separator />
            </div>
            <div class="row text-caption q-pb-md text-grey">
              <div>您的缴费预计在一个工作日内到账</div>
            </div>
          </div>
        </q-card>

    <!-- <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm">
      </q-card-section>
    </q-card> -->

  </q-page>
</template>

<script>
import { getIconImgName } from '../utils/life'
import { mapState } from 'vuex'

export default {
  name: 'LifeDealDetail',
  data () {
    return {
      type: 2
    }
  },
  computed: {
    ...mapState('life', [
      'account',
      'bill',
      'depositAmount'
    ])
  },
  methods: {
    getIconImgName
  },
  created () {
    if (!this.account || !this.account.id) {
      this.$router.push('life')
    }
    this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
  },
  mounted () {
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: true, title: '账单详情' })
  },
  destroyed () {
    this.$store.commit('life/update', { depositAmount: undefined })
    this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
  }
}
</script>

<style scoped>
button #icon-bolt {
  color: white;
  background: #fba542;
}

#icon-bolt {
  color: white;
}
</style>

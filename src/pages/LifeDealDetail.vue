<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm">
        <q-card class="q-mt-sm">
          <div class="row q-pt-sm">
            <div class="col text-center ">
              <q-btn round :id="getIconName(type).substring(1)">
                <svg class="icon text-center" aria-hidden="true">
                  <use :xlink:href="getIconName(type)"></use>
                </svg>
              </q-btn>
            </div>
          </div>
          <div class="q-px-lg">
            <div class="row text-center q-pb-sm">
              <div class="col text-subtitle2">缴费金额</div>
            </div>
            <div class="row text-center q-pb-md">
              <div class="col text-bold text-h4">￥{{ bill.payAmount }}</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5">应缴金额</div>
              <div class="col">{{ bill.payAmount }}元</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5">入表金额</div>
              <div class="col">{{ bill.payAmount }}元</div>
            </div>
            <div class="row q-py-sm">
              <q-separator />
            </div>
            <div class="row q-py-sm">
              <div class="col-5">缴费户名</div>
              <div class="col">{{ bill.accountUserName }}</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5">缴费户号</div>
              <div class="col">{{ bill.accountNo }}</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5">缴费单位</div>
              <div class="col">{{ company.name }}</div>
            </div>
            <div class="row q-py-sm">
              <div class="col-5">用电地址</div>
              <div class="col">{{ bill.customerAddress }}</div>
            </div>
            <div class="row q-pt-sm q-pb-lg">
              <q-separator />
            </div>
            <div class="row text-caption q-pb-md text-grey">
              点击下方"支付"进行下单操作
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { getIconName } from '../utils/life'
import { mapState } from 'vuex'

export default {
  name: 'LifeDealDetail',
  data () {
    return {
      type: 2,
      depositAmount: undefined
    }
  },
  computed: {
    ...mapState('life', [
      'bill',
      'company'
    ]),
    adviceAmount: function () {
      return 50
    }
  },
  methods: {
    getIconName,
    setAmount (amount) {
      this.depositAmount = amount
    }
  },
  created () {
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

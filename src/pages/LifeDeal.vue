<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm">
        <q-card class="q-mt-sm">
          <div class="row q-pt-sm">
            <div class="col text-center ">
              <q-btn round :id="getIconName(type).substring(1)">
                <svg class="icon item-center" aria-hidden="true">
                  <use :xlink:href="getIconName(type)"></use>
                </svg>
              </q-btn>
            </div>
          </div>
          <div class="q-px-lg">
            <div class="row q-pb-sm">
              <div class="col-5">应缴金额</div>
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
            <div class="row q-pt-sm q-pb-sm">
              <q-separator />
            </div>
            <q-input
              label="输入缴费充值金额"
              stack-label
              prefix="￥"
              v-model="depositAmount"
              class="row q-py-sm"
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
              to="/shop/lifeDealDetail"
            ></q-btn>
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
  name: 'LifeDeal',
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

<style>
</style>

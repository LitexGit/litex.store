<template>
  <q-page padding class="flex column">
    <q-card class="q-pa-sm container" flat>
      <q-card-section>
        <q-input
          filled
          counter
          maxlength="11"
          type="tel"
          :label="remind"
          v-model="phone"
          @blur="blur({ phone })"
          @input="inputValue"
        >
          <template v-slot:prepend>
            <q-icon name="smartphone" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="phone = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section v-for="(product, index) in skus" :key="index" class="q-gutter-sm">
        <div>{{ product.productDes }}</div>
        <div class="row justify-start">
          <q-btn  style="width: 30%"
            class="text-caption q-mx-xs q-mb-md q-px-sm"
            v-for="(goods, index) in product.goodsList"
            :key="index"
            :color="disable ? 'grey-6' : 'primary'"
            :disable="disable"
            :outline="goods.goodsId != selectGoods.goodsId"
            @click="clickGoods(goods, product.productId)"
          >
            <!-- <img v-if="goods.goodsId === selectGoods.goodsId" src="statics/store/preferential.png" style="width: 20px; height:20px; position:absolute; right: -6px; top: -2px"> -->
            <div style="">
              <div>{{ goods.goodsDes }}</div>
              <div :class="disable ? 'text-grey-6' : 'text-grey-9'" style="font-size:10px !important; display:inline-block; white-space:nowrap;">
                售价:
                <span class="">{{ (goods.price / 100).toFixed(2) }}元</span>
              </div>
            </div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <div class="text-center q-mt-sm">
      <q-btn flat type="a" label="充值记录" color="blue" to="phoneRecords" size="sm"></q-btn>
    </div>
    <q-inner-loading :showing="loading001 || loading002">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { isPoneAvailable } from '../utils/helper'

export default {
  name: 'PageIndex',
  data () {
    return {
      debug: undefined
    }
  },
  computed: {
    ...mapState('order', {
      loading001: 'loading',
      isShowOrderDModel: 'isShowOrderDModel'
    }),
    ...mapState('channel', {
      loading002: 'loading'
    }),
    ...mapState('phone', {
      remind: 'remind',
      skus: 'skus',
      info: 'info',
      disable: 'disable',
      selectGoods: 'selectGoods'
    }),
    // ...mapState('pn', {
    //   selectGoods: 'selectGoods'
    // }),
    phone: {
      get () {
        return this.$store.state.phone.info.phone
      },
      set (phone) {
        this.$store.commit('phone/update', { info: { phone } })
      }
    }
  },
  watch: {
    isShowOrderDModel: function (newValue, oldValue) {
      if (!newValue) return
      this.$store.commit('phone/update', { disable: true })
    }
  },
  methods: {
    isPoneAvailable,
    // phone ==> goodList
    inputValue: function (input) {
      if (!this.isPoneAvailable(input)) {
        const selectGoods = { goodsId: null, productId: null }
        this.$store.commit('phone/update', { selectGoods })
        this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
        this.$store.commit('phone/update', { disable: true })
      } else {
        // this.$store.dispatch('sku/getGoodsList', { accountNum: input, debug: this.debug })
        // this.$store.commit('sku/update', { disable: false })
        this.$store.dispatch('phone/getGoodsList', {
          accountNum: input,
          debug: this.debug
        })
        this.$store.commit('phone/update', { disable: false })
      }
    },
    // 更新提示
    blur: function (info) {
      const { phone } = info
      if (!this.isPoneAvailable(phone)) {
        const selectGoods = { goodsId: null, productId: null }
        this.$store.commit('phone/update', { selectGoods })
        this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
        this.$store.commit('phone/update', { disable: true })
      } else {
        this.$store.commit('phone/update', { disable: false })

        this.$store.commit('phone/update', { info })
        this.$store.commit('phone/updatePhoneRemind', info)
      }
    },
    clickGoods: function (goods, productId) {
      goods.productId = productId
      this.$store.commit('phone/update', { selectGoods: goods })
      this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
    }
  },
  // 默认商品列表
  created () {
    const { phone } = this.info
    this.debug = this.$route.query.debug
    this.debug = !(this.debug === undefined || this.debug === null)
    // this.$store.dispatch('sku/getGoodsList', { accountNum: phone, debug: this.debug })
    this.$store.dispatch('phone/getGoodsList', {
      accountNum: phone,
      debug: this.debug
    })
  },
  destroyed: function () {
    this.$store.dispatch('pn/updatePrice', { path: this.$route.path })
    this.$store.commit('phone/update', { selectGoods: {} })
  },
  mounted: function () {
    this.$store.commit('config/update', {
      isShowRoot: true,
      isShowRootFoot: true,
      title: 'LITEX Store'
    })
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
</style>

<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section>
        <q-input filled counter maxlength="11" type='tel' :label="remind" v-model="phone" @blur="blur({phone})" @input="inputValue">
          <template v-slot:prepend>
            <q-icon name="smartphone" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="phone = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section v-for="(product, index) in skus" :key="index" class="q-gutter-sm">
        <div>{{product.productDes}}</div>
        <q-btn v-for="(goods, index) in product.goodsList" :key="index" :color="disable ? 'grey-6' : 'primary'" :label="goods.goodsDes"
          :disable="disable" :outline="goods.goodsId!=selectGoods.goodsId" @click="clickGoods(goods, product.productId)"/>
      </q-card-section>
    </q-card>
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
    }
  },
  computed: {
    ...mapState('order', {
      loading001: 'loading'
    }),
    ...mapState('channel', {
      loading002: 'loading'
    }),
    ...mapState('sku', {
      remind: 'remind',
      skus: 'skus',
      info: 'info',
      disable: 'disable',
      selectGoods: 'selectGoods'
    }),
    phone: {
      get () {
        return this.$store.state.sku.info.phone
      },
      set (phone) {
        this.$store.commit('sku/update', { info: { phone } })
      }
    }
  },
  methods: {
    isPoneAvailable,
    // phone ==> goodList
    inputValue: function (input) {
      console.log('==========input==========================')
      console.log(input)
      console.log('==========input==========================')
      if (!this.isPoneAvailable(input)) {
        const selectGoods = { goodsId: null, productId: null }
        this.$store.commit('sku/update', { selectGoods })
        this.$store.dispatch('pn/updatePrice')
        this.$store.commit('sku/update', { disable: true })
      } else {
        this.$store.dispatch('sku/getGoodsList', { accountNum: input })
        this.$store.commit('sku/update', { disable: false })
      }
    },
    // 更新提示
    blur: function (info) {
      const { phone } = info
      if (!this.isPoneAvailable(phone)) {
        const selectGoods = { goodsId: null, productId: null }
        this.$store.commit('sku/update', { selectGoods })
        this.$store.dispatch('pn/updatePrice')
        this.$store.commit('sku/update', { disable: true })
      } else {
        this.$store.dispatch('sku/getGoodsList', { accountNum: phone })
        this.$store.commit('sku/update', { disable: false })
      }

      this.$store.commit('sku/update', { info })
      this.$store.commit('sku/updatePhoneRemind', info)
    },
    clickGoods: function (goods, productId) {
      goods.productId = productId
      this.$store.commit('sku/update', { selectGoods: goods })
      this.$store.dispatch('pn/updatePrice')
    }
  },
  // 默认商品列表
  created () {
    const { phone } = this.info
    this.$store.dispatch('sku/getGoodsList', { accountNum: phone })
  }
}
</script>

<style scoped>
.container {
  flex: 1
}
</style>

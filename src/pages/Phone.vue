<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section>
        <!-- autofocus -->
        <q-input filled counter maxlength="11" type='tel' :label="remind" v-model="phone" @blur="updateInfo({phone})">
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
        <q-btn v-for="(goods, index) in product.goodsList" :key="index" color="primary" :label="goods.goodsDes"
          :outline="goods.goodsId!=selectGoods.goodsId" @click="clickGoods(goods, product.productId)"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {}
  },
  computed: {
    ...mapState('sku', {
      remind: 'remind',
      skus: 'skus',
      info: 'info',
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
    updateInfo: function (info) {
      this.$store.commit('sku/update', { info })
      this.$store.commit('sku/updatePhoneRemind', info)
    },
    clickGoods: function (goods, productId) {
      goods.productId = productId
      this.$store.commit('sku/update', { selectGoods: goods })
      this.$store.dispatch('pn/updatePrice')
    }
  },
  created () {
    this.$store.dispatch('sku/getGoodsList')
  },
  mounted () {}
}
</script>

<style scoped>
.container {
  flex: 1
}
</style>

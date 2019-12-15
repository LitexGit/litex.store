<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section>
        <div class="row items-center">
          <div class="col-11">
            <q-select
              filled
              v-model="selectedCard"
              :options="cards"
              :option-value="opt => (opt === null ? null : opt.id)"
              :display-value="`${selectedCard ? selectedCard.id : ''}`"
              :label="info"
              :disable="!ableToSelectCard"
              color="primary"
              clearable
              lazy-rules
              :rules="[val => val && val.id > 0]"
              @input="selectCard(selectedCard)"
            >
              <template v-slot:prepend>
                <q-icon name="local_gas_station" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section
                    avatar
                    no-padding
                    class="q-px-xs items-center"
                  >
                    <q-btn
                      :icon="'img:' + img(scope.opt.type)"
                      flat
                      class="q-pa-xs"
                    ></q-btn>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.user" />
                    <q-item-label caption>{{ scope.opt.id }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-1 q-pb-md q-pl-xs">
            <q-btn
              flat
              dense
              round
              fab-mini
              text-color="white"
              @click="addCard"
            >
              <img style="width: 28px" src="../statics/gas/addfiles.png" />
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        v-for="(product, index) in skus"
        :key="index"
        class="q-gutter-sm"
      >
        <div
          v-if="product && product.goodsList && product.goodsList.length > 0"
        >
          {{ product.productDes }}
        </div>
        <q-btn
          v-for="(goods, index) in product.goodsList"
          :key="index"
          :color="disable ? 'grey-6' : 'primary'"
          :disable="disable"
          :outline="goods.goodsId != selectedGoods.goodsId"
          @click="clickGoods(goods, product.productId)"
        >
          <div>
            <div>{{ goods.goodsDes }}</div>
            <small>
              售价:<span>{{ (goods.price / 100).toFixed(2) }}</span
              >元
            </small>
          </div>
        </q-btn>
      </q-card-section>
    </q-card>
    <q-inner-loading :showing="loading || channelLoading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Gas',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('gas', [
      'loading',
      'disable',
      'skus',
      'selectedGoods',
      'cards',
      'cardTypes'
    ]),
    ...mapState('channel', {
      channelLoading: 'loading'
    }),
    selectedCard: {
      get: function () {
        return this.$store.state.gas.selectedCard
      },
      set: function (value) {
        this.$store.commit('gas/update', { selectedCard: value })
      }
    },
    info: function () {
      return this.cards.length ? '请选择加油卡' : '点击右侧按钮添加加油卡'
    },
    ableToSelectCard: function () {
      return this.cards.length > 0
    }
  },
  methods: {
    addCard: function () {
      this.$router.push('/shop/addCard')
    },
    selectCard: function (card) {
      if (card === null) {
        const selectedGoods = { goodsId: null, productId: null }
        this.$store.commit('phone/update', { selectedGoods })
        this.$store.commit('gas/update', { disable: true })
        this.$store.commit('pn/updatePrice', 0)
      } else {
        this.$store.dispatch('gas/getGoodsList', { selectedCard: this.selectedCard })
        this.$store.commit('gas/update', { disable: false })
      }
    },
    clickGoods: function (goods, productId) {
      goods.productId = productId
      this.$store.commit('gas/update', { selectedGoods: goods })
      this.$store.dispatch('pn/updateGasPrice')
    },
    brand: function (type) {
      let label = '中国石化'
      this.cardTypes.forEach(item => {
        if (item.value === type) {
          label = item.label
        }
      })
      return label
    },
    img (type) {
      let img = '../statics/gas/zgsh.jpg'
      this.cardTypes.forEach(item => {
        if (item.value === type) {
          img = item.img
        }
      })
      return img
    }
  },
  created () {
    this.$store.dispatch('gas/getGoodsList', { selectedCard: this.selectedCard })
  },
  destroyed: function () {
    this.$store.commit('pn/updatePrice', 0)
    this.$store.commit('gas/update', { selectedGoods: {} })
  },
  mounted: function () {
    this.$store.commit('config/update', { title: undefined })
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>

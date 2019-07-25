<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <div v-if="cards && cards.length > 0">
        <q-card
          class="my-card bg-white q-mb-md"
          v-for="(card, index) in cards"
          :key="index"
          flat
        >
          <q-card-section class="bg-primary text-white column q-pa-xs">
            <div class="column">
              <div class="col row q-pa-xs justify-between">
                <div class="col">
                  <q-btn
                    flat
                    class="q-pa-xs"
                    :icon="'img:' + img(card.type)"
                    :label="brand(card.type)"
                  />
                </div>
                <div class="col-1 text-right" @click="removeCard(card)">
                  <q-icon name="delete"></q-icon>
                </div>
              </div>
              <div class="col q-pa-xs">姓名：{{ card.user }}</div>
              <div class="col q-pa-xs">卡号：{{ card.id }}</div>
            </div>
          </q-card-section>
          <div class="bg-grey-4 q-pa-xs" />
        </q-card>
      </div>
      <!-- <div v-else class=" text-center q-mt-md">
        <q-btn
          icon="add"
          color="teal"
          to="/shop/addCard"
        ></q-btn>
      </div> -->
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { CardRemoveDialog } from '../components/dialog'

export default {
  name: 'CardList',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('gas', [
      'cards',
      'cardTypes'
    ])
  },
  methods: {
    removeCard (card) {
      this.$q.dialog({
        component: CardRemoveDialog,
        root: this.$root,
        card: card
      }).onOk(() => {
        this.$store.commit('gas/removeCard', card)
      }).onCancel(() => {
      }).onDismiss(() => {
      })
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
  mounted: function () {
    this.$store.commit('config/update', { isShowRoot: false })
    this.$store.commit('config/update', { title: '加油卡列表' })
  },
  destroyed: function () {
    this.$store.commit('config/update', { isShowRoot: true })
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
</style>

<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <div v-if="cards && cards.length > 0">
        <q-list class="q-mt-sm">
          <div v-for="(card, index) in cards" :key="index">
            <q-card class="q-mb-md  card">
              <q-item class="q-pa-sm" clickable v-ripple>
                <q-item-section>
                  <q-item-label class="q-py-xs q-mb-sm">
                    <q-icon :name="'img:' + img(card.type)" size="md"></q-icon>
                    <span class="q-pl-sm q-mt-sm">
                      {{ brand(card.type) }}
                    </span>
                  </q-item-label>
                  <q-item-label caption> 姓名：{{ card.user }} </q-item-label>
                  <q-item-label caption> 卡号：{{ card.id }} </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label @click="removeCard(card)">
                    <q-icon name="delete"></q-icon>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-list>
      </div>
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
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: '加油卡列表' })
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
.card {
  background-color: #80cbc4;
}
</style>

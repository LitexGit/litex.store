<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section>
        <q-input filled v-model="phone" @blur="updateInfo({phone})" counter maxlength="11" type='tel' label="请输入手机号">
          <template v-slot:prepend>
            <q-icon name="smartphone" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="phone = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section v-for="cate in Object.keys(skus)" :key="cate" class="q-gutter-sm">
        <div>{{cateLabels[cate]}}</div>
        <q-btn v-for="sku in skus[cate]" @click="selectedSku=sku.id" :key="sku.id" :outline="sku.id!=selectedSku" color="primary"
          :label="sku.label" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
      phone: '13488886666'
    }
  },
  computed: {
    skus: {
      get () {
        const { skus } = this.$store.state.sku
        let cates = {}
        for (const sku of skus) {
          if (cates[sku.cate]) {
            cates[sku.cate].push(sku)
          } else {
            cates[sku.cate] = []
            cates[sku.cate].push(sku)
          }
        }
        return cates
      }
    },
    selectedSku: {
      get () {
        return this.$store.state.sku.selected
      },
      set (selected) {
        this.$store.commit('sku/update', { selected })
      }
    },
    ...mapState('sku', {
      cateLabels: 'cates'
    })
  },
  methods: {
    dataLabel: (dc) => dc < 1 ? dc * 1000 + 'M' : dc + 'G',
    updateInfo: function (info) {
      this.$store.commit('sku/update', { info })
    }
  },
  created () {
    this.$store.dispatch('sku/loadSkus')
  }
}
</script>

<style scoped>
.container {
  flex: 1
}
</style>

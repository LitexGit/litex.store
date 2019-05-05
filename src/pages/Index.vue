<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm">
      <q-card-section>
      <q-input filled v-model='phone' counter maxlength="11" type='tel' label="请输入手机号">
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

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      phone: '11111111111',
      cateLabels: {
        1: '话费充值',
        2: '流量充值'
      }
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
      set (val) {
        this.$store.commit('sku/updateSelectedSku', val)
      }
    }
  },
  methods: {
    dataLabel: (dc) => dc < 1 ? dc * 1000 + 'M' : dc + 'G'
  },
  created () {
    this.$store.dispatch('sku/loadSkus')
  }
}
</script>

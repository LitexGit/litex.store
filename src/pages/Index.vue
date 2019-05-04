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
      <q-card-section v-for="{ cate, data } in skus" :key="cate" class="q-gutter-sm">
        <div>{{cate}}</div>
        <q-btn v-for="sku in data" @click="selectedSku=sku" :key="sku.id" :outline="sku!=selectedSku" color="primary"
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
      phone: '11111111111'
    }
  },
  computed: {
    skus: {
      get () {
        return this.$store.state.sku.available
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
    this.selectedSku = this.skus[0].data[2]
  }
}
</script>

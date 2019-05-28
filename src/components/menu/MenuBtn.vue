<template>
  <q-btn flat round dense icon="menu" id="menuBtn" @click="click">
    <q-menu>
      <q-list dense>
        <q-item clickable v-close-popup to="/shop/phone">
          <q-item-section>
            <q-item-label>商城</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup to="/funds">
          <q-item-section>
            <q-item-label>资金记录</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup to="/orders/list">
          <q-item-section>
            <q-item-label>订单列表</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>说明</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>联系我们</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
let deg = 0
export default {
  name: 'MenuBtn',
  data () {
    return {}
  },
  methods: {
    click () {
      if (deg === 0) {
        deg += 180
      } else {
        deg = 0
      }
      document.getElementById('menuBtn').style.transform = 'rotate(' + deg + 'deg)'
    }
  }
}
</script>

<style>
</style>

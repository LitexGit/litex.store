<template>
  <q-btn-dropdown flat round dense>
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
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'MenuBtn',
  data () {
    return {}
  }
}
</script>

<style>
</style>

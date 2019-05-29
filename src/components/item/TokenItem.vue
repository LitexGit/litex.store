<template>
  <div class="container q-ma-none row items-center">
    <center class="col-2">
      <q-avatar :icon="`img:${token.icon}`" />
    </center>
    <div class="col-3 q-pl-sm">
      <q-item-label> {{ token.symbol.toUpperCase() }} </q-item-label>
      <q-item-label caption>{{ token.balance }}</q-item-label>
    </div>
    <center class="col-2">
      <!-- .stop -->
      <q-btn no-wrap flat dense label="充值" text-color="primary"
        v-if="token.enable" @click="$emit('deposit')"/>
    </center>
    <center class="col-2">
      <q-btn no-wrap flat dense label="提现" text-color="primary"
        v-if="token.enable" @click="$emit('withdraw')"/>
    </center>
    <center class="col-3">{{ token.status }}</center>
  </div>
</template>

<script>

export default {
  name: 'TokenItem',
  props: {
    token: {
      type: Object
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.container {
  width: 5000px;
}
</style>

<template>
  <div class="text-center q-mt-sm">
    <q-btn flat type="a" :label="label" color="blue" :to="to"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'LifeRecordsView',
  props: {
    to: String,
    label: String
  }
}
</script>

<style>
</style>

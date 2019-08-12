<template>
  <div>
    <div v-if="id === 0">
      <svg class="icon" aria-hidden="true" aria-co>
        <use xlink:href="#icon-bolt"></use>
      </svg>
    </div>
    <div v-else-if="id === 1">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-waterdrop"></use>
      </svg>
    </div>
    <div v-else-if="id === 2">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-ranqifei"></use>
      </svg>
    </div>
    <div>{{ desc }}</div>
  </div>
</template>

<script>
export default {
  name: 'PaymentItem',
  props: {
    desc: String,
    id: Number,
    icon: String
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>

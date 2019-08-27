<template>
  <div>
    <q-icon :name="getIconImgName(type, available)" class="q-my-xs"></q-icon>
    <!-- <svg class="icon" aria-hidden="true">
      <use :xlink:href="getIconImgName(type, available)"></use>
    </svg> -->
    <div>{{ getTypeName(type ) }}</div>
  </div>
</template>

<script>
import { getIconImgName, getTypeName } from '../../utils/life'

export default {
  name: 'PaymentItem',
  props: {
    type: Number,
    available: Boolean
  },
  data () {
    return {}
  },
  methods: {
    getIconImgName,
    getTypeName
  }
}
</script>

<style lang="stylus"></style>

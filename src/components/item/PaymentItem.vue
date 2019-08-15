<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="getIconName(type)"></use>
    </svg>
    <div>{{ getTypeName(type) }}</div>
  </div>
</template>

<script>
import { getIconName, getTypeName } from '../../utils/life'

export default {
  name: 'PaymentItem',
  props: {
    type: Number
  },
  data () {
    return {}
  },
  methods: {
    getIconName,
    getTypeName
  }
}
</script>

<style lang="stylus">

</style>

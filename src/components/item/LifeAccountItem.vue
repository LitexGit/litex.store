<template>
  <div class="row q-py-xs">
    <div class="col-1 self-center q-ml-md q-mr-sm row">
      <svg class="icon col self-center" aria-hidden="true">
        <use :xlink:href="getIconName(type)"></use>
      </svg>
    </div>
    <div class="col-8 column">
      <div class="row">{{ getTypeName(type) }}</div>
      <div class="row text-caption">
        {{ number + " | " + name }}
      </div>
    </div>
    <div class="col self-center">
      <q-icon name="chevron_right"></q-icon>
    </div>
  </div>
</template>

<script>
import { getIconName, getTypeName } from '../../utils/life'

export default {
  name: 'LifeAccountItem',
  props: {
    type: Number,
    name: String,
    number: Number
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    getIconName,
    getTypeName
  }
}
</script>

<style scoped lang="stylus">

</style>

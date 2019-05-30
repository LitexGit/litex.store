<template>
  <span>
    <span>{{showValue}}</span>
    <span v-if="isShowSymbol" :style="symbolStyle">&nbsp;{{symbol}}</span>
  </span>
</template>

<script>

import { mapGetters } from 'vuex'
import { toDecimal } from '../../utils/helper'

export default {
  name: 'BalanceView',
  props: {
    amount: {
      type: String,
      required: true,
      default: '0'
    },
    decimal: {
      type: Number,
      default: null
    },
    symbol: {
      type: String,
      required: false,
      default: null
    },
    symbolStyle: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    isShowSymbol: function () {
      return !!this.symbol
    },
    showValue: function () {
      let decimal = this.decimal
      if (!decimal) {
        decimal = this.getSelectedToken().decimal
      }
      return this.toDecimal({ amount: this.amount, decimal })
    }
  },
  methods: {
    toDecimal,
    ...mapGetters('config', [
      'getSelectedToken'
    ])
  },
  mounted: function () {
  }
}
</script>

<style>
</style>

<template>
  <q-page padding></q-page>
</template>

<script>
import { mapState } from 'vuex'
import format from 'date-fns/format'

export default {
  name: 'PhoneRecords',
  computed: {
    ...mapState('phone', [
      'records'
    ])
  },
  methods: {
    format
  },
  created () {
    // this.$store.dispatch('phone/getRecords')
  }
}
</script>

<style>
</style>

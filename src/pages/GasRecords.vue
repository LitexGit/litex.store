<template>
  <records-component
    :records="records"
    iconName="local_gas_station"
    :loading="loading"
  ></records-component>
</template>

<script>
import { mapState } from 'vuex'
import { RecordsComponent } from '../components/records'

export default {
  name: 'GasRecords',
  computed: {
    ...mapState('gas', [
      'records',
      'loading'
    ])
  },
  components: {
    RecordsComponent
  },
  methods: {
  },
  created () {
    this.$store.dispatch('gas/getRecords')
  }
}
</script>

<style>
</style>

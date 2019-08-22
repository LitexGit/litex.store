<template>
  <records-component
    :records="records"
    iconName="smartphone"
    :loading="loading"
  ></records-component>
</template>

<script>
import { mapState } from 'vuex'
import { RecordsComponent } from '../components/records'

export default {
  name: 'PhoneRecords',
  computed: {
    ...mapState('phone', [
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
    this.$store.dispatch('phone/getRecords')
  }
}
</script>

<style>
</style>

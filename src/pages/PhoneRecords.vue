<template>
  <records-component
    :records="records"
    iconName="smartphone"
  ></records-component>
</template>

<script>
import { mapState } from 'vuex'
import { RecordsComponent } from '../components/records'

export default {
  name: 'PhoneRecords',
  computed: {
    ...mapState('phone', [
      'records'
    ])
  },
  components: {
    RecordsComponent
  },
  methods: {
  },
  created () {
    // this.$store.dispatch('phone/getRecords')
  }
}
</script>

<style>
</style>

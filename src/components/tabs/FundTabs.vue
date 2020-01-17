<template>
  <div>
    <q-tabs
      dense
      class="bg-primary text-white row"
      indicator-bg-color="primary"
      align="justify"
      narrow-indicator
      v-model="tab"
    >
      <q-tab
        v-for="(token, index) in tokens"
        :key="token.type"
        :label="token.symbol"
        :name="token.type"
        @click="selectToken(index, token.type)"
        class="col-4"
      ></q-tab>
    </q-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    ...mapState('config', [
      'tokens', 'selected', 'account'
    ]),
    tab: {
      get () {
        return this.tokens[this.selected] ? this.tokens[this.selected].type : 0
      },
      set () {}
    }
  },
  methods: {
    back: () => {
      window.history.back(-1)
    },
    selectToken (index, type) {
      this.$store.dispatch('fund/updateFundRecords', { type, account: this.account })
      this.$store.commit('config/updateSelected', { index })
    }
  }
}
</script>

<style>
</style>

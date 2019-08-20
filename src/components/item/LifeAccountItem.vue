<template>
  <div class="row q-py-xs no-wrap">
    <q-btn class="full-width q-pa-xs q-mb-sm" @click="toLifeDeal(account)">
      <div class="col-1 self-center q-ml-md q-mr-sm row">
        <svg class="icon col self-center" aria-hidden="true">
          <use :xlink:href="getIconName(type)"></use>
        </svg>
      </div>
      <div class="col-7 column">
        <div class="row">{{ getTypeName(type) }}</div>
        <div class="row text-caption">
          <!-- {{ number + " | " + name }} -->
          {{ number }}
        </div>
      </div>
      <div class="col self-center">
        <q-icon name="chevron_right"></q-icon>
      </div>
    </q-btn>
    <div class="col">
      <q-icon
        name="backspace"
        class="delete"
        @click="deleteAccount(account)"
      ></q-icon>
    </div>
  </div>
</template>

<script>
import { getIconName, getTypeName } from '../../utils/life'
import { mapState } from 'vuex'
import { DeleteAccountDialog } from '../dialog'

export default {
  name: 'LifeAccountItem',
  props: {
    type: Number,
    name: String,
    number: String,
    account: Object
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('life', [
      'billResponse'
    ])
  },
  methods: {
    getIconName,
    getTypeName,
    async toLifeDeal (account) {
      await this.$store.dispatch('life/getAccountInfo', { accountId: account.id })
      if (this.billResponse && this.billResponse.status === '1') {
        this.$store.commit('life/update', { account: { id: account.id } })
        this.$router.push('lifeDeal')
      }
    },
    deleteAccount (account) {
      this.$q.dialog({
        component: DeleteAccountDialog,
        root: this.$root,
        account: account
      }).onOk(() => {
        this.$store.dispatch('life/deleteAccount', { accountId: this.account.id })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.delete {
  position: relative;
  right: 26px;
  top: 3px;
  font-size: 1.2em;
}
</style>

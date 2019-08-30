<template>
  <q-btn flat class="row">
    <div class="col-12 row justify-between" @click="toLifeDeal(account)">
      <div class="row items-center">
        <q-icon :name="getIconImgName(type, true)"/>
        <div class="column q-ml-lg">
          <div class="row">{{ getTypeName(type) }}</div>
          <div class="row text-caption">
            {{ number }}
          </div>
        </div>
      </div>
      <div class="row items-center">
        <q-icon name="chevron_right"/>
        <!-- <q-icon name="backspace" class="delete" @click="deleteAccount(account)"/> -->
      </div>
    </div>
    <!-- <div class="col-12 bg-grey-5" style="height: 0.5px"/> -->
  </q-btn>
</template>

<script>
import { getIconImgName, getTypeName } from '../../utils/life'
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
    getIconImgName,
    getTypeName,
    async toLifeDeal (account) {
      await this.$store.dispatch('life/getAccountInfo', { accountId: account.id })
      if (this.billResponse && this.billResponse.status === '1') {
        this.$store.commit('life/updateAccount', { accountId: account.id })
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

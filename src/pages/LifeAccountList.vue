<template>
  <q-page padding>
    <div class="q-pa-xs">
      <q-list>
        <q-item-label header class="q-pl-md q-pt-sm q-pb-md"
          >缴费管理</q-item-label
        >
        <q-separator inset />
        <div v-for="(account, index) in accounts" :key="index">
          <q-item clickable v-ripple class="q-my-xs">
            <q-item-section avatar class="q-pl-sm">
              <q-icon :name="getIconImgName(account.type, true)" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ getTypeName(account.type) }}</q-item-label>
              <q-item-label caption>{{ account.number }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label @click="deleteAccount(account)">
                <q-icon name="delete" style="font-size:1.2em" class=""></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { getIconImgName, getTypeName } from '../utils/life'
import { DeleteAccountDialog } from '../components/dialog'
export default {
  name: 'LifeAccountList',
  computed: {
    ...mapState('life', [
      'accounts'
    ])
  },
  methods: {
    getIconImgName,
    getTypeName,
    deleteAccount (account) {
      this.$q.dialog({
        component: DeleteAccountDialog,
        root: this.$root,
        account: account
      }).onOk(() => {
        this.$store.dispatch('life/deleteAccount', { accountId: account.id })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  created () {
    this.$store.dispatch('life/getAccounts')
  },
  mounted () {
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: undefined })
  }
}
</script>

<style>
</style>

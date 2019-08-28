<template>
  <q-dialog ref="deleteAccountDialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin container">
      <q-card-section class="text-h6 q-pa-sm text-center text-white bg-primary">
        确认删除？
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm  q-pt-md">
        <div class="column q-pl-md">
          <div class="col q-pa-xs q-ml-md">
            类 型：{{ getTypeName(account.type) }}
          </div>
          <div class="col q-pa-xs q-ml-md">户 号：{{ account.number }}</div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="确认" @click="onOKClick" />
        <q-btn color="primary" label="取消" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { getTypeName } from '../../utils/life'

export default {
  name: 'DeleteAccountDialog',
  data () {
    return {}
  },
  props: {
    account: Object
  },
  methods: {
    getTypeName,
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.deleteAccountDialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.deleteAccountDialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>
.container {
  border: 2px solid #2ca6e0;
  width: 80%;
}
</style>

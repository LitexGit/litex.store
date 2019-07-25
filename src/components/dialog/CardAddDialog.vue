<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h6 q-pa-sm text-center">
        加油卡信息
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <div class="column">
          <div class="col q-pa-xs q-ml-md">类 型：{{ cardType.label }}</div>
          <div class="col q-pa-xs q-ml-md">卡 号：{{ card.id }}</div>
          <div class="col q-pa-xs q-ml-md">姓 名：{{ card.user }}</div>
          <div class="col q-pa-xs q-ml-md">手 机：{{ card.tel }}</div>
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
import { mapState } from 'vuex'

export default {
  props: {
    card: {
      type: Object
    }
  },
  computed: {
    ...mapState('gas', [
      'cardTypes'
    ]),
    cardType: function () {
      return this.cardTypes.find(el => el.value === this.card.type)
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
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

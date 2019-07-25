<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h6 q-pa-sm  text-center">
        注意事项
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm">
        <div class="column">
          <div class="col q-pa-xs q-ml-md">1.请务必确认加油卡信息正确无误。</div>
          <div class="col q-pa-xs q-ml-md">2.信息填错导致的财产损失本产品概不负责。</div>
          <div class="col q-pa-xs q-ml-md">3.加油卡完成网上充值后，需到所充值油卡当地加油站请工作人员进行激活（圈存）操作，否则充值金额将无法生效。发票等相关问题请联系客服。</div>

        </div>
      </q-card-section>
      <q-card-actions align="center">
        <!-- <q-btn color="primary" label="确认" @click="onOKClick" /> -->
        <!-- <q-btn color="primary" label="取消" @click="onCancelClick" /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    card: {
      type: Object
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

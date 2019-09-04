<template>
  <q-dialog
    ref="cardRemoveDialog"
    @hide="onDialogHide"
    persistent
    minimized
    content-classes="flex justify-center items-center"
    position="standard"
  >
    <q-card class="container ">
      <q-card-section class="text-h6 q-pa-sm text-center text-white bg-primary">
        确认删除？
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-lg q-py-md text-grey-7">
        <div class="q-px-lg q-ml-md">
          <div>类 型：<span class="text-grey-10">{{ cardType.label }}</span></div>
          <div>卡 号：<span class="text-grey-10">{{ card.id }}</span></div>
          <div>姓 名：<span class="text-grey-10">{{ card.user }}</span></div>
          <div>手 机：<span class="text-grey-10">{{ card.tel }}</span></div>
        </div>
      </q-card-section>
      <q-card-actions align="around" class="q-pt-xs">
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
      this.$refs.cardRemoveDialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.cardRemoveDialog.hide()
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

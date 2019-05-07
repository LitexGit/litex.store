<template>
  <q-banner v-if="status" inline-actions rounded :class="bg" class="text-white">
    {{ message }}
    <template v-slot:action>
      <q-btn flat :label="labelL" @click="$emit(eventL)" />
      <q-btn v-if="labelR !== ''" flat :label="labelR" @click="$emit(eventR)" />
    </template>
  </q-banner>
</template>

<script>
export default {
  props: {
    status: {
      required: true
    }
  },
  computed: {
    message: function () {
      let message = ''
      switch (this.status) {
        case 1: message = '等待支付'; break
        case 2: message = '支付已提交，等待确认..'; break
        case 3: message = '订单失败！'; break
        case 4: message = '支付已确认'; break
        case 5: message = '支付已完成'; break
      }

      return message
    },
    bg: function () {
      let bg = ''
      switch (this.status) {
        case 1: bg = 'bg-orange'; break
        case 2: bg = 'bg-purple'; break
        case 3: bg = 'bg-red！'; break
        case 4: bg = 'bg-blue'; break
        case 5: bg = 'bg-green'; break
      }

      return bg
    },
    labelL: function () {
      let label = ''
      switch (this.status) {
        case 1: label = '取消订单'; break
        case 2: label = '刷新'; break
        case 3:
        case 4:
        case 5: label = '查看订单'; break
      }

      return label
    },
    labelR: function () {
      let label = ''
      switch (this.status) {
        case 1: label = '支付'; break
        case 2: break
        case 3: break
        case 4: break
        case 5: break
      }

      return label
    },
    eventL: function () {
      let event = ''
      switch (this.status) {
        case 1: event = 'cancel'; break
        case 2: event = 'refresh'; break
        case 3:
        case 4:
        case 5: event = 'detail'; break
      }

      return event
    },
    eventR: function () {
      let event = ''
      switch (this.status) {
        case 1: event = 'pay'; break
        case 2: break
        case 3: break
        case 4: break
        case 5: break
      }

      return event
    }
  }
}
</script>

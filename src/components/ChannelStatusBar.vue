<template>
  <div v-if="status" :class="bg" class="flex justify-end text-white">
    <small class="q-pa-xs q-pr-md">{{ message }}</small>
  </div>
</template>

<script>
export default {
  name: 'ChannelStatusBar',
  props: {
    status: {
      required: true
    }
  },
  computed: {
    message: function () {
      return this.status === 2 ? '等待中...' : ''
    },
    bg: function () {
      return this.status === 2 ? 'bg-orange' : ''
    }
  }
}
</script>

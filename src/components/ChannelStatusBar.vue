<!--
<template>
  <div v-if="isShow" :class="bg" class="flex justify-end text-white">
    <small class="q-pa-xs q-pr-md">{{ message }}</small>
  </div>
</template>

<template>
  <div v-if="isShow" :class="bg" class="row justify-end items-center" style="background-color: orange">
    <small class="q-pr-sm text-weight-medium">{{ message }}</small>
    <div class="self-end q-pr-md">
      <vue-loading type="cylon" color="white" :size="{ width: '30px', height: '30px' }"/>
    </div>
  </div>
</template>
-->

<template>
  <div v-if="isShow" :class="bg" class="row justify-center items-center">
    <vue-loading type="cylon" color="white" class="bg-orange" :size="{ width: '30px', height: '30px' }"/>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'ChannelStatusBar',
  components: { VueLoading },
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
    },
    isShow: function () {
      return this.status === 2
    }
  }
}
</script>

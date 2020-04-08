<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm" style="flex:1">
      <div class="flex justify-center">
        <img
          src="statics/lxt-logo.png"
          alt="Litex.Store"
          width="120"
          height="120"
        />
      </div>
      <div>
        <div class="q-pt-lg q-pl-md">
          <span class=" q-pr-md">Telegram:</span>
          <a href="https://t.me/joinchat/LPid-BOz24r2M3LcDtZzcg">
            <span  style="word-break:break-all;">联系电报客服</span>
          </a>
        </div>
        <div class="q-pt-md q-pl-md">
          <span class="q-pr-md">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>
          <a
            href="mailto:contact@litex.io?subject=联系我们&body=请编辑你要提交的内容:"
          >
            <span >contact@litex.io</span>
          </a>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Contact',
  computed: {
    ...mapState('config', ['telegramURL'])
  },
  mounted: function () {
    this.$store.commit('config/update', {
      isShowRoot: false,
      isShowRootFoot: false,
      title: '联系我们'
    })
  }
}
</script>

<style scoped>
</style>

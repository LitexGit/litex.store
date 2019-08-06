<template>
  <q-btn flat round dense icon="menu" id="menuBtn" @click="click">
    <q-menu>
      <q-list dense style="width:90px">
        <q-item
          clickable
          v-close-popup
          v-for="menuItem in menus"
          :key="menuItem.key"
          @click="clickItem(menuItem.key)"
        >
          <q-item-section>
            <q-item-label class="self-center">
              {{ menuItem.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-dialog v-model="showIntroduction" class="bg-blue-1">
      <q-card class="q-mx-lg">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-center text-white">LITEX STORE 说明</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <p>
            1.
            <span>{{ $t("introduction01") }}</span>
          </p>
          <p>
            2.
            <span>{{ $t("introduction02") }}</span>
          </p>
        </q-card-section>
        <q-separator />
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script>
import { mapState } from 'vuex'

let deg = 0
export default {
  name: 'MenuBtn',
  data () {
    return {
      showIntroduction: false
    }
  },
  computed: {
    ...mapState('config', [
      'menuList',
      'telegramURL',
      'chain'
    ]),
    menus: function () {
      if (typeof window.wan3 !== 'undefined' && (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined')) {
        let menus = []
        for (const menu of this.menuList) {
          menus.push(menu)
        }
        menus.splice(3, 0, { key: 'chain', label: '切换账户' })
        return menus
      }
      return this.menuList
    }
  },
  methods: {
    click () {
      if (deg === 0) {
        deg += 180
      } else {
        deg = 0
      }
      document.getElementById('menuBtn').style.transform = 'rotate(' + deg + 'deg)'
    },
    clickItem (key) {
      console.log('==========key==========================')
      console.log(key)
      console.log('===========key=========================')
      switch (key) {
        case 'shop':
          this.$router.push('/shop/phone')
          break
        case 'funds':
          this.$router.push('/shop/fund')
          break
        case 'orders':
          this.$router.push('/shop/order')
          break
        case 'chain':
          this.$store.commit('config/update', { isShowSwitchWModel: true })
          break
        case 'introduction':
          this.showIntroduction = true
          break
        case 'contactUS':
          window.location.href = this.telegramURL
          break
        default:
          break
      }
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

<template>
  <q-btn flat round dense icon="menu" id="menuBtn" @click="click">
    <q-menu>
      <q-list dense style="width:90px">
        <q-item
          clickable
          v-close-popup
          v-for="menuItem in menuList"
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
      'telegramURL'
    ])
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
      switch (key) {
        case 'shop':
          this.$router.push('/shop/phone')
          break
        case 'funds':
          this.$router.push('/funds')
          break
        case 'orders':
          this.$router.push('/orders')
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

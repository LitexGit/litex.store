<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="reply" @click="back" />
        <q-toolbar-title style="text-align:center">订单列表</q-toolbar-title>
        <menu-btn></menu-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuBtn from '../components/menu/MenuBtn'

export default {
  name: 'Orders',

  data () {
    return {
    }
  },
  components: {
    'menu-btn': MenuBtn
  },
  methods: {
    back: () => {
      window.history.back(-1)
    }
  }
}
</script>

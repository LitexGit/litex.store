<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="">

        <q-btn-dropdown split icon='close' color="primary" label="1000110123456789012">
            <q-list link>
              <q-item v-for="card in cards" :key="card.gameUserid" close-overlay>
               <span>{{card}}</span>
              </q-item>
            </q-list>
          </q-btn-dropdown>

      </q-card-section>

      <q-card-section class="bg-red">
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Gas',
  data () {
    return {
      cards: [
        {
          chargeType: '1',
          gameUserid: '1000110123456789012',
          gasCardTel: '18516804325',
          gasCardName: 'name001'
        },
        {
          chargeType: '2',
          gameUserid: '9010001101234567',
          gasCardTel: '18516804325',
          gasCardName: 'name002'
        }
      ]
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.container {
  flex: 1
}
</style>

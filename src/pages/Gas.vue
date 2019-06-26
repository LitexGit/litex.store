<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">

      <q-card-section class="row items-center">
        <div class="row items-center bg-grey-4" style="flex: 1">
          <q-input class="" style="flex: 1" type='number' readonly hide-underline label="1000110123456789012">
            <template v-slot:prepend>
              <img class="q-ml-sm" style="width: 25px" src="../statics/gas/oilbarrel.png" />
            </template>
          </q-input>
          <q-btn-dropdown flat dense round size="md" text-color='white'>
            <q-list link>
              <q-item v-for="card in cards" :key="card.gameUserid" close-overlay>
               <span>{{card}}</span>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-btn flat dense round fab-mini text-color='white' @click="addCard">
          <img class="q-ml-sm" style="width: 25px" src="../statics/gas/addfiles.png" />
        </q-btn>
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
  },
  methods: {
    addCard: function () {
      this.$router.push('/shop/AddCard')
      console.log('==============addCard======================')
    }
  }
}
</script>

<style scoped>
.container {
  flex: 1
}
.dropdown {

}
</style>

<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="q-pa-sm">
        <div class="row q-pb-lg q-pt-sm">
          <div class="col q-pl-sm">新增缴费</div>
          <div class="col text-right">北京市</div>
        </div>
        <div class="row justify-around">
          <div
            class="col-4 text-center q-px-sm"
            v-for="(item, index) in paymentItems"
            :key="index"
          >
            <q-btn class="full-width q-mb-md">
              <payment-item :desc="item.desc" :id="item.id"></payment-item>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { PaymentItem } from '../components/item'

export default {
  name: 'Life',
  data () {
    return {
      paymentItems: [
        {
          desc: '电费',
          id: 0,
          icon: '#icon-bolt'
        },
        {
          desc: '水费',
          id: 1,
          icon: '#icon-waterdrop'
        },
        {
          desc: '燃气费',
          id: 2,
          icon: '#icon-ranqifei'
        }
      ]
    }
  },
  components: {
    PaymentItem
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
</style>

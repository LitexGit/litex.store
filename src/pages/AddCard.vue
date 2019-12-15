<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="q-gutter-sm">
        <div class="flex justify-between">
          <span>加油卡类型:</span>

          <q-btn
            size="md"
            dense
            flat
            text-color="primary"
            label="已添加"
            to="/shop/CardList"
            v-if="cards && cards.length > 0"
          />
        </div>
        <div class="row">
          <div v-for="item in cardTypes" :key="item.value" class="col">
            <q-btn
              class="q-mr-md"
              :icon="'img:' + item.img"
              :color="card.type == item.value ? 'primary' : 'white'"
              :text-color="card.type == item.value ? 'white' : 'primary'"
              :label="item.label"
              @click="chooseType(item)"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div class="row items-center">
          <span class="">加油卡卡号:</span>
          <q-input
            class=""
            style="flex: 1"
            input-style="text-align: right"
            type="number"
            dense
            clearable
            items-aligned
            v-model="card.id"
          />
        </div>
        <div class="row items-center">
          <span class=""
            >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span
          >
          <q-input
            class=""
            style="flex: 1"
            input-style="text-align: right"
            dense
            clearable
            items-aligned
            v-model="card.user"
          />
        </div>
        <div class="row items-center">
          <span class=""
            >手&nbsp;&nbsp;&nbsp;&nbsp;机&nbsp;&nbsp;&nbsp;&nbsp;号:</span
          >
          <q-input
            class=""
            style="flex: 1"
            input-style="text-align: right"
            type="number"
            dense
            clearable
            items-aligned
            v-model="card.tel"
          />
        </div>
      </q-card-section>

      <div class="bg-grey-3 q-pa-xs" />

      <div class="row justify-end items-center q-mt-md q-mr-md">
        <div class="col-4 text-right">
          <q-btn icon="warning" size="sm" flat round />
          <q-btn
            size="md"
            dense
            flat
            text-color="primary"
            label="注意事项"
            @click="precautions"
          />
        </div>
      </div>

      <center>
        <q-btn
          class="q-mt-md"
          label="确认添加"
          style="width:80%"
          color="primary"
          text-color="white"
          @click="addCard()"
        />
      </center>
    </q-card>
    <!-- <precaution-dialog hide></precaution-dialog> -->
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { CardAddDialog, PrecautionDialog } from '../components/dialog'
import { isPoneAvailable, verifyCardId } from '../utils/helper'
export default {
  name: 'AddCard',
  data () {
    return {
      card: {
        type: undefined,
        id: undefined,
        user: undefined,
        tel: undefined
      }
    }
  },
  // components: {
  //   PrecautionDialog
  // },
  computed: {
    ...mapState('gas', [
      'cardTypes',
      'cards'
    ]),
    ...mapState('config', [
      'duration'
    ])
  },
  methods: {
    verifyCardId,
    isPoneAvailable,
    precautions: function () {
      this.$q.dialog({
        component: PrecautionDialog
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('Called on OK or Cancel')
      })
    },
    chooseType (item) {
      this.card.type = item.value
    },
    notify (msg) {
      this.$q.notify({
        message: msg,
        color: 'red',
        position: 'top',
        timeout: this.duration
      })
    },
    addCard () {
      if (!this.card.type) {
        this.notify('请选择加油卡类型')
        return
      } else if (!this.card.id) {
        this.notify('请填写加油卡卡号')
        return
      } else if (!this.verifyCardId(this.card.type, this.card.id)) {
        this.notify('请填写正确的加油卡卡号')
        return
      } else if (!this.card.user) {
        this.notify('请填写加油卡用户姓名')
        return
      } else if (!this.card.tel) {
        this.notify('请填写用户手机号')
        return
      } else if (!this.isPoneAvailable(this.card.tel)) {
        this.notify('请填写正确的手机号')
        return
      }
      this.$q.dialog({
        component: CardAddDialog,
        root: this.$root,
        card: this.card
      }).onOk(() => {
        this.$store.commit('gas/addCard', this.card)
        this.$router.push('/shop/gas')
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  },
  mounted: function () {
    this.$store.commit('config/update', { isShowRoot: false })
    this.$store.commit('config/update', { title: '添加加油卡' })
  },
  destroyed: function () {
    this.$store.commit('config/update', { isShowRoot: true })
  }

}
</script>

<style scoped>
.container {
  flex: 1;
}
</style>

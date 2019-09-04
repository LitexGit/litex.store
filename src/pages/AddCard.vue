<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <div class="row justify-between items-center">
        <q-item-label>加油卡类型:</q-item-label>
        <q-btn
          v-if="cards && cards.length > 0"
          to="/shop/CardList"
          flat
          round
          color="primary"
          icon="img:statics/gas/cards_management.png"
        />
      </div>
      <q-card-section class="q-pa-xs">
        <q-list>
          <q-item class="q-pa-xs">
            <q-item-section v-for="item in cardTypes" :key="item.value">
              <div class="text-center">
                <q-btn
                  class="q-mr-md"
                  :icon="'img:' + item.img"
                  :color="card.type == item.value ? 'primary' : 'white'"
                  :text-color="card.type == item.value ? 'white' : 'primary'"
                  :label="item.label"
                  @click="chooseType(item)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-item class="q-px-lg">
            <q-item-section side no-wrap class="q-pr-xs">
              <q-item-label class="text-black">卡号：</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-input
                style="flex: 1"
                input-style="text-align: right"
                type="number"
                dense
                clearable
                items-aligned
                v-model="card.id"
              />
            </q-item-section>
          </q-item>
          <q-item class="q-px-lg">
            <q-item-section side class="q-pr-xs">
              <q-item-label class="text-black">姓名：</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-input
                style="flex: 1"
                input-style="text-align: right"
                dense
                clearable
                items-aligned
                v-model="card.user"
              />
            </q-item-section>
          </q-item>
          <q-item class="q-px-lg">
            <q-item-section side class="q-pr-xs">
              <q-item-label class="text-black">手机：</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-input
                style="flex: 1"
                input-style="text-align: right"
                type="number"
                dense
                clearable
                items-aligned
                v-model="card.tel"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="text-grey text-caption q-mt-md q-px-xs">
          <div class="text-grey-8">注意事项：</div>
          <div class="q-mt-sm q-pl-md">
            <div>1. 请务必确认加油卡信息正确无误。</div>
            <div>2. 信息填错导致的财产损失本产品概不负责。</div>
            <div>3. 完成网上充值后，需到所充值油卡当地加油站进行激活(圈存)操作，否则充值金额将无法生效。</div>
            <div class="text-negative">4. 加油卡充值到账时间较长，请耐心等待。</div>
          </div>
        </div>
      </q-card-section>
      <center>
        <q-btn
          class="q-mt-xl"
          label="确认添加"
          style="width:80%"
          color="primary"
          text-color="white"
          @click="addCard()"
        />
      </center>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('gas', ['cardTypes', 'cards']),
    ...mapState('config', ['duration'])
  },
  methods: {
    verifyCardId,
    isPoneAvailable,
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
      this.$store.commit('gas/addCard', this.card)
      this.$q.notify({
        message: '加油卡添加成功',
        color: 'positive',
        position: 'top',
        timeout: this.duration
      })
      this.$router.push('/shop/gas')
    }
  },
  mounted: function () {
    this.$store.commit('config/update', {
      isShowRoot: false,
      isShowRootFoot: false,
      title: '添加加油卡'
    })
  }
}
</script>

<style scoped>
.container {
  flex: 1;
}
.line {
  line-height: 25px;
}
</style>

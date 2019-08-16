<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="q-pa-sm">
        <div class="row q-pt-xs">
          <div class="col-1 self-center">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="getIconName(type)"></use>
            </svg>
          </div>
          <span class="col self-center">{{ getTypeName(type) }}</span>
        </div>
      </q-card-section>
      <div class="q-pa-sm">
        <q-stepper v-model="step" vertical color="positive" animated>
          <q-step
            :name="1"
            :title="title1"
            icon="settings"
            :done="step > 1"
            :caption="caption"
            done-color="positive"
            active-color="secondary"
            inactive-color="secondary"
          >
            <q-form @submit="continue1()">
              <div>
                <q-select
                  v-model="company"
                  :options="companies"
                  option-label="name"
                  option-value="id"
                  dense
                  lazy-rules
                  :rules="[val => val || '需选定缴费单位']"
                >
                  <template v-slot:selected-item="scope">
                    {{ company.name }}
                  </template>
                </q-select>
              </div>
              <q-stepper-navigation class="q-pt-xs">
                <q-btn type="submit" color="primary" label="下一步" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <q-step
            :name="2"
            :title="title2"
            icon="settings"
            :done="step > 2"
            done-color="positive"
            active-color="secondary"
            inactive-color="secondary"
          >
            <q-form @submit="addAccount()">
              <div>
                <q-input
                  placeholder="请输入缴费户号"
                  v-model="accountNumber"
                  dense
                  maxlength="10"
                  :rules="[
                    val => (val && val.length === 10) || '请输入10位用户编号'
                  ]"
                ></q-input>
              </div>
              <q-stepper-navigation>
                <q-btn color="primary" label="提交" type="submit" />
                <q-btn
                  flat
                  @click="back1()"
                  color="primary"
                  label="返回"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-form>
          </q-step>
        </q-stepper>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { getIconName, getTypeName } from '../utils/life'
import { mapState } from 'vuex'

export default {
  name: 'LifeAdd',
  data () {
    return {
      step: 1,
      title1: '缴费单位',
      title2: '缴费户号',
      caption: ''
    }
  },
  components: {
  },
  computed: {
    ...mapState('life', [
      'city',
      'companies',
      'type'
    ]),
    company: {
      set: function (obj) {
        this.$store.commit('life/update', { company: obj })
      },
      get: function () {
        return this.$store.state.life.company
      }
    },
    accountNumber: {
      set: function (obj) {
        this.$store.commit('life/update', { accountNumber: obj })
      },
      get: function () {
        return this.$store.state.life.accountNumber
      }
    }
  },
  methods: {
    getIconName,
    getTypeName,
    addAccount () {
      this.$store.dispatch('life/addAccount', { accountNumber: this.accountNumber, company: this.company })
      this.$router.push('lifeDeal')
    },
    continue1 () {
      this.step = 2
      this.caption = this.company ? this.company.name : null
    },
    back1 () {
      this.step = 1
      this.caption = null
    }
  },
  created () {
    this.$store.commit('life/update', { type: this.$route.query.type })
    // this.$store.dispatch('life/getCompanies', { cityId: this.city.id, type: this.type })
    // this.$store.commit('config/update', { isShowRoot: false, isShowFund: false, title: '新增缴费' })
    if (this.companies && this.companies.length === 1) {
      this.$store.commit('life/update', { company: this.companies[0] })
    }
  },
  mounted () {
    this.$store.commit('life/update', { payable: false })
  },
  destroyed () {
    // this.$store.commit('config/update', { isShowRoot: true, isShowFund: false, title: undefined })
    this.$store.commit('life/update', { payable: true })
  }
}
</script>

<style>
</style>

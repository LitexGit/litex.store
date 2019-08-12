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
            :caption="company ? company.name : null"
            done-color="positive"
            active-color="secondary"
            inactive-color="secondary"
          >
            <div>
              <q-select
                v-model="company"
                :options="companies"
                option-label="name"
                option-value="id"
                label="请选择缴费单位"
                dense
              >
                <template v-slot:selected-item="scope">
                  {{ company.name }}
                </template>
              </q-select>
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="下一步" />
            </q-stepper-navigation>
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
            <div>
              <q-input
                placeholder="请输入缴费户号"
                v-model="accountNumber"
                dense
              ></q-input>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" label="提交" @click="addAccount()" />
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="返回"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
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
      title2: '缴费户号'
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
      // this.$router.push('')
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
  destroyed () {
    // this.$store.commit('config/update', { isShowRoot: true, isShowFund: false, title: undefined })
  }
}
</script>

<style>
</style>

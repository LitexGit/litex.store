<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container">
      <q-card-section class="q-pa-sm">
        <div class="row q-pt-xs">
          <div class="col-1 self-center">
            <q-icon
              :name="getIconImgName(type, true)"
              style="font-size:1.5em"
            ></q-icon>
          </div>
          <span class="col self-center">{{ getTypeName(type) }}</span>
        </div>
        <q-separator class="q-mt-sm" />
      </q-card-section>
      <div class="q-px-sm">
        <q-form @submit="addAccount()">
          <q-item class="q-py-xs">
            <q-item-section side>
              <q-item-label>1. 缴费机构：</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-mb-md q-py-xs">
            <q-item-section>
              <q-btn-dropdown
                color="secondary"
                :label="company ? company.name : '点此选择缴费机构'"
                outline
              >
                <q-list>
                  <q-item
                    v-for="(item, index) in companies"
                    :key="index"
                    clickable
                    v-close-popup
                    @click="onItemClick(item)"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ item.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" dense>
            <q-item-section side>
              <q-item-label>2. 缴费户号：</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pt-xs q-mb-sm">
            <q-item-section>
              <q-input
                v-model="accountNumber"
                dense
                placeholder="输入缴费户号"
                type="number"
              >
              </q-input>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn color="primary" label="提交" type="submit" />
            </q-item-section>
          </q-item>
        </q-form>
      </div>
      <!-- <div class="q-pa-sm">
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
                <q-btn-dropdown
                  color="positive"
                  :label="company ? company.name : '请选择缴费机构'"
                   outline
                >
                  <q-list>
                    <q-item
                      v-for="(item, index) in companies"
                      :key="index"
                      clickable
                      v-close-popup
                      @click="onItemClick(item)"
                    >
                      <q-item-section>
                        <q-item-label>
                          {{ item.name }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <q-stepper-navigation class="q-py-sm">
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
                >
                </q-input>
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
      </div> -->
    </q-card>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { getIconImgName, getTypeName } from '../utils/life'
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
      'type',
      'loading',
      'account'
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
    },
    maxlength: function () {
      switch (Number(this.type)) {
        case 1: return 9
        case 2: return 10
        case 3: return 11
        default:
          return 10
      }
    },
    rules: function () {
      switch (Number(this.type)) {
        case 1:
          return [
            val => (val && val.length === 9) || '请输入9位用户编号'
          ]
        case 2: return [
          val => (val && val.length === 10) || '请输入10位用户编号'
        ]
        case 3: return [
          val => (val && val.length === 11) || '请输入11位用户编号'
        ]
        default:
          return [
            val => (val && val.length === 9) || '请输入9位用户编号'
          ]
      }
    }
  },
  methods: {
    getIconImgName,
    getTypeName,
    async addAccount () {
      if (!(this.company && this.company.name)) {
        this.$q.notify({
          color: 'red',
          message: '请选择缴费机构',
          position: 'top',
          timeout: 1500
        })
        return
      }
      if (!(this.accountNumber && this.accountNumber.length > 0)) {
        this.$q.notify({
          color: 'red',
          message: '请填写缴费户号',
          position: 'top',
          timeout: 1500
        })
        return
      }
      const result = await this.$store.dispatch('life/addAccount', { accountNumber: this.accountNumber, company: this.company })
      if (result === 'ok') {
        this.$router.push('life')
      }
    },
    continue1 () {
      this.step = 2
      this.caption = this.company ? this.company.name : null
    },
    back1 () {
      this.step = 1
      this.caption = null
    },
    onItemClick (item) {
      this.company = item
    }
  },
  created () {
    this.$store.commit('life/update', { type: this.$route.query.type })
    this.$store.dispatch('life/getCompanies', { cityId: this.city.id, type: this.type })
    if (this.companies && this.companies.length === 1) {
      this.$store.commit('life/update', { company: this.companies[0] })
    }
  },
  mounted () {
    this.$store.commit('life/update', { payable: false })
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: '新增缴费' })
  },
  destroyed () {
    this.$store.commit('life/update', { payable: true, company: undefined, companies: undefined, accountNumber: undefined })
  }
}
</script>

<style>
</style>

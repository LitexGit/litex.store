<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm q-pr-md">
        <div>
          <div class="q-pb-md">
            <q-input placeholder="北京/beijing/bj" filled dense
              ><template v-slot:prepend>
                <q-icon name="search" /> </template
            ></q-input>
          </div>

          <div class="q-pb-xs">
            <div class="q-pl-xs q-py-sm q-mb-sm bg-grey-3">
              最近访问
            </div>
            <div class="row text-center">
              <div
                class="col-4 q-pb-sm item-center"
                v-for="(city, index) in recentCities"
                :key="index"
              >
                <q-btn
                  :label="city.name"
                  outline
                  no-caps
                  color="grey-7"
                  class="city"
                >
                </q-btn>
              </div>
            </div>
          </div>

          <div
            class="q-pb-xs"
            v-for="(cityGroup, index) in cityGroups"
            :key="index"
          >
            <div
              class="q-pl-xs q-py-xs q-mb-sm text-h6 bg-grey-3"
              :id="cityGroup.word"
            >
              {{ cityGroup.word }}
            </div>
            <div class="row text-center">
              <div
                class="col-4 q-pb-sm "
                v-for="(city, index) in cityGroup.cities"
                :key="index"
              >
                <q-btn
                  :label="city.name"
                  outline
                  no-caps
                  color="grey-7"
                  class="city"
                  @click="setCity(city)"
                >
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <div class="words column">
        <div
          class="row"
          v-for="(word, index) in words"
          :key="index"
          @click="jump(word)"
        >
          {{ word }}
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageName',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('life', [
      'recentCities',
      'cityGroups'
    ]),
    words: function () {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    }
  },
  methods: {
    jump (word) {
      if (document.querySelector('#' + word)) {
        document.querySelector('#' + word).scrollIntoView(true)
      }
    },
    setCity (city) {
      this.$store.commit('life/update', { city })
      this.$router.push('life')
    }
  },
  created () {
    this.$store.commit('config/update', { isShowRoot: false, isShowFund: false, title: '城市选择' })
    this.$store.dispatch('life/getCities')
  },
  destroyed () {
    this.$store.commit('config/update', { isShowRoot: true, isShowFund: false, title: undefined })
  }
}
</script>

<style>
.city {
  width: 90px;
}
.words {
  position: fixed;
  top: 15%;
  right: 2%;
  width: 15px;
  overflow: hidden;
}
</style>

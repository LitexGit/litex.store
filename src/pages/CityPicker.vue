<template>
  <q-page padding class="flex">
    <q-card class="q-pa-sm container" flat>
      <q-card-section class="q-pa-sm q-pr-md">
        <div>
          <div class="q-pb-md">
            <q-input placeholder="北京/bj" filled dense v-model="search">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="q-pb-xs" v-if="recentCities.length > 0 && !search">
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
                  @click="setCity(city)"
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
          class="row self-center"
          v-for="(word, index) in words"
          :key="index"
          @click="jump(word)"
        >
          {{ word }}
        </div>
      </div>
    </q-card>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
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
      'loading'
    ]),
    search: {
      set: function (search) {
        this.$store.commit('life/update', { search })
      },
      get: function () {
        return this.$store.state.life.search
      }
    },
    words: function () {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    },
    cityGroups: function () {
      const allCityGroups = this.$store.state.life.cityGroups
      if (!this.search) {
        return allCityGroups
      }
      let newCityGroups = []
      if (this.search) {
        allCityGroups.forEach(cityGroup => {
          let cities = []
          cityGroup.cities.forEach(city => {
            if (city.name.indexOf(this.search) !== -1 || city.fpy.indexOf(this.search) === 0) {
              cities.push(city)
            }
          })
          if (cities.length > 0) {
            newCityGroups.push({ word: cityGroup.word, cities })
          }
        })
      }
      return newCityGroups
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
      this.$store.commit('life/updateRecentCities', { city })
      this.$router.push('life')
    }
  },
  created () {
    this.$store.commit('config/update', { isShowRoot: false, isShowRootFoot: false, title: '城市选择' })
    this.$store.commit('life/getRecentCities')
    this.$store.dispatch('life/getCities')
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

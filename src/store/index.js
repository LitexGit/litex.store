import Vue from 'vue'
import Vuex from 'vuex'

import sku from './sku'
import pn from './pn'
import order from './order'
import fund from './fund'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      sku,
      pn,
      order,
      fund
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}

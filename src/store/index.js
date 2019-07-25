import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'

// import sku from './sku'
import phone from './phone'
import gas from './gas'
import vip from './vip'
import pn from './pn'
import order from './order'
import fund from './fund'

import config from './config'
import channel from './channel'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // plugins: [createLogger()],
    modules: {
      config,
      channel,
      // sku,
      phone,
      gas,
      vip,
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

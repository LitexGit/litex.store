import state from '../store/config/state'
import VueSocketIO from 'vue-socket.io'

// leave the export, even if you don't use it
export default ({ app, Vue }) => {
  const options = { transports: ['websocket'] }
  const { socketURL } = state
  Vue.use(new VueSocketIO({
    debug: false,
    connection: socketURL,
    options,
    vuex: {
      store: app.store
    }
  }))
}

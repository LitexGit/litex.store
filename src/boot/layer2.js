const layer2 = require('l2.js')

export default ({ Vue }) => {
  Vue.prototype.$layer2 = layer2.default.getInstance()
}

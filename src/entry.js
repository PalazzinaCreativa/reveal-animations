import directive from './revealAnimations'

function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.directive('reveal-animation', directive)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

directive.install = install

export default directive
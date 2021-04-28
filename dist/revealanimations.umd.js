(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gsap')) :
  typeof define === 'function' && define.amd ? define(['exports', 'gsap'], factory) :
  (global = global || self, factory(global.RevealAnimations = {}, global.gsap));
}(this, (function (exports, gsap) { 'use strict';

  gsap = gsap && Object.prototype.hasOwnProperty.call(gsap, 'default') ? gsap['default'] : gsap;

  var directive = {
    inserted: function inserted (el, bind) {
      // Fade in
      console.log(el);
      gsap.to(el, { opacity: 1 });
      // Slide in

      // Custom

    }
  };

  function install (Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.directive('reveal-animations', directive);
  }

  var plugin = {
    install: install
  };

  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  directive.install = install;

  exports.default = directive;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

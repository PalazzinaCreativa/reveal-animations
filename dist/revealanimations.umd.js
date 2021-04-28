(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gsap')) :
  typeof define === 'function' && define.amd ? define(['exports', 'gsap'], factory) :
  (global = global || self, factory(global.RevealAnimations = {}, global.gsap));
}(this, (function (exports, gsap) { 'use strict';

  gsap = gsap && Object.prototype.hasOwnProperty.call(gsap, 'default') ? gsap['default'] : gsap;

  var directive = {
    inserted: function inserted (el, bind) {
      // Configuration
      var defaultOptions = {
        type: 'fade-in',
        offset: 0.5, // 0.5 = 50%
        target: el,
        duration: 1.2,
        slideIn: {
          x: 0,
          y: 80,
          fade: false
        },
        ease: 'Power4.easeOut'
      };

      // Errors
      if (bind.values.type === 'custom' && !bind.value.initialState) {
        console.error('No initial state defined');
        return
      }

      if (bind.values.type === 'custom' && !bind.value.finalState) {
        console.error('No final state defined');
        return
      }

      var options = Object.assign(defaultOptions, bind.value || {}, {}); 
      
      var initialStates = {
        'fade-in': function () {
          gsap.set(options.target, { opacity: 0 });
        },
        'slide-in': function () {
          var initialState = {
            y: options.slideIn.y,
            x: options.slideIn.x,
            opacity: options.slideIn.fade ? 0 : 1
          };
          gsap.set(options.target, initialState);
        },
        'custom': function () {
          gsap.set(options.target, options.initialState);
        }
      };

      var animations = {
        'fade-in': function () {
          gsap.to(options.target, { opacity: 1, duration: options.duration, ease: options.ease });
        },
        'slide-in': function () {
          gsap.to(options.target, { x: 0, y: 0, opacity: 1, duration: options.duration, ease: options.ease });
        },
        'custom': function () {
          var properties = Object
            .assign(
              { duration: options.duration, ease: options.ease },
              options.finalState,
              {}
            );

          gsap.to(options.target, properties);
        }
      };
      
      // Initial state
      initialStates[options.type]();

      // Intersection Observer
      var observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: options.threshold
      };

      var handleIntersect = function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animations[options.type]();
          }
        });
      };
      var observer = new IntersectionObserver(handleIntersect, observerOptions);
      observer.observe(options.target);
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

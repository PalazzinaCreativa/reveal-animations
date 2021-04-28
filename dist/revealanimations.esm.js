import gsap from 'gsap';

var directive = {
  inserted: function inserted (el, bind) {
    // Configuration
    var defaultOptions = {
      type: 'fade-in',
      offset: 0.5, // 0.5 = 50%
      target: el,
      duration: 0.8,
      ease: 'Power4.easeOut'
    };
    var options = Object.assign(defaultOptions, bind.value || {}, {}); 
    
    var initialStates = {
      'fade-in': function () {
        gsap.set(options.target, { opacity: 0 });
      },
      'slide-in': function () {
        gsap.set(options.target, { y: 80 });
      }
    };

    var animations = {
      'fade-in': function () {
        gsap.to(options.target, { opacity: 1, duration: options.duration, ease: options.ease });
      },
      'slide-in': function () {
        gsap.to(options.target, { y: 0, duration: options.duration, ease: options.ease });
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

export default directive;

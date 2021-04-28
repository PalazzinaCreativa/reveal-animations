import gsap from 'gsap'

export default {
  inserted (el, bind) {
    // Configuration
    const defaultOptions = {
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
    }

    // Errors
    if (bind.values.type === 'custom' && !bind.value.initialState) {
      console.error('No initial state defined')
      return
    }

    if (bind.values.type === 'custom' && !bind.value.finalState) {
      console.error('No final state defined')
      return
    }

    const options = Object.assign(defaultOptions, bind.value || {}, {}) 
    
    const initialStates = {
      'fade-in': () => {
        gsap.set(options.target, { opacity: 0 })
      },
      'slide-in': () => {
        const slideInOptions = Object.assign(defaultOptions.slideIn, bind.value.slideIn || {}, {})

        gsap.set(options.target, {
          y: slideInOptions.y,
          x: slideInOptions.x,
          opacity: slideInOptions.fade ? 0 : 1
        })
      },
      'custom': () => {
        gsap.set(options.target, options.initialState)
      }
    }

    const animations = {
      'fade-in': () => {
        gsap.to(options.target, { opacity: 1, duration: options.duration, ease: options.ease })
      },
      'slide-in': () => {
        gsap.to(options.target, { x: 0, y: 0, opacity: 1, duration: options.duration, ease: options.ease })
      },
      'custom': () => {
        const properties = Object
          .assign(
            { duration: options.duration, ease: options.ease },
            options.finalState,
            {}
          )

        gsap.to(options.target, properties)
      }
    }
    
    // Initial state
    initialStates[options.type]()

    // Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: options.threshold
    }

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animations[options.type]()
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    observer.observe(options.target)
  }
}
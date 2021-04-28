import gsap from 'gsap'

export default {
  inserted (el, bind) {
    // Configuration
    const defaultOptions = {
      type: 'fade-in',
      offset: 0.5, // 0.5 = 50%
      target: el,
      duration: 0.8,
      ease: 'Power4.easeOut'
    }
    const options = Object.assign(defaultOptions, bind.value || {}, {}) 
    
    const initialStates = {
      'fade-in': () => {
        gsap.set(options.target, { opacity: 0 })
      },
      'slide-in': () => {
        gsap.set(options.target, { y: 80 })
      }
    }

    const animations = {
      'fade-in': () => {
        gsap.to(options.target, { opacity: 1, duration: options.duration, ease: options.ease })
      },
      'slide-in': () => {
        gsap.to(options.target, { y: 0, duration: options.duration, ease: options.ease })
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
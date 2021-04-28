import gsap from 'gsap'

export default {
  inserted (el, bind) {
    // Fade in
    console.log(el)
    gsap.to(el, { opacity: 1 })
    // Slide in

    // Custom

  }
}
function throttle(fn, limit) {
  let result, inThrottle = false
  return function () {
    if(!inThrottle) {
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
        fn(...arguments)
      }, limit)
    }
  }
}

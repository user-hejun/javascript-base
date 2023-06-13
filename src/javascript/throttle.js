function throttle(fn, limit) {
  let result, inThrottle = false
  if(!inThrottle) {
    inThrottle = true
    setTimeout(() => {
      inThrottle = false
    }, limit)
    result = fn(...arguments)
  }
  return result
}
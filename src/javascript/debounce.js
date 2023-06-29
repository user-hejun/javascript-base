function debounce(fn, limit = 3000) {
  let timer
  return function () {
    let context = this
    let args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, limit)
  }
}



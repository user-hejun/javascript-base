function debounce(fn, limit = 3000) {
  let timer, result
  if(timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    result = fn(arguments)
  }, limit);
  return result
}
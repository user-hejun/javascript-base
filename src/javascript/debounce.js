function debounce(fn, limit = 3000) {
  let timer, result
  clearTimeout(timer);
  timer = setTimeout(() => {
    result = fn(arguments)
  }, limit);
  return result
}
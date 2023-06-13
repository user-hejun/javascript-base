// new 函数实现
function MyNew() {
  let obj = new Object({})
  const constructor = [].slice.call(arguments)
  obj.__proto__ = constructor.prototype
  const res = constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}


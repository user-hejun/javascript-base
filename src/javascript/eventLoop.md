# Event Loop
js是单线程的，如果某段程序需要等待一会再执行，后面的程序都会被阻塞，这样也就带来了一些问题。为了解决这个问题，js出现了同步和异步两种任务，两种任务的差异就在于执行的优先级不同。event loop就是对任务的执行顺序做了详细的规范。

## 同步任务和异步任务
异步任务: 宏任务与微任务
常见的宏任务: script、setTimeout、setInterval、setImmediate(Node.js)、I/O、postMessage、MessageChannel、UI rendering
常见的微任务: promise.then、 .then中的逻辑时微任务、promise.catch()、 process.nextTick(node)、MutationObserver
注意Promise 是同步任务

## 任务的执行顺序
先到后：同步任务 -> 微任务 -> 宏任务。


## 执行机制
+ 所有同步任务都在主线程上执行，形成执行栈（execution context stack）
+ 主线程之外，还存在任务队列（task queue ）。只要异步任务有了运行结果，就在任务队列中放置一个事件
+ 一但执行栈中的所有同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件，那些对应的异步任务，于是结束等待，进入执行栈开始执行。
 ```
    先执行同步任务，遇到宏任务就像将其放入宏任务队列，遇到微任务就将其放入微任务队列，同步任务执行完就去先执行当前任务队列中的微任务再去执行宏任务
 ```
+ 主线程不断重复上面的步骤

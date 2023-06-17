# React 知识点
React的三大特色（虚拟DOM、组件开发、多端适配）


## setState 是同步还是异步
同步代码异步表现，原因是react的批处理。  react18之前在生命周期函数和合成事件中表现为异步，在原生事件，及定时器中表现为同步。  在react18优化批处理之后，在任何地方调用setState都会批处理，因此都表现为异步。  


## React事件绑定原理
非原生事件是合成事件。React将事件将挂载在 root 元素上，将事件内容封装并交由真正的处理函数运行。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。
因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是无效的，而应该调用event.preventDefault。


## hooks 优缺点
优点： 
+ 让函数组件拥有自己的状态和生命周期。
+ 使用函数组件加Hooks代码更加简洁。
+ 不需要老是去纠结this指向的问题。
+ 通过自定义hooks实现逻辑复用。

缺点:class组件的三个生命周期函数合并在一个生命周期函数内。   

## hooks 模拟生命周期
```
// componentDidMount，必须加[],不然会默认每次渲染都执行
useEffect(()=>{
}, [])

// componentDidUpdate
useEffect(()=>{
document.title = `You clicked ${count} times`;
return()=>{
// 以及 componentWillUnmount 执行的内容 
}
}, [count])
```


# React 18的新特性
1. 并发性(Concurrency)
并发性是一种能够同时执行多项任务的能力
2. 自动批处理(Automatic Batching)
一组React将多个状态更新放入一次渲染中的操作，被称为批处理。
3. 让SSR支持Suspense
通过Suspense组件，能够对此类问题进行合理的改进。它会将应用程序分解成为遍历上述步的更小的独立单元，以便更快地进行交互，并向用户呈现应用的内容。
4. 转换(Transition)
Transition API能够协助用户解决，在大数据量页面上出现的频繁更新的问题。
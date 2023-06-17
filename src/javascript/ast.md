# AST 抽象语法树
在了解AST之前首先需要知道javascript的工作原理，javascript是一种解释型语言，通过词法分析语法分析之后构建出抽象语法树。如果javascript解析器无法构建出语法树时就会报出语法错误，从而结束此次编译过程（平时遇到语法错误提示时，就是此阶段报的错误）。整个javascript引擎工作流程可以，看以下的流程图。

对于解释型语言（例如 JavaScript）来说，通过词法分析 -> 语法分析 -> 语法树，就可以开始解释执行了。

## 词法分析/分词(Tokenizing/Lexing)
将字符流(char stream)转换为记号流(token stream)，由字符串组成的字符分解成有意义的代码块，这些代码块称为词法单元。例如：一段 JS 代码 var name = 'Hello Flutter'; 会被分解为词法单元：var、name、=、Hello Flutter、;。
```
[
  {
    "type": "Keyword",
    "value": "var"
  },
  {
    "type": "Identifier",
    "value": "name"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "String",
    "value": "'Hello Flutter'"
  },
  {
    "type": "Punctuator",
    "value": ";"
  }
]
```

最小词法单元主要有空格、注释、字符串、数字、标志符、运算符、括号等。

## 语法分析/解析(Parsing)
将词法单元流转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。这个树称为 “抽象语法树” AST（Abstract Syntax Tree）。

词法分析和语法分析不是完全独立的，而是交错进行的，也就是说，词法分析器不会在读取所有的词法记号后再使用语法分析器来处理。在通常情况下，每取得一个词法记号，就将其送入语法分析器进行分析。
![语法解析](./img/ast-parsing.png)
语法分析的过程就是把词法分析所产生的记号生成语法树，通俗地说，就是把从程序中收集的信息存储到数据结构中。注意，在编译中用到的数据结构有两种：符号表和语法树。

符号表：就是在程序中用来存储所有符号的一个表，包括所有的字符串变量、直接量字符串，以及函数和类。
语法树：就是程序结构的一个树形表示，用来生成中间代码。
如果 JavaScript 解释器在构造语法树的时候发现无法构造，就会报语法错误，并结束整个代码块的解析。对于传统强类型语言来说，在通过语法分析构造出语法树后，翻译出来的句子可能还会有模糊不清的地方，需要进一步的语义检查。语义检查的主要部分是类型检查。例如，函数的实参和形参类型是否匹配。但是，对于弱类型语言来说，就没有这一步。

经过编译阶段的准备，JavaScript 代码在内存中已经被构建为语法树，然后 JavaScript 引擎就会根据这个语法树结构边解释边执行。

var name = 'Hello Flutter'; 转成 AST 如下：
```
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "name"
          },
          "init": {
            "type": "Literal",
            "value": "Hello Flutter",
            "raw": "'Hello Flutter'"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```
这样的每一层结构也被叫做 节点（Node）。 一个 AST 可以由单一的节点或是成百上千个节点构成。 它们组合在一起可以描述用于静态分析的程序语法

## 代码生成(Code Generation)
将 AST 转换为可执行代码的过程称被称为代码生成。代码生成步骤把最终（经过一系列转换之后）的 AST 转换成字符串形式的代码，同时还会创建源码映射（source maps）。代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。


## JS AST 工具
JS 生态基于 AST 实现的一些工具有很多，例如：

babel: 实现 JS 编译，转换过程是 AST 的转换
ESlint: 代码错误或风格的检查，发现一些潜在的错误
IDE 的错误提示、格式化、高亮、自动补全等
UglifyJS 压缩代码
代码打包工具 webpack


## 送给你的AST螺丝刀：recast
npm i recast -S
```
// 给你一把"螺丝刀"——recast
const recast = require("recast");

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code =
  `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `
// 用螺丝刀解析机器
const ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
const add  = ast.program.body[0]

console.log(add)
```


### Babel 的工作原理
Babel 是一个通用的多功能的 JavaScript 编译器，更确切地说是源码到源码的编译器，通常也叫做"转换编译器"(transpiler)。很多浏览器目前还不支持 ES6 的代码，但是我们可以通过 Babel 将 ES6 的代码转译成 ES5 代码，让所有的浏览器都能理解的代码，这就是 Babel 的作用。

Babel 的编译过程和大多数其他语言的编译器大致相同，可以分为三个阶段。

解析(parse)：将代码字符串解析成抽象语法树。
转换(transform)：对抽象语法树进行转换操作。
生成(generate): 根据变换后的抽象语法树再生成代码字符串。
![babel](./img/babel-function.png)


1. @babel/parser
@babel/parser 将源代码解析成 AST。


2. @babel/generator
@babel/generator 将 AST 解码生 JS 代码

3. @babel/plugin-transform-?
Babel 官方提供了一系列用于代码转换的插件，例如 @babel/plugin-transform-typescript，我们通常会通过 babel 的插件来完成代码转换。

4. @babel/core
包括了整个 Babel 工作流，也就是说在 @babel/core 里面我们会使用到 @babel/parser、transformer[s]、以及@babel/generator

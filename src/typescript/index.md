# TS 

## 类型
1. 联合类型  (|)
```
let aget: string | number 
```

2. 交叉类型
```
interface Person {
  name: string;
  age: number;
}

interface Employee {
  company: string;
  salary: number;
}

type Worker = Person & Employee;

```

## 常用语法
1. Partial 将类型中所有选项变为可选
2. Omit 去除类型中某些项
3. Pick 选取类型中指定类型
4. Required 将类型中所有选项变为必选，去除所有
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

## 高级类型
1. keyof
获取类型内所有的 key，即所有属性名 , 获取的是一个 联合类型
这里类型指：通过 interface 或 type 定义的类型；通过 typeof xxx 返回的类型等。keyof 后面必须是类型，不能是具体的对象
2. Partial 
将类型中所有选项变为可选
3. Omit 
去除类型中某些项
4. Pick 
选取类型中指定类型
5. Required 
将类型中所有选项变为必选，去除所有?
6. in 
循环类型 一般循环的是 联合类型，把联合类型中每一个属性名赋值给 P
7. Record
将 K 中的所有属性值都转换为 T 类型，并返回新的对象类型
8. Readonly
将 T 中的所有属性设为只读
9. Exclude
从T中剔除可以赋值给U的类型
10. Extract
提取T中可以赋值给U的类型
11. NonNullable
去除 null 和 undefined 后的新类型
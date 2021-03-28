---
title: 函数柯里化
---

### 定义
维基百科中对柯里化 (Currying) 的定义为：

> In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.

翻译成中文:  
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

举例如下所示：
```javascript
function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3
```

### 简易版柯里化方法实现
```javascript
function curry(fn, args) {
  var length = fn.length;
  args = args || [];
  return function() {
    const _args = args.slice(0);
    let arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}
```

### 实现占位符
上面函数的传参顺序必须是从左到右，根据形参的顺序依次传入，如果我不想根据这个顺序传呢？

我们可以创建一个占位符，比如这样：

```javascript
var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

fn("a", _, "c")("b") // ["a", "b", "c"]
```
我们可以写出如下代码
```javascript
function curry(fn, args, holes) {
  length = fn.length;
  args = args || [];
  holes = holes || [];
  return function() {
    var _args = args.slice(0),
        _holes = holes.slice(0),
        argsLen = args.length,
        holesLen = holes.length,
        arg, i, index = 0;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen)
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1)
        }
      }
      else {
        _args.push(arg);
      }
    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}

var _ = {};
var fn = curry(function(a, b, c, d, e) {
    console.log([a, b, c, d, e]);
});
```

### 高颜值写法
```javascript
var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (arg) => judge(...args, arg)
```
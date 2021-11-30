---
title: Promise 实现
---

### 一、完美符合 PromiseA+规范的 `Promise`
#### 基础写法
`Promise` 有以下几个基本特点：
1. `Promise` 有三种状态：`pending` `fulfilled` 和 `rejected`,并且只能由 `pending` 转为 `fulfilled` 或者 `rejected`，且状态不可逆。
2. `Promise` 作为构造函数时，会将一个函数作为参数传入
3. `Promise` 是一个含有 `then` 方法的函数
基于以上基本特点，我们可以写出如下构造方法
```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function VPromise(exector) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbak; // then 方法赋值
  this.onRejctedCallback; // then 方法赋值
  const me = this;
  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED;
      me.value = value;
      me.onFulfilledCallbak && me.onFulfilledCallbak(value);
    }
  }
  funciton reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED;
      me.reason = reason;
      me.onRejctedCallback && me.onRejctedCallback(reason);
    }
  }

  try{
    exector(resolve,reject)
  } catch(e) {
    reject(e)
  }
}

VPromise.prototype.then = function(onFulfilled, onRejected) {
  const me = this;
  const onFulfilledCallbak = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  const onRejectedCallback = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
  if (me.status === FULFILLED) {
    onFulfilledCallbak(me.value)
  } else if (me.status === REJECTED) {
    onRejectedCallback(me.reason)
  } else {
    me.onFulfilledCallbak = onFulfilledCallbak;
    me.onRejctedCallback = onRejectedCallback;
  }
}
```
::: tip
当 `VPromise` 的参数 `exector` 是同步执行时，在调用.then 时状态已经不再是 `pending`，则会直接调用`onFulfilledCallback` 或者 `onRejectedCallback`即可；

当`exector`是异步执行`resolve`或者`reject`时，调用.then时状态还处于 `pending`。需要将`onFulfilledCallback`、`onRejectedCallback`赋值到this，通过resolve/reject来执行回调。
:::
### onFulfilled 和 onRejected 应该是微任务
分析上述基础代码可知，我们的 resolve 与 reject 均为同步执行代码，与 PromiseA+的执行顺序不符，因此应该延迟执行，我们可以使用`queueMicrotask`或使用`setTimeout`进行模拟
变更后代码如下：
```diff
function VPromise(exector) {
  /** 省略 */
  this.onFulfilledCallbak; // then 方法赋值
  this.onRejctedCallback; // then 方法赋值
  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED;
      me.value = value;
+      queueMicrotask(() => {
+        me.onFulfilledCallbak && me.onFulfilledCallbak(value);
+      })
    }
  }
  funciton reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED;
      me.reason = reason;
+      queueMicrotask(() => {
+        me.onRejctedCallback && me.onRejctedCallback(reason);
+      })
    }
  }
  
  /** 省略 */
}

VPromise.prototype.then = function(onFulfilled, onRejected) {
  /** 省略 */
  if (me.status === FULFILLED) {
+    queueMicrotask(() => {
+      onFulfilledCallbak(me.value)
+    })
  } else if (me.status === REJECTED) {
+    queueMicrotask(() => {
+      onRejectedCallback(me.reason)
+    })
  } else {
    /** 省略 */
  }
}
```

### 多次调用.then
`Promise` 是可以多次调用 then 方法的，例如
```javascript
let p = new Promise((res) => {
    queueMicrotask(() => {
        res(10);
    }, 1000)
});
p.then(v => {
    console.log(v + 1);
});
p.then(v => {
    console.log(v + 2);
});
// 输出结果 11  12
```
所以 this.onFulfilledCallback 和 this.onRejectedCallback 应当是个数组结构，接收多个then内传入的方法。
```diff

function VPromise(exector) {
  /** 省略 */
-  this.onFulfilledCallbak; // then 方法赋值
-  this.onRejctedCallback; // then 方法赋值
+  this.onFulfilledCallbaks = []; // then 方法赋值
+  this.onRejctedCallbacks = []; // then 方法赋值
  const me = this;
  function resolve(value) {
    if (me.status === PENDING) {
      /** 省略 */
      queueMicrotask(() => {
-        me.onFulfilledCallbak && me.onFulfilledCallbak(value);
+        me.onFulfilledCallbaks.forEach(cb => cb(value));
      })
    }
  }
  funciton reject(reason) {
    if (me.status === PENDING) {
      /** 省略 */
      queueMicrotask(() => {
-        me.onRejctedCallback && me.onRejctedCallback(reason);
+        me.onRejctedCallbacks.push(cb => cb(reason))
      })
    }
  }
  /** 省略 */
}

VPromise.prototype.then = function(onFulfilled, onRejected) {
  /** 省略 */
    } else {
-      me.onFulfilledCallbak = onFulfilledCallbak;
-      me.onRejctedCallback = onRejectedCallback;
+       me.onFulfilledCallbaks.push(onFulfilledCallbak)
+       me.onRejctedCallbacks.push(onRejectedCallback)
    }
  })
}
```
### 链式调用
本质为每次执行 then 方法返回一个新的 `Promise`
```diff
/** 省略 */
VPromise.prototype.then = function(onFulfilled, onRejected) {
  /** 省略 */
+  let promise2 = new VPromise((resolve, reject) => {
    if (me.status === FULFILLED) {
      queueMicrotask(() => {
-        onFulfilledCallback(me.value);
+        try {
+          let x = onFulfilledCallbak(me.value);
+          resolve(x)
+        } catch (e) {
+          reject(e)
+        }
      })
    } else if (me.status === REJECTED) {
      queueMicrotask(() => {
-        onRejectedCallback(me.reason)
+        try {
+          let x = onRejectedCallback(me.reason)
+          resolve(x) // 使用 resolve
+        } catch(e) {
+          reject(e)
+        }
      })
    } else {
-      me.onFulfilledCallbacks.push(onFulfilledCallback);
-      me.onFulfilledCallbacks.push(onFulfilledCallback);
+      me.onFulfilledCallbaks.push((value) => {
+        try {
+          let x = onFulfilledCallbak(value)
+          resolve(x)
+        } catch (e) {
+          reject(e)
+        }
+      })
+      me.onRejctedCallbacks.push((reason) => {
+        try {
+          let x = onRejectedCallback(reason)
+          resolve(x)
+        } catch (e) {
+          reject(e)
+        }
+      })
    }
  })
  return promise2
}
```

### x 是一个 Promise
上一步中我们使用变量 x 作为 onFulfilledCallback/onRejectedCallback 的结果。如果 x 也是一个 VPromise 的话，那么返回的 VPromise 的状态就要取决于 x 的状态。我们定义一个 resolvePromise 方法，对 x 与 promise2的状态进行连接。其中 resolve和 reject 都是由 promise2提供的，所以可以理解为当 x 的状态变为 FULFILLED/REJECTED 时，再调用 resolve/reject 来改变 promise2 的状态
```diff
VPromise.prototype.then = function (onFulfilled, onRejected) {
  /** 省略 **/
  let promise2 = new VPromise((resolve, reject) => {
    /** 省略 **/
-   resolve(x);
+   resolvePromise(promise2, x, resolve, reject);
    /** 省略 **/
  });
}
```
```js
function resolvePromise(promise2, x, resolve, reject) {
  if (x instanceof VPromise) {
    try {
      let then = x.then;
      // 递归调用
      then.call(x, y => {
          resolvePromise(promise2, y, resolve, reject);
      }, r => {
          reject(r);
      });
    } catch (e) {
        reject(e);
    }
  } else {
    resolve(x);
  }
}
```

### x是一个 thenable
Promise规范给出的的 thenable定义

> 'thenable' 是一个定义then方法的对象或者函数

关于 thenable 的例子如下
```javascript
new Promise(res => res(10)).then(v => {
  return {
    other: v,
    then: v + 2
  }
}).then(ans => {
  console.log(ans);
});

new Promise(res => res(10)).then(v => {
  return {
    other: v,
    then: () => {
      return v + 2;
    }
  }
}).then(ans => {
  console.log(ans);
});

new Promise(res => res(10)).then(v => {
  return {
    other: v,
    then: (res, rej) => {
      res(v + 2);
    }
  }
}).then(ans => {
  console.log(ans);
});
```
正确的返回结果如下所示
```javascript
// 第一个
{
  other: 10,
  then: 12
}
// 第二个 
// 不会打印，即不会then方法里的代码（Promise状态一直在pending）
// 这是因为then 返回一个 promise，promise 需要 resolve 或 reject 方法才能变更状态，而 return 的 then 方法没有传入 resolve
// 第三个
12
```
根据上述结果分析，我们做如下处理
```diff
function resolvePromise(promise2, x, resolve, reject) {
- if (x instanceof VPromise) {
+ if (typeof x === 'object' && x || typeof x === 'function') {
    try {
      let then = x.then;
+     if (type of then === 'function') {
        then.call(x, y => {
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          reject(r);
        });
+     } else {
+       resolve(x);
+     }
    } catch (e) {
      reject(e);
    }
  } else {
    /** 省略 **/
  }
}
```
### x === promise2
当 x === promise2 时会产生循环引用，为了避免这种情况，在判断后进行 reject 处理
```diff
function resolvePromise(promise2, x, resolve, reject) {
+   if (x === promise2) {
+     reject(new TypeError('chaining cycle'));
+   } else if (typeof x === 'object' && x || typeof x === 'function') {
      /** 省略 **/
    } else {
      resolve(x);
    }
}
```
### thenable中只能resolve/reject一次
Promise的状态是不可逆的，在执行完 resolve 或者 reject 之后，再次执行 resolve 或者 reject 应该被忽略掉，在 VPromise 中我们已经加入了这样逻辑（判断状态）。同样的，在 thenable 中，我们也应该遵守这种规定。看下面的测试用例。
```javascript
new Promise(res => res()).then(() => {
  return {
    then: function (onFulfilled) {
      // 第一个onFulfilled
      onFulfilled({
        then: function (onFulfilled) {
          queueMicrotask(function () {
            onFulfilled('onFulfilled1');
          }, 0);
        }
      });
      // 第二个onFulfilled
      onFulfilled('onFulfilled2');
    }
  };
}).then(value => {
    console.log(value);
});
// 正确输出 onFulfilled1
```
然而在我们的 VPromise中确会打印 onFulfilled2因为在执行第一个onFulfilled后返回了一个thenable，在该thenable中是异步执行 onFulfilled，所以当前 VPromise的状态依旧处于 pending，因此便继续执行第二个onFulfilled了。所以我们需要增加一个标识符 called，从而忽略之后的调用
```diff
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
      reject(new TypeError('chaining cycle'))
  } else if (typeof x === 'object' && x || typeof x === 'function') {
+   let called
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
+         if (called) return;
+         called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
+         if (called) return;
+         called = true;
          reject(r);
        });
      } else {
+       if (called) return;
+       called = true;
        resolve(x);
      }  
    } catch (e) {
+     if (called) return;
+     called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```
到这里，一个完美符合 PromiseA+ 规范的 VPromise 就完成啦
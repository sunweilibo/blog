---
title: 防抖节流
---

### 函数防抖
在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
根据函数防抖思路设计出第一版的最简单的防抖代码：
```javascript
var timer; // 维护同一个timer
function debounce(fn, delay) {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
}
```
用onmousemove测试一下防抖函数:
```javascript
// test
function testDebounce() {
    console.log('test');
}
document.onmousemove = () => {
  debounce(testDebounce, 1000);
}
```

上面例子中的debounce就是防抖函数，在document中鼠标移动的时候，会在onmousemove最后触发的1s后执行回调函数testDebounce；如果我们一直在浏览器中移动鼠标（比如10s），会发现会在10 + 1s后才会执行testDebounce函数（因为clearTimeout(timer)），这个就是函数防抖。

在上面的代码中，会出现一个问题，var timer只能在setTimeout的父级作用域中，这样才是同一个timer，并且为了方便防抖函数的调用和回调函数fn的传参问题，我们应该用闭包来解决这些问题。

优化后的代码：
```javascript
function debounce(fn, delay) {
    var timer; // 维护一个 timer
    return function () {
        var _this = this; // 取debounce执行作用域的this
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay);
    };
}
```
测试用例：

// test
function testDebounce(e, content) {
    console.log(e, content);
}
var testDebounceFn = debounce(testDebounce, 1000); // 防抖函数
document.onmousemove = function (e) {
    testDebounceFn(e, 'debounce'); // 给防抖函数传参
}
使用闭包后，解决传参和封装防抖函数的问题，这样就可以在其他地方随便将需要防抖的函数传入debounce了。

### 函数节流
每隔一段时间，只执行一次函数。
定时器实现节流函数：
```javascript
function throttle(fn, delay) {
    var timer;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
        }, delay)
    }
}
```
::: tip
使用定时器节流在最终仍会执行一次
:::

时间戳实现节流函数：
```javascript
function throttle(fn, delay) {
    var previous = 0;
    // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
    return function() {
        var _this = this;
        var args = arguments;
        var now = new Date();
        if(now - previous > delay) {
            fn.apply(_this, args);
            previous = now;
        }
    }
}

// test
function testThrottle(e, content) {
    console.log(e, content);
}
var testThrottleFn = throttle(testThrottle, 1000); // 节流函数
document.onmousemove = function (e) {
    testThrottleFn(e, 'throttle'); // 给节流函数传参
}
```
其实现原理，通过比对上一次执行时间与本次执行时间的时间差与间隔时间的大小关系，来判断是否执行函数。若时间差大于间隔时间，则立刻执行一次函数。并更新上一次执行时间。
与通过 setTimeout 不同的是，如果 previous 设置为 0，则会立即执行一次，如果设置为 `+new Date()`则不会

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function VPromise(exector) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbaks = []; // then 方法赋值
  this.onRejctedCallbacks = []; // then 方法赋值
  const me = this;
  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED;
      me.value = value;
      queueMicrotask(() => {
        me.onFulfilledCallbaks.forEach(cb => cb(value));
      })
    }
  }
  funciton reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED;
      me.reason = reason;
      queueMicrotask(() => {
        me.onRejctedCallbacks.push(cb => cb(reason))
      })
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
  const onRejectedCallback = typeof onFulfilled === 'function' ? onRejected : reason => {throw reason};
  let promise2 = new VPromise((resolve, reject) => {
    if (me.status === FULFILLED) {
      queueMicrotask(() => {
        try {
          let x = onFulfilledCallbak(me.value);
          resolvePromise(promise2, x, resolve, reject) // x 可能也是 VPromise 类型
        } catch (e) {
          reject(e)
        }
      })
    } else if (me.status === REJECTED) {
      queueMicrotask(() => {
        try {
          let x = onRejectedCallback(me.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    } else {
      me.onFulfilledCallbaks.push((value) => {
        try {
          let x = onFulfilledCallbak(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      me.onRejctedCallbacks.push((reason) => {
        try {
          let x = onRejectedCallback(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
  })
  return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('chaining cycle'));
  } else if (typeof x === 'object' && x || typeof x === 'function') { // thenable
    let called
    try {
      let then = x.then
      if (type of then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true
          resolvePromise(promise2, y, resolve, rejectj)
        }, r => {
          if (called) return;
          called = true
          reject(r)
        })
      } else {
        if (called) return;
        called = true
        resolve(x)
      }
    } catch(e) {
      if (called) return;
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
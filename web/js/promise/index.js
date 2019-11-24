const resolved = 'resolved', rejected = 'redjected', pending = 'pending';

class Promise {
  constructor(executor) {
    this.status = pending;
    this.value = undefined;
    this.resolveArr = [];
    this.rejectArr = [];
    const resolveFn = result => {
      setTimeout(() => {
        if (this.status !== pending) return;
        this.status = resolved;
        this.value = result;
        this.resolveArr.forEach(cb => cb())
      })
    }
    const rejectFn = reason => {
      setTimeout(() => {
        if (this.status !== pending) return;
        this.status = rejected;
        this.value = reason;
        this.rejectArr.forEach(cb => cb())
      })
    }
    try {
      executor(resolveFn, rejectFn)
    } catch (err) {
      rejectFn(err)
    }
  }
  then(resolveCb, rejectCb) {
    typeof resolveCb !== 'function' && (resolveCb = _ => _);
    typeof rejectCb !== 'function' && (rejectCb = reason => {
      return new Promise((_, reject) => {
        reject(reason)
      })
    });
    return new Promise((resolve, reject) => {
      this.resolveArr.push(() => {
        try {
          const result = resolveCb(this.value)
          result instanceof Promise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      })
      this.rejectArr.push(() => {
        try {
          const result = rejectCb(this.value)
          result instanceof Promise ? result.then(resolve, reject) : resolve(result)

        } catch (err) {
          reject(err)
        }
      })
    })
    // this.resolveArr.push(resolveCb)
    // this.rejectArr.push(rejectCb)
  }
  catch(rejectCb) {
    return this.then(null, rejectCb)
  }
  static all(promiseArr = []) {
    return new Promise((resolve, reject) => {
      let index = 0, result = [], len = promiseArr.length;
      for (let i = 0; i < len; i++) {
        const p = promiseArr[i];
        p.then(res => {
          result[i] = res;
          index++;
          index === len && resolve(result)
        }, reject)
      }
    })
  }
}

module.exports = Promise;
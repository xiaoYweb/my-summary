const pending = 'pending', resolved = 'resolved', rejected = 'rejected';

class Promise {
  constructor(executor) {
    this.status = pending;
    this.value = undefined;
    this.resolveArr = [];
    this.rejectArr = [];
    const resolve = result => {
      setTimeout(() => {
        if (this.status !== pending) return;
        this.status = resolved;
        this.value = result;
        this.resolveArr.forEach(cb => cb());
      })
    }
    const reject = reason => {
      setTimeout(() => {
        if (this.status !== pending) return;
        this.status = rejected;
        this.value = reason;
        this.rejectArr.forEach(cb => cb());
      })
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(resolveCb, rejectCb) {
    return new Promise((resolve, reject) => {
      typeof resolveCb !== 'function' && (resolveCb = _ => _);
      typeof rejectCb !== 'function' && (rejectCb = err => new Promise((_, reject) => reject(err)))
      this.resolveArr.push(() => {
        try {
          const result = resolveCb(this.value);
          result instanceof Promise ? result.then(resolve, reject) : resolve(result);
        } catch (err) {
          reject(err)
        }
      })
      this.rejectArr.push(() => {
        try {
          const reason = rejectCb(this.value);
          reason instanceof Promise ? reason.then(resolve, reject) : resolve(reason);
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  catch(rejectCb) {
    return this.then(null, rejectCb)
  }
  static all(promiseArr = []) {
    return new Promise((resolve, reject) => {
      let len = promiseArr.length, index = 0, result = [];
      for (let i = 0; i < len; i++) {
        const p = promiseArr[i];
        p.then(res => {
          result[i] = res;
          index++;
          if (index === len) {
            resolve(result)
          }
        }, reject)
      }
    })
  }
  static race(promiseArr = []) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        const p = promiseArr[i];
        p.then(res => resolve(res), reject)
      }
    })
  }
  static resolve(result) {
    return new Promise(resolve => resolve(result))
  }
  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }
}

module.exports = Promise;
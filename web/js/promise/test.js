const Promise = require('./promise');

/**
 * 1. 同一个 promise 中的 status 只能转变一次 
 * 2. then catch 中传递的函数 是订阅函数  为此 resolve reject 函数执行处罚回调函数必须是在订阅之后  为此采用 异步方案
 * 3. resolve reject 可异步调用 可同步调用
 * 4. 报错
 */
function fn1() {
  new Promise((resolve, reject) => {
    // reject(222);
    // resolve(111);
    // reject(222);
    setTimeout(() => {
      Math.random() - 0.5 > 0 ? resolve(111) : reject(222)
    }, 200)
    throw new Error('err')
  }).then(res => {
    console.log('fn1--> res', res)
  }, err => {
    console.log('fn1--> err', err)
  })
  console.log('sync log')
}
// fn1()

/**
 * 1. 调用then  or catch 返回 心得 promise 实例
 * 2. p2 执行then 中 resolveCb 还是 执行 rejectCb 取决于 p1中then 2个回调  如果回调报错  或者 显示返回一个 新得Promise 实例调用了 reject  执行p2 rejectCb  其他情况 执行 执行p2 resolveCb
 */
function fn2() {
  let p1 = new Promise((resolve, reject) => {
    Math.random() - 0.5 > 0 ? resolve(1) : reject(-1)
  })
  let p2 = p1.then(res => {
    return res + 1
  }, err => {
    return err + 1
  })
  console.log('fn2 p1 === p2', p1 === p2)
  p2.then(res => {
    console.log('fn2--> res', res)
  }, err => {
    console.log('fn2--> err', err)
  })
}
// fn2()
/**
 * 1. 返回的 如果是 心得 promise 实例 则 将 前一个 
 */
function fn3() {
  let p1 = new Promise((resolve, reject) => {
    Math.random() - 0.5 > 0 ? resolve(1) : reject(-1)
  })
  let p2 = p1.then(res => {
    return new Promise(resolve => {
      resolve(res + 1)
    })
  }, err => {
    return new Promise((resolve, reject) => {
      // resolve(res + 1)
      reject(err + 1)
    })
  })
  console.log('fn3 p1 === p2', p1 === p2)
  p2.then(res => {
    console.log('fn3--> res', res)
  }, err => {
    console.log('fn3--> err', err)
  })
}
// fn3()

/**
 * 1. then() 2个回调 可能 不传
 * 2. 第一个回调不传 相当于 res => res
 * 3. 第二个回调不传 相当于 走 最近一个 报错处理的 方法
 * 4. catch 
 */
function fn4() {
  let p1 = new Promise((resolve, reject) => {
    // reject(1)
    throw new Error('11')
    // resolve(1)
  })
  let p2 = p1.then(res => {
    return (res + 1)
  })
  let p3 = p2.then(null, null)
  // let p3 = p2.then()

  let p4 = p3.then(res => {
    console.log('fn4--> p3 then', res)
  }, err => {
    console.log('fn4--> p3 catch', err)
    throw new Error('err')
  })
  p4.catch(err => {
    console.log('fn4--> p4 catch', err)
  })
}
// fn4()
/**
 * 1. promise.all 全成功 走then  一个失败 或者报错 直接 走catch
 */
function fn5() {
  let p1 = new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 400)
  })
  let p2 = new Promise(resolve => {
    throw new Error('throw err 2')
    setTimeout(() => {
      resolve(2)
    }, 200)
  })
  let p3 = new Promise((resolve, reject) => {
    throw new Error('throw err 3')
    setTimeout(() => {
      // reject(4)
      resolve(3)
    }, 500)
  })
  Promise.all([p1,p2,p3]).then(res => {
    console.log('fn5--> promise.all then res', res)
  }).catch(err => {
    console.log('fn5--> promise.all catch err', err)
  })
}
fn5()
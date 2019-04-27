/**
 * 
 * @param  {...any} fns 
 */

const compose = (...fns) => (...arg) => fns.reduceRight((prev,next) => next(prev), fns[fns.length-1].apply(this, arg))

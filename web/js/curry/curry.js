function add (a, b, c, d) {
    return a + b + c + d
}
function fixedParams (fn) {// 第一次输入函数与参数 第二次 输出结果 且 参数必须给足
    var arg = [].slice.call(arguments, 1)
    return function () {
        var newArg = arg.concat([].slice.call(arguments))
        return fn.apply(this, newArg)
    }
}
// let newAdd = fixedParams(add,2)
// newAdd(1,3,4)
function curry (fn, length) {
    var needLen = fn.length || length
    return function () {
        var arg = [].slice.call(arguments)
        if (arg.length < needLen) {
            return curry(fixedParams.apply(this, [fn].concat(arg)), needLen - arg.length)
        } else {
            return fn.apply(this, arg)
        }
    }
}
// let newAdd = curry(add)
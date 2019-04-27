/**
 * 柯理化：柯里化，英语：Currying，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
 * 并且返回接受余下的参数而且返回结果的新函数的技术。
 */

function add (a,b,c,d) {    
    return a + b + c + d
}
function fixedParamsCurry (fn) {
    var arg = [].slice.call(arguments, 1)
    return function () {
        var newArg = [].slice.call(arguments)
        console.log(arg.concat(newArg))
        return fn.apply(this, arg.concat(newArg))
    }
}
// var newArr = fixedParamsCurry(add, 1, 2)
// console.log( newArr(3, 4) )
function curry (fn, length) {
    var needLen = length || fn.length
    console.log(needLen, length)
    return function () {
        console.log('实际传参的个数', arguments.length, '期望传参的个数',needLen, '下次期望传参的个数',needLen - arguments.length)
        if (arguments.length < needLen) {
            var newArg = [fn].concat([].slice.call(arguments, 0))
            console.log(newArg)
            return curry(fixedParamsCurry.apply(this, newArg), needLen - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}
var newAdd = curry(add)

console.log(newAdd(1)(2)(3)(4))
// console.log(newAdd(1,2)(3)(4))
// console.log(newAdd(1,2,3)(4))
// console.log(newAdd(1,2,3,4))





function addNum() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
function curry2 (fn) {
    var needLen = fn.length
    var arg = [].slice.call(arguments, 1)
    return function () {

        arg = arg.concat([].slice.call(arguments))
        if (arg.length >= needLen) {
            return fn.apply(this, arg)
        } else {
            return arguments.callee()
        }
    }
}

const fnToString = () => {// 返回fn是隐式调用toString方法
    function fn () {
        console.log('fn')
    }
    fn.toString = function () {
        console.log('print tostring')
        return 'tostring'
    }
    return fn
}
const fn = arr => {
    const newArr = []
    arr.forEach(item => {
        let n = item % 10
        newArr[n] ? newArr[n].push(item) : newArr[n] = [item]
    });
    return newArr.flat()
}
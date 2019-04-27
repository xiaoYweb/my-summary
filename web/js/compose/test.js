// function compose (f, g) {
        //     return function (x) {
        //         return f(g(x))
        //     }
        // }
        function toUpperCase (str) {
            return str.toUpperCase()
        }
        function add (str) {
            return str + '!'
        } 
        function split (str) {
            return str.split('')
        }
        function reverse (arr) {
            return arr.reverse()
        }
        function join (arr) {
            return arr.join('-')
        }
        function compose () {
            var arg = [].slice.call(arguments)
            var i = arg.length - 1
            return function () {
                var ret = arg[i].apply(this, [].slice.call(arguments))
                while(i --) {
                    ret = arg[i](ret)
                }
                return ret
            }
        }
        var compose = (...r) => {
            // console.log(r)
            return function () {
                return r.reduceRight( (prev, next) => {
                    // console.log('prev', prev)
                    return next(prev)
                }, r[r.length-1].apply(this, [].slice.call(arguments)) )
            }
        }
        var compose = (...r) => (...arg) => r.reduceRight((prev,next) => next(prev), r[r.length-1].apply(this, arg))
        var f = compose(add, toUpperCase)
        var fn = compose(join, reverse, split, add, toUpperCase)

        
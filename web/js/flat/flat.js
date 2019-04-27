/**
 * bug => 引用类型扁平化 是地址赋值
 */
const flat = (arr=[]) => arr.reduce( (prev,next) => Array.isArray(next) ? prev.concat(flat(next)) : prev.concat(next), [] )


// function flat (arr) {
//     arr = arr || []
//     var resArr = []
//     for (let i = 0; i < arr.length; i++) {
//         var item = arr[i]
//         if (Object.prototype.toString.call(item) === '[object Array]') {
//             resArr = resArr.concat(flat(item))
//         } else {
//             resArr.push(item)
//         }
//     }
//     return resArr
// }

Array.prototype.myFlat = function () {
    var resArr = []
    this.forEach(item => {
        Array.isArray(item) ? resArr = resArr.concat(item.myFlat()) : resArr.push(item)
        // Object.prototype.toString.call(item) === '[object Array]' ? resArr.push(item.myFlat()) : resArr.push(item)
    })
    return resArr
}
var arr = [1,2,'3',[4,true,[{},2,null],2]]

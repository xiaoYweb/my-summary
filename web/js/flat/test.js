/**
 * 
 * @param {*} item 
 */
function isArray (item) {
    if (Array.isArray) {
        return Array.isArray(item)
    } else {
        return Object.prototype.toString.call(item) === '[object Array]'
    }
}
function flat (arr) {
    var arr = arr || []
    var resArr = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (isArray(item)) {
            resArr = resArr.concat(flat(item))
        } else {
            resArr.push(item)
        }
    }
    return resArr
}    
var arr = [1,2,'3',[4,true,[{},2,null],2]]
console.log(flat(arr))
Array.prototype.myFlat = function () {
    var resArr = []
    // this.forEach(item => {
    //     Array.isArray(item) ? resArr = resArr.concat(item.myFlat()) : resArr.push(item)
    // })
    resArr = this.reduce((prev, next) => {
        // console.log(prev)
        return Array.isArray(next) ? prev.concat(next.myFlat()) : prev.concat(next)
    }, [])
    return resArr
}
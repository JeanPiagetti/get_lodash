/**
 * get.js
 * 
 * @param {string | string[]} path
 * @param {object} data
 * @returns unknown
 */
function get (path, data) {
    if(typeof path === 'boolean') return undefined

    if(path === null)  return undefined 

    if(typeof path === 'function')return undefined

    if(typeof path === 'number') return undefined 

    if(typeof path === 'undefined') return undefined

    if (typeof path === 'object') {
        if(Object.keys(path).length === 0){
            return undefined
        }
    } 

   const keys = Array.isArray(path) ? path :  path.split('.').filter(key => key)
   const keysMapped = keys.flatMap(part => typeof part === 'string' ? part.split('.') : part)
   const keysReduced = keysMapped.reduce((obj, key) => obj && obj[key],data)
    console.log(keysReduced)
   return keysReduced
}
module.exports = { get }
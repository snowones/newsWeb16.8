//filterArgs.js
module.exports = function(str){
    const argv = process.argv
    const result = argv.find(item => item.match(str))
    if (result) {
      return result.split('=')[1]
    }
    return null
}
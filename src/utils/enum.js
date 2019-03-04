function getSex(num){
    switch(num){
        case 0:
            return '女'
            break;
        case 1:
            return '男'
            break
        case 2:
            return '其他'
            break;
    }

}
module.exports = {
    getSex:getSex
}
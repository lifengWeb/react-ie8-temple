function getFormateDay(e) {
    let d = new Date(e);
    let year = d.getFullYear();
    let month = d.getMonth() + 1 > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)
    let day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    return year + '-' + month + '-' + day
}
module.exports = {
    getFormateDay: getFormateDay
}

function getDateString(oDate){
    var mm = oDate.getMonth() + 1; // getMonth() is zero-based
    var dd = oDate.getDate();
    return [
      oDate.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
}// end getDateStamp()

export { getDateString };
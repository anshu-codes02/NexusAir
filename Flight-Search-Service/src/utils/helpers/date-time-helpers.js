
function compareDates(string1, string2){
    const date1 = new Date(string1);
    const date2 = new Date(string2);
    return date1.getTime() > date2.getTime();
}

module.exports={
    compareDates
}
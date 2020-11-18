module.exports = {
    getOffset: function (page = 1){
        let offset = 0
        if(page > 1) offset = (page-1) * 15
        return offset
    }
}
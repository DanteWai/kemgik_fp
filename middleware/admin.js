
module.exports = function (req, res, next){
    if(req.userRole === 'admin'){
        next()
    } else{
        return res.status(401).json({error:'Авторизация не удалась'})
    }

}
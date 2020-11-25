const JWTTokenApi = require('../untils/JWTTokenApi')


module.exports = function (req, res, next){
    let check = JWTTokenApi.checkAT(req.get('Authorization'), true)
    if(check.res){
        req.userRole = check.data.user.role
        next()
    }
    else
        return res.status(401).json({error:'Авторизация не удалась'})
}